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
  CInputGroup,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilUserPlus, cilSearch } from '@coreui/icons'
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

  const filteredData = dataLapak.filter((lapak) => {
    const searchableFields = ['kode_lapak', 'nama_lapak', 'nama_kurir', 'area', 'alamat_lapak']

    return (
      searchText === '' ||
      searchableFields.some((field) => {
        const fieldValue = lapak[field]

        // Check if the field value is a string before applying toLowerCase()
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(searchText.toLowerCase())
        )
      })
    )
  })

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
                  <CCol md={4} xs={6}>
                    <Link to="/lapak/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-8  me-2" />
                        Tambah Lapak
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                    {/* <CTableHeaderCell>No Telp</CTableHeaderCell> */}
                    <CTableHeaderCell>Kecamatan</CTableHeaderCell>
                    <CTableHeaderCell>Alamat</CTableHeaderCell>
                    <CTableHeaderCell>Nama Kurir</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((user, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                        <CTableDataCell>{user.nama_lapak}</CTableDataCell>
                        {/* <CTableDataCell>{user.no_telp}</CTableDataCell> */}
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
              <CPagination
                activePage={currentPage}
                pages={Math.ceil(filteredData.length / itemsPerPage)}
                onActivePageChange={setCurrentPage}
                align="center"
                doubleArrows={false} // Menghilangkan tombol "Garis ganda"
              >
                <CPaginationItem
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
                >
                  Sebelumnya
                </CPaginationItem>

                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                  <CPaginationItem
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                  style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
                >
                  Berikutnya
                </CPaginationItem>
              </CPagination>
              <div className="text-muted mt-2">
                Total Data: {filteredData.length}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
export default Lapak
