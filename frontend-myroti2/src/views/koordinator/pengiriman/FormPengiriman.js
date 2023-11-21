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
import { cilTrash, cilBurger } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const FormPengiriman = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [formData, setFormData] = useState({
    tanggal: new Date().toLocaleDateString(), // Mendapatkan tanggal sekarang dalam format lokal
    kode_lapak: '',
    nama_lapak: '',
    nama_kurir: '',
  })
  const [inputDataRotiArray, setInputDataRotiArray] = useState([])
  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
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
    axios
      .get('http://localhost:8000/api/koordinator/dataroti')
      .then((response) => {
        console.log(response.data)
        setDataRoti(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleJumlahRoti = (item, event, index) => {
    const inputValue = event.target.value
    const jumlahRoti = inputValue !== '' ? parseInt(inputValue, 10) : 0

    setInputDataRotiArray((prevData) => {
      const newData = prevData.map((existingItem) => {
        // Jika kode roti sudah ada dalam array, lakukan pembaruan
        if (existingItem.kode_roti === item.kode_roti) {
          return {
            ...existingItem,
            jumlah_roti: jumlahRoti,
            kode_roti: item.kode_roti,
            nama_roti: item.nama_roti,
            rasa_roti: item.rasa_roti,
            harga_satuan_roti: item.harga_satuan_roti,
            stok_roti: item.stok_roti,
            // tambahkan properti lain yang perlu diperbarui
          }
        }
        // Jika kode roti belum ada dalam array, tambahkan item baru
        return existingItem
      })

      // Jika kode roti belum ada dalam array, tambahkan item baru
      if (!newData.some((existingItem) => existingItem.kode_roti === item.kode_roti)) {
        newData.push({
          jumlah_roti: jumlahRoti,
          kode_roti: item.kode_roti,
          nama_roti: item.nama_roti,
          rasa_roti: item.rasa_roti,
          harga_satuan_roti: item.harga_satuan_roti,
          stok_roti: item.stok_roti,
        })
      }

      console.log(newData) // Output yang diperbarui
      return newData
    })
  }

  const tambahRoti = () => {
    const isValid = inputDataRotiArray.every((item) => {
      const stokRoti = dataRoti.find((roti) => roti.kode_roti === item.kode_roti).stok_roti
      return item.jumlah_roti <= stokRoti && item.jumlah_roti > 0
    })

    if (isValid) {
      const newDataArray = inputDataRotiArray.filter((item) => item.jumlah_roti > 0)
      setDataArray(newDataArray)
      setModalRoti(false)
      navigate('/pengiriman/kelola/kirim')
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      })
      Toast.fire({
        icon: 'success',
        title: 'Berhasil Pilih Roti',
      })
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 7000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      })
      Toast.fire({
        icon: 'warning',
        title:
          'Ada jumlah roti yang melebihi stok yang tersedia atau jumlah roti belum diisi. Silakan periksa kembali jumlah roti yang dimasukan!',
      })
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
        const updatedDataRoti = [...dataArray]
        updatedDataRoti.splice(index, 1)
        setDataArray(updatedDataRoti)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }
  const handleSubmitTransaksi = async (e) => {
    e.preventDefault()

    const nonZeroDataArray = dataArray.filter((item) => item.jumlah_roti > 0)

    if (nonZeroDataArray.length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      })
      Toast.fire({
        icon: 'warning',
        title: 'Silakan untuk memilih roti yang akan di kirim!',
      })
      return
    }

    setLoading(true)

    const kodeRotiArray = nonZeroDataArray.map((item) => item.kode_roti.toString())
    const jumlahRotiArray = nonZeroDataArray.map((item) => item.jumlah_roti)

    const transaksi = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
    }

    axios.post(
      `http://localhost:8000/api/koordinator/transaksi/create/${formData.kode_lapak}`,
      transaksi,
    )
    Swal.fire({
      title: 'Berhasil',
      text: `Berhasil melakukan pengiriman`,
      icon: 'success',
      confirmButtonText: 'OK',
    })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/pengiriman/kelola'
        }
      })
      .then((response) => {
        console.log('Cart sent successfully', response.data)
        localStorage.removeItem('dataTransaksi')
        navigate('/pengiriman/kelola')
      })
      .catch((error) => {
        console.error('Error sending cart data', error)
      })
  }

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
                <CRow>
                  <CCol md={8} xs={6}>
                    <CButton variant="outline" onClick={handleRotiModal}>
                      <CIcon icon={cilBurger} className="mx-8 me-2" />
                      Pilih Roti
                    </CButton>
                  </CCol>
                </CRow>
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
                        <CTableRow key={index}>
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
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Stok Roti</CTableHeaderCell>
                <CTableHeaderCell>Rasa Roti</CTableHeaderCell>
                <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
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
                dataRoti.map((roti, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{roti.nama_roti}</CTableDataCell>
                    <CTableDataCell>{roti.stok_roti}</CTableDataCell>
                    <CTableDataCell>{roti.rasa_roti}</CTableDataCell>
                    <CTableDataCell>{roti.harga_satuan_roti}</CTableDataCell>
                    <CTableDataCell>
                      <CForm>
                        <CFormInput
                          size="sm"
                          name="jumlah_roti"
                          value={
                            (inputDataRotiArray.find((item) => item.kode_roti === roti.kode_roti) &&
                              inputDataRotiArray.find((item) => item.kode_roti === roti.kode_roti)
                                .jumlah_roti) ??
                            0
                          }
                          onChange={(e) => handleJumlahRoti(roti, e)}
                          required
                        />
                      </CForm>
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
              setLoading(false)
            }}
          >
            Close
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
