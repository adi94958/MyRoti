import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CSpinner,
  CFormTextarea,
  CInputGroup,
  CRow,
  CCol,
} from '@coreui/react'
import { cilPen, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const DaftarPengiriman = () => {
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [roti, setRoti] = useState([])
  const [modalRotiBasi, setModalRotiBasi] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRotiDipilih, setDataRotiDipilih] = useState([])
  const [searchText, setSearchText] = useState('')
  const [formData, setFormData] = useState([])

  const [idKurir, setKurirId] = useState('')
  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
    handleDataTransaksi()
  }, [])

  function handleModalRoti(lapak) {
    setModalRoti(true)
    setDataRotiDipilih(lapak.transaksi_roti)
  }

  const [dataTransaksi, setDataTransaksi] = useState([])
  function handleDataTransaksi() {
    axios
      .get('http://localhost:8000/api/kurir/transaksi')
      .then((response) => {
        setDataTransaksi(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  function handleModalRotiBasi(lapak) {
    setModalRotiBasi(true)
    setDataRotiDipilih(lapak.transaksi_roti)
  }

  const [dataDenganTotalHarga, setDataDenganTotalHarga] = useState([])
  useEffect(() => {
    const newDataDenganTotalHarga = dataTransaksi.map((item) => {
      const totalHargaRoti = item.transaksi_roti.reduce((total, roti) => {
        return total + roti.jumlah_roti * roti.roti.harga_satuan_roti
      }, 0)
      return {
        ...item,
        totalHargaRoti: totalHargaRoti,
      }
    })
    setDataDenganTotalHarga(newDataDenganTotalHarga)
  }, [dataTransaksi])

  const filteredData = dataDenganTotalHarga.filter((lapak) => {
    const lapakName = lapak?.lapak.nama_lapak?.toString()?.toLowerCase() || ''
    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const isStatus = lapak?.status == 'delivered'
    const isKurirMatch = lapak?.id_kurir === idKurir
    return isStatus && isKurirMatch && lapakNameMatch
  })

  const [inputDataRotiBasi, setInputDataRotiBasi] = useState([])
  const handleJumlahRotiBasi = (roti, event) => {
    setRoti(roti)
    const inputValue = event.target.value
    const jumlahRoti = inputValue !== '' ? parseInt(inputValue, 10) : 0

    setInputDataRotiBasi((prevData) => {
      const newData = prevData.map((existingRoti) => {
        if (existingRoti.kode_roti === roti.kode_roti) {
          return {
            ...existingRoti,
            jumlah_roti: jumlahRoti,
          }
        }
        return existingRoti
      })
      if (!newData.some((existingRoti) => existingRoti.kode_roti === roti.kode_roti)) {
        newData.push({
          kode_roti: roti.kode_roti,
          harga_satuan_roti: roti.roti.harga_satuan_roti,
          id_transaksi: roti.id_transaksi,
          jumlah_roti: jumlahRoti,
          stok_roti: roti.jumlah_roti,
        })
      }
      return newData
    })
  }

  const handleCloseRotiBasi = () => {
    setModalRotiBasi(false)
  }

  const simpanRotiBasi = (roti) => {
    const isValid = inputDataRotiBasi.every((item) => {
      return item.stok_roti >= item.jumlah_roti
    })

    if (isValid) {
      const totalHargaRotiBasi = inputDataRotiBasi.reduce((total, roti) => {
        const hargaRoti = roti.jumlah_roti * roti.harga_satuan_roti
        return total + hargaRoti
      }, 0)

      setFormData((prevData) => {
        const newData = prevData.map((existingRoti) => {
          if (existingRoti.id_transaksi === roti.id_transaksi) {
            return {
              ...existingRoti,
              total_dengan_rotibasi: totalHargaRotiBasi,
            }
          }
          return existingRoti
        })
        if (!newData.some((existingRoti) => existingRoti.id_transaksi === roti.id_transaksi)) {
          newData.push({
            id_transaksi: roti.id_transaksi,
            total_dengan_rotibasi: totalHargaRotiBasi,
          })
        }
        return newData
      })
      setModalRotiBasi(false)
      navigate('/kurir/daftar-pengiriman')
    } else {
      alert(
        'Ada jumlah roti yang melebihi stok yang tersedia atau memiliki nilai 0. Silakan periksa kembali jumlah roti yang dimasukkan.',
      )
    }
  }

  const handleSubmit = async (item) => {
    const kodeRotiArray = dataRotiDipilih.map((roti) => roti.kode_roti)
    const jumlahRotiArray = dataRotiDipilih.map((roti) => roti.jumlah_roti)
    const selectRoti = formData.find((roti) => roti.id_transaksi === item.id_transaksi)

    const informasiPenjualan = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
      catatan_penjual: selectRoti.catatan_penjual,
      total_harga: item.totalHargaRoti,
      total_dengan_rotibasi: selectRoti.total_dengan_rotibasi,
      uang_setoran: item.totalHargaRoti - selectRoti.total_dengan_rotibasi,
    }

    try {
      await axios.post(
        `http://localhost:8000/api/kurir/penjualan/${item.id_transaksi}`,
        informasiPenjualan,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Berhasil di submit.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kurir/daftar-pengiriman'
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  const handleInputCatatanChange = (event, data) => {
    setFormData((prevData) => {
      const newData = prevData.map((existingData) => {
        if (existingData.id_transaksi === data.id_transaksi) {
          return {
            ...existingData,
            catatan_penjual: event.target.value,
          }
        }
        return existingData
      })
      if (!newData.some((existingData) => existingData.id_transaksi === data.id_transaksi)) {
        newData.push({
          id_transaksi: data.id_transaksi,
          catatan_penjual: event.target.value,
        })
      }
      return newData
    })
  }

  return (
    <>
      <CCard>
        <CCardHeader>Daftar Pengiriman</CCardHeader>
        <CCardBody>
          <CForm className="mb-3">
            <CRow>
              <CCol md={8} xs={6}>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <CButton variant="outline" className="ms-2">
                    <CIcon icon={cilSearch} />
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
          </CForm>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
                <CTableHeaderCell>Tgl Pengiriman</CTableHeaderCell>
                <CTableHeaderCell>Daftar Roti</CTableHeaderCell>
                <CTableHeaderCell>Total Harga</CTableHeaderCell>
                <CTableHeaderCell>Roti Basi</CTableHeaderCell>
                <CTableHeaderCell>Catatan</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                filteredData.map((lapak, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.alamat_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.tanggal_pengiriman}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti"
                          onClick={() => handleModalRoti(lapak)}
                        >
                          <CIcon icon={cilSearch} className="mx-12 me-2" />
                          Open Detail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{lapak.totalHargaRoti}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti Basi"
                          onClick={() => handleModalRotiBasi(lapak)}
                        >
                          <CIcon icon={cilPen} className="mx-12 me-2" />
                          Input Roti Basi
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormTextarea
                          id="catatan"
                          name="catatan"
                          value={formData.catatan_penjual}
                          onChange={(e) => handleInputCatatanChange(e, lapak)}
                          placeholder="Masukkan catatan Anda di sini..."
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ color: 'orange' }}>{lapak.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="submit"
                          onClick={() => handleSubmit(lapak)}
                        >
                          Submit
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal
        backdrop="static"
        visible={modalRoti}
        className="modal"
        onClose={() => {
          setModalRoti(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRotiDipilih.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalRoti(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal roti basi */}

      <CModal
        backdrop="static"
        visible={modalRotiBasi}
        className="modal"
        onClose={() => {
          setModalRotiBasi(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Dikirim</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRotiDipilih.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                  <CTableDataCell>
                    <CForm>
                      <CFormInput
                        size="sm"
                        name="jumlah_roti"
                        value={
                          (inputDataRotiBasi.find((item) => item.kode_roti === roti.kode_roti) &&
                            inputDataRotiBasi.find((item) => item.kode_roti === roti.kode_roti)
                              .jumlah_roti) ??
                          0
                        }
                        onChange={(e) => handleJumlahRotiBasi(roti, e, index)}
                        required
                      ></CFormInput>
                    </CForm>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseRotiBasi}>
            Close
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick={() => simpanRotiBasi(roti)}>
              Selesai
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DaftarPengiriman
