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
  cilFile,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

const Lapak = () => {
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [dataLapak, setDataLapak] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get('http://localhost:8000/api/koordinator/lapak')
      .then((response) => {
        console.log(response.data)
        setDataLapak(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  function handleEdit(data) {
    localStorage.setItem(
      'lsDataLapak',
      JSON.stringify({
        kode_lapak: data.kode_lapak,
        nama_lapak: data.nama_lapak,
        nama_kurir: data.nama,
        id_kurir: data.id_kurir,
        area: data.area_distribusi,
        area_id: data.area_id,
        alamat: data.alamat_lapak,
      }),
    )
    navigate('/lapak/update')
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${data.nama_lapak}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/koordinator/lapak/delete/${data.kode_lapak}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            window.location.href = '/lapak'
          })
          .catch((error) => {
            // Handle error jika terjadi kesalahan saat menghapus data
            console.error('Error deleting data:', error)
          })
      }
    })
  }

  const filteredData = dataLapak.filter((user) => {
    return (
      searchText === '' ||
      user.kode_lapak.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nama_lapak.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nama_kurir.toLowerCase().includes(searchText.toLowerCase()) ||
      user.area.toLowerCase().includes(searchText.toLowerCase()) ||
      user.alamat_lapak.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Data Lapak</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <Link to="/lapak/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-8" />
                        Tambah Lapak
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    {/* <CTableHeaderCell>Kode Lapak</CTableHeaderCell> */}
                    <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Kecamatan</CTableHeaderCell>
                    <CTableHeaderCell>Alamat</CTableHeaderCell>
                    <CTableHeaderCell>Nama Kurir</CTableHeaderCell>
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
                    filteredData.map((user) => (
                      <CTableRow key={user.id}>
                        {/* <CTableDataCell>{user.kode_lapak}</CTableDataCell> */}
                        <CTableDataCell>{user.nama_lapak}</CTableDataCell>
                        <CTableDataCell>{user.area_distribusi}</CTableDataCell>
                        <CTableDataCell>{user.alamat_lapak}</CTableDataCell>
                        <CTableDataCell>{user.nama}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Edit Data Roti"
                              onClick={() => handleEdit(user)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Roti"
                              onClick={() => handleDelete(user)}
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
export default Lapak
