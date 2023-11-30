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
import { cilPen, cilTrash, cilSearch, cilBurger } from '@coreui/icons'
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
    const searchableFields = [
      'kode_roti',
      'nama_roti',
      'stok_roti',
      'rasa_roti',
      'harga_satuan_roti',
    ]

    return (
      searchText === '' ||
      searchableFields.some((field) => {
        const fieldValue = roti[field]

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
                  <CCol md={4} xs={6}>
                    <Link to="/roti/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilBurger} className="mx-8 me-2" />
                        Tambah Roti
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                    <CTableHeaderCell>Stok Roti</CTableHeaderCell>
                    <CTableHeaderCell>Rasa Roti</CTableHeaderCell>
                    <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
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
                        <CTableDataCell>{user.nama_roti}</CTableDataCell>
                        <CTableDataCell>{user.stok_roti}</CTableDataCell>
                        <CTableDataCell>{user.rasa_roti}</CTableDataCell>
                        <CTableDataCell>{user.harga_satuan_roti}</CTableDataCell>
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

export default KelolaDataDataRoti
