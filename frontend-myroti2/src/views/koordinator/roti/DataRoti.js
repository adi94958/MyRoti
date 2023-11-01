import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
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
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilSend,
  cilTrash,
  cilSearch,
  cilShortText,
  cilCalendar,
  cilClock,
  cilUserPlus,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

const KelolaDataDataRoti = () => {
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [dataRoti, setDataRoti] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
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
  }, [])

  function handleEdit(data) {
    localStorage.setItem(
      'lsDataRoti',
      JSON.stringify({
        kode_roti: data.kode_roti,
        nama_roti: data.nama_roti,
        stok_roti: data.stok_roti,
        rasa_roti: data.rasa_roti,
        harga_satuan_roti: data.harga_satuan_roti,
      }),
    )
    navigate('/roti/update')
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${data.nama_roti}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/koordinator/dataroti/delete/${data.kode_roti}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            window.location.href = '/roti'
          })
          .catch((error) => {
            console.error('Error deleting data:', error)
          })
      }
    })
  }

  const filteredData = dataRoti.filter((roti) => {
    const kodeRoti = roti.kode_roti.toString().toLowerCase()
    const namaRoti = roti.nama_roti.toString().toLowerCase()
    const stokRoti = roti.stok_roti.toString().toLowerCase()
    const rasaRoti = roti.rasa_roti.toString().toLowerCase()
    const hargaSatuanRoti = roti.harga_satuan_roti.toString().toLowerCase()

    return (
      searchText === '' ||
      kodeRoti.includes(searchText.toLowerCase()) ||
      namaRoti.includes(searchText.toLowerCase()) ||
      stokRoti.includes(searchText.toLowerCase()) ||
      rasaRoti.includes(searchText.toLowerCase()) ||
      hargaSatuanRoti.includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Data Roti</CCardHeader>
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
                  <CCol md={4} xs={6} className="text-end">
                    <Link to="/roti/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-2" />
                        Tambah Roti
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
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
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((roti) => (
                      <CTableRow key={roti.id}>
                        <CTableDataCell>{roti.kode_roti}</CTableDataCell>
                        <CTableDataCell>{roti.nama_roti}</CTableDataCell>
                        <CTableDataCell>{roti.stok_roti}</CTableDataCell>
                        <CTableDataCell>{roti.rasa_roti}</CTableDataCell>
                        <CTableDataCell>{roti.harga_satuan_roti}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Edit Data Roti"
                              onClick={() => handleEdit(roti)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Roti"
                              onClick={() => handleDelete(roti)}
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
        </CCol>
      </CRow>
    </div>
  )
}

export default KelolaDataDataRoti
