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
} from '@coreui/react'
import { cilPen, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const DaftarPengiriman = () => {
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [modalRotiBasi, setModalRotiBasi] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRotiDipilih, setDataRotiDipilih] = useState([]);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    id_transaksi: '',
    catatan_penjual: '',
    total_harga: '',
    total_dengan_rotibasi: '',
    uang_setoran: '',
  })

  const [idKurir, setKurirId] = useState('')
  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
  }, [])

  function handleModalRoti(lapak) {
    setModalRoti(true);
    setDataRotiDipilih(lapak.transaksi_roti)
  }

  useEffect(() => {
    handleDataTransaksi()
  }, [])

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
    const isStatus = lapak?.status == 'delivered'
    const isKurirMatch = lapak?.id_kurir === idKurir
    return isStatus && isKurirMatch
  })

  const [inputDataRotiBasi, setInputDataRotiBasi] = useState([])
  const handleJumlahRotiBasi = (item, event, index) => {
    //console.log(item.id_transaksi)
    const inputValue = event.target.value
    const jumlahRoti = inputValue !== '' ? parseInt(inputValue, 10) : 0 // Mengonversi nilai input menjadi integer, atau set nilai 0 jika input kosong
    const newData = [...inputDataRotiBasi]
    //console.log(inputDataRotiBasi)
    newData[index] = {
      ...newData[index],
      jumlah_roti: jumlahRoti,
      kode_roti: item.kode_roti,
      harga_satuan_roti: item.roti.harga_satuan_roti,
      id_transaksi: item.id_transaksi,
    }
    setInputDataRotiBasi(newData)
  }

  const handleCloseRotiBasi = () => {
    setInputDataRotiBasi([]);
    setModalRotiBasi(false);
  }

  const simpanRotiBasi = () => {
    const isValid = inputDataRotiBasi.every(
      (item, index) => item.jumlah_roti <= dataRotiDipilih[index].jumlah_roti,
    )
    //console.log(roti)

    if (isValid) {
      console.log(inputDataRotiBasi)
      const totalHargaRotiBasi = inputDataRotiBasi.reduce((total, roti) => {
        const hargaRoti = roti.jumlah_roti * roti.harga_satuan_roti;
        return total + hargaRoti;
      }, 0);

      // Menyimpan total harga roti basi dalam objek formData
      const newDataTotalHargaRotiBasi = {
        ...formData,
        total_dengan_rotibasi: totalHargaRotiBasi,
      };
      setFormData(newDataTotalHargaRotiBasi)
      setModalRotiBasi(false)
      navigate('/kurir/daftar-pengiriman')
    } else {
      alert(
        'Ada jumlah roti yang melebihi stok yang tersedia atau memiliki nilai 0. Silakan periksa kembali jumlah roti yang dimasukkan.',
      )
    }
  }

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]); // Add formData as a dependency to the useEffect

  const handleSubmit = async (item, index) => {
    console.log("setelah submit")
    console.log(dataTransaksi)
    console.log(dataDenganTotalHarga)
    console.log(formData)

    console.log(formData)
    const kodeRotiArray = inputDataRotiBasi.map((roti) => roti.kode_roti);
    const jumlahRotiArray = inputDataRotiBasi.map((roti) => roti.jumlah_roti);

    const informasiPenjualan = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
      catatan_penjual: formData.catatan_penjual,
      total_harga: item.totalHargaRoti,
      total_dengan_rotibasi: formData.total_dengan_rotibasi,
      uang_setoran: item.totalHargaRoti - formData.total_dengan_rotibasi,
    }
    console.log("setelah input")
    console.log(informasiPenjualan)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/kurir/penjualan/${item.id_transaksi}`,
        informasiPenjualan
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
      if (error.response && error.response.data && error.response.data.message) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage)
      }
      setLoading(false)
    }
  }


  return (
    <>
      <CCard>
        <CCardHeader>Daftar Pengiriman</CCardHeader>
        <CCardBody>
          <CForm className="mb-3"></CForm>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>No.</CTableHeaderCell>
                <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
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
                filteredData
                  .map((item, index) => {
                    const isLast = index === dataDenganTotalHarga.length - 1
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{item.lapak.nama_lapak}</CTableDataCell>
                        <CTableDataCell>{item.lapak.alamat_lapak}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="ms-2"
                            title="Daftar Roti"
                            onClick={() => handleModalRoti(item)}
                          >
                            <CIcon icon={cilSearch} className="mx-12 me-2" />
                            Open Detail
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>{item.totalHargaRoti}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="ms-2"
                            title="Daftar Roti Basi"
                            onClick={() => handleModalRotiBasi(item)}
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
                            onChange={(e) => setFormData({ ...formData, catatan_penjual: e.target.value })}
                            // value={dataTransaksi[index].catatan_penjual}
                            // onChange={(e) => handleCatatanChange(e, index)}
                            placeholder="Masukkan catatan Anda di sini..."
                          />
                        </CTableDataCell>
                        <CTableDataCell
                          style={{ color: 'orange' }}
                        >
                          {item.status}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="ms-2"
                            title="submit"
                            onClick={() => handleSubmit(item, index)}
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
                          (inputDataRotiBasi[index] && inputDataRotiBasi[index].jumlah_roti) ??
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
          <CButton
            color="secondary"
            onClick={handleCloseRotiBasi}
          >
            Close
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick={simpanRotiBasi}>
              Selesai
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DaftarPengiriman
