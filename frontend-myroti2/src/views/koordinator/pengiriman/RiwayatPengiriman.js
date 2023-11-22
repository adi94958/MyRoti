import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUserPlus, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'

const RiwayatPengiriman = () => {
  const [searchText, setSearchText] = useState('')
  const [dataRoti, setDataRoti] = useState([])
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [foto, setFoto] = useState('')
  const [dataTransaksi, setDataTransaksi] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    axios
      .get('http://localhost:8000/api/kurir/transaksi')
      .then((response) => {
        console.log(response.data)
        setDataTransaksi(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const formatDate = (date) => {
    const newDate = new Date(date)
    const formattedDate = `${newDate.getDate().toString().padStart(2, '0')}-${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${newDate.getFullYear()}`
    return formattedDate
  }

  const filteredData = dataTransaksi.filter((lapak) => {
    const lapakName = lapak?.lapak?.nama_lapak?.toString()?.toLowerCase() || ''
    const kurirName = lapak?.lapak?.kurir?.nama?.toString()?.toLowerCase() || ''
    const status = lapak?.status?.toLowerCase() || ''
    const tanggalPengiriman = formatDate(lapak.tanggal_pengiriman)

    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const kurirNameMatch = kurirName.includes(searchText.toLowerCase())
    const statusMatch = status.includes(searchText.toLowerCase())
    const tanggalPengirimanMatch = tanggalPengiriman.includes(searchText.toLowerCase())

    const isStatus = lapak?.status !== 'closed'
    return (lapakNameMatch || kurirNameMatch || statusMatch || tanggalPengirimanMatch) && isStatus
  })

  const handleRotiClick = (lapak) => {
    setDataRoti(lapak.transaksi_roti)
    setVisible(true)
    console.log(dataTransaksi)
    console.log(dataRoti)
  }

  const handleFoto = (lapak) => {
    if (lapak.status === 'delivered') {
      console.log(lapak.bukti_pengiriman)
      axios
        .get('http://localhost:8000/api/koordinator/' + lapak.bukti_pengiriman, {
          responseType: 'blob',
        })
        .then((response) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            const dataURL = event.target.result
            setFoto(dataURL)
            setOpen(true)
          }
          reader.readAsDataURL(response.data) // Read the blob response as data URL
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'Kurir Belum Sampai',
      })
    }
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus transaksi lapak ${data.lapak.nama_lapak}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/koordinator/transaksi/delete/${data.id_transaksi}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            window.location.href = '/pengiriman/list'
          })
          .catch((error) => {
            console.error('Error deleting data:', error)
          })
      }
    })
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Data Pengiriman Kurir</CCardHeader>
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
                    <CTableHeaderCell>Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Kurir</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengiriman</CTableHeaderCell>
                    <CTableHeaderCell>Roti</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Pengiriman</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((lapak, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.kurir.nama}</CTableDataCell>
                      <CTableDataCell>{formatDate(lapak.tanggal_pengiriman)}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          size="sm"
                          className="ms-2"
                          title="Daftar Roti"
                          onClick={() => handleRotiClick(lapak)}
                        >
                          <CIcon icon={cilSearch} className="mx-12 me-2" />
                          Open Detail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton variant="outline" size="sm" onClick={() => handleFoto(lapak)}>
                          Lihat
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <CModal
          alignment="center"
          visible={visible}
          className="modal"
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Data Roti</CModalTitle>
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
                {dataRoti.map((roti, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{roti.roti.nama_roti}</CTableDataCell>
                    <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
      {open && (
        <CModal
          size="lg"
          alignment="center"
          visible={open}
          onClose={() => setOpen(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Preview Foto</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <img src={foto} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setOpen(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </div>
  )
}

export default RiwayatPengiriman
