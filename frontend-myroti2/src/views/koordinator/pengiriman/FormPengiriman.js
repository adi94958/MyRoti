import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CTable,
  CSpinner,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { cilPen, cilTrash, cilPlaylistAdd, cilBurger, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const FormPengiriman = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [modalJumlahRoti, setModalJumlahRoti] = useState(false)
  const [formData, setFormData] = useState({
    tanggal: new Date().toLocaleDateString(), // Mendapatkan tanggal sekarang dalam format lokal
    nama_lapak: '',
    nama_kurir: '',
    kode_lapak: '',
  })

  const [dataArray, setDataArray] = useState([])
  const [inputDataRoti, setInputDataRoti] = useState({
    kode_roti: '',
    nama_roti: '',
    rasa_roti: '',
    jumlah_roti: '',
    harga_satuan_roti: '',
    stok_roti: '',
  })

  useEffect(() => {
    //   handleData();
    const dataTransaksi = JSON.parse(localStorage.getItem('dataTransaksi'))
    setFormData({
      ...formData,
      kode_lapak: dataTransaksi.kode_lapak,
      nama_lapak: dataTransaksi.nama_lapak,
      nama_kurir: dataTransaksi.nama_kurir,
    })
  }, [])

  const [dataRoti, setDataRoti] = useState([])
  const handleRotiModal = () => {
    setModalRoti(true)
    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get('http://localhost:8000/api/koordinator/dataroti')
      .then((response) => {
        console.log(response.data)
        setDataRoti(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }

  const handleJumlahRoti = (user) => {
    setModalRoti(false)
    setModalJumlahRoti(true)
    const rotiPilihan = dataRoti.find((item) => item.kode_roti === user.kode_roti)
    console.log('roti pilihan', rotiPilihan)
    if (rotiPilihan) {
      setInputDataRoti((prevInputDataRoti) => {
        return {
          ...prevInputDataRoti,
          kode_roti: rotiPilihan.kode_roti,
          nama_roti: rotiPilihan.nama_roti,
          rasa_roti: rotiPilihan.rasa_roti,
          harga_satuan_roti: rotiPilihan.harga_satuan_roti,
          stok_roti: rotiPilihan.stok_roti,
        }
      })
      // console.log('Data roti ditemukan:', inputDataRoti);
    } else {
      // Handle jika tidak ada objek dengan kode roti yang sama
      console.log('Tidak ada data roti dengan kode yang sama.')
    }
  }

  const tambahRoti = () => {
    const jumlahRoti = parseInt(inputDataRoti.jumlah_roti, 10) // Mengonversi input ke angka
    // console.log(jumlahRoti)
    console.log(inputDataRoti)
    // Memeriksa apakah input adalah angka dan tidak kosong
    if (!isNaN(jumlahRoti) && jumlahRoti > 0) {
      // Memeriksa apakah jumlah roti yang dimasukkan tidak melebihi stok roti
      if (jumlahRoti <= inputDataRoti.stok_roti) {
        // setFormData({
        //   ...inputDataRoti,
        //   stok_roti: inputDataRoti.jumlah_roti - inputDataRoti.stok_roti,
        // })
        setDataArray([...dataArray, inputDataRoti])
        console.log('data array:', dataArray)
        //console.log(inputDataRoti)
        //setInputDataRoti({ kode_roti: '', jumlah_roti: '', stok_roti: '' })
        setModalJumlahRoti(false)
        navigate('/pengiriman/kelola/kirim')
      } else {
        alert('Jumlah roti melebihi stok yang tersedia!')
      }
    } else {
      alert('Mohon masukkan jumlah roti yang valid!')
    }
  }

  const handleDeleteRoti = (data, index) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${data.nama_roti}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        // Buat salinan baru dari array dataRoti
        const updatedDataRoti = [...dataArray]
        // Menghapus item pada indeks yang diberikan menggunakan splice()
        updatedDataRoti.splice(index, 1)
        // Mengganti dataRoti dengan array yang sudah dihapus itemnya
        setDataArray(updatedDataRoti)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  const handleSubmitTransaksi = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(inputDataRoti)

    const kodeRotiArray = dataArray.map((item) => item.kode_roti.toString())
    const jumlahRotiArray = dataArray.map((item) => item.jumlah_roti)

    const transaksi = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
    }

    console.log(transaksi)

    axios
      .post(
        `http://localhost:8000/api/koordinator/transaksi/create/${formData.kode_lapak}`,
        transaksi,
      )
      .then((response) => {
        console.log('Cart sent successfully', response.data)
        localStorage.removeItem('dataTransaksi')
        navigate('/pengiriman/kelola')
      })
      .catch((error) => {
        console.error('Error sending cart data', error)
      })
  }

  // const filteredData = dataDistribusi.filter((user) => {
  //     return (
  //       searchText === '' ||
  //       user.nama_roti.toLowerCase().includes(searchText.toLowerCase()) ||
  //       user.nama_lapak.toLowerCase().includes(searchText.toLowerCase()) ||
  //       user.nama_kurir.toLowerCase().includes(searchText.toLowerCase()) ||
  //       user.area.toLowerCase().includes(searchText.toLowerCase()) ||
  //       user.alamat_lapak.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //   })

  function handleCancel() {
    localStorage.removeItem('dataTransaksi')
    navigate('/pengiriman/kelola')
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmitTransaksi}>
          <CCardHeader>Form Pengiriman</CCardHeader>
          <CCardBody>
            <CCard>
              <CCardHeader>Data Lapak</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={12}>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="tanggal"
                        floatingLabel="Tanggal"
                        value={formData.tanggal}
                        disabled
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={12}>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="nama_lapak"
                        placeholder="Nama Lapak"
                        floatingLabel="Nama Lapak"
                        value={formData.nama_lapak}
                        disabled
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={12}>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="nama_kurir"
                        placeholder="Nama Kurir"
                        floatingLabel="Nama Kurir"
                        value={formData.nama_kurir}
                        disabled
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard className="mt-4">
              <CCardHeader>Data Roti</CCardHeader>
              <CCardBody>
                <CForm className="mb-3">
                  <CRow>
                    <CCol md={8} xs={6}>
                      <CButton variant="outline" onClick={handleRotiModal}>
                        <CIcon icon={cilBurger} className="mx-8" />
                        Pilih Roti
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CTable striped bordered responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No.</CTableHeaderCell>
                      <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                      <CTableHeaderCell>Rasa Roti</CTableHeaderCell>
                      <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
                      <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
                      <CTableHeaderCell>Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataArray.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Tidak ada data.
                        </td>
                      </tr>
                    ) : (
                      dataArray.map((item, index) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{item.nama_roti}</CTableDataCell>
                          <CTableDataCell>{item.rasa_roti}</CTableDataCell>
                          <CTableDataCell>{item.jumlah_roti}</CTableDataCell>
                          <CTableDataCell>{item.harga_satuan_roti}</CTableDataCell>
                          <CTableDataCell>
                            <CCol>
                              <CButton
                                color="danger"
                                variant="outline"
                                className="ms-2"
                                title="Hapus Data Roti"
                                onClick={() => handleDeleteRoti(item, index)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </CCol>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={1}>
                <CButton
                  color="danger"
                  variant="outline"
                  className="ms-2"
                  title="Back"
                  onClick={handleCancel}
                >
                  Back
                </CButton>
              </CCol>
              <CCol xs={1}>
                {loading ? (
                  <CButton color="primary" variant="outline" type="submit" disabled>
                    <CSpinner color="info" size="sm" />
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" type="submit">
                    Submit
                  </CButton>
                )}
              </CCol>
            </CRow>
            <CRow className="mt-2">
              {message && <p className="error-message alert alert-danger">{message}</p>}
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
      <CModal
        backdrop="static"
        visible={modalRoti}
        className="modal-lg"
        onClose={() => {
          setModalRoti(false)
          setMessage('')
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Pilih Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Kode Roti</CTableHeaderCell>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Stok Roti</CTableHeaderCell>
                <CTableHeaderCell>Rasa Roti</CTableHeaderCell>
                <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRoti.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                dataRoti.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.kode_roti}</CTableDataCell>
                    <CTableDataCell>{item.nama_roti}</CTableDataCell>
                    <CTableDataCell>{item.stok_roti}</CTableDataCell>
                    <CTableDataCell>{item.rasa_roti}</CTableDataCell>
                    <CTableDataCell>{item.harga_satuan_roti}</CTableDataCell>
                    <CTableDataCell>
                      <CForm className="mb-3">
                        <CButton variant="outline" onClick={() => handleJumlahRoti(item)}>
                          <CIcon icon={cilPlus} className="mx-8" />
                          Pilih
                        </CButton>
                      </CForm>
                      <CCol></CCol>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalRoti(false)
              // setMessage('')
              setLoading(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Jumlah Roti */}
      <CModal
        backdrop="static"
        visible={modalJumlahRoti}
        className="modal-sm"
        onClose={() => {
          setModalJumlahRoti(false)
          // setModalRoti(true)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Masukan Jumlah Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              name="jumlah_roti"
              placeholder="Jumlah Roti"
              floatingLabel="Jumlah Roti"
              value={inputDataRoti.jumlah_roti}
              onChange={(e) => setInputDataRoti({ ...inputDataRoti, jumlah_roti: e.target.value })}
              required
            ></CFormInput>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalJumlahRoti(false)
              setModalRoti(true)
              setLoading(false)
            }}
          >
            Back
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick={tambahRoti}>
              Selesai
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}
export default FormPengiriman
