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
  CBadge,
  CFormLabel,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUserPlus, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'

const DataKeuangan = () => {
  const [searchText, setSearchText] = useState('')
  const [dataLapak, setDataLapak] = useState([])
  const [dataKurir, setDataKurir] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const itemsPerPageOptions = [10, 25, 50, dataKurir.length] // Jumlah data per halaman

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    axios
      .get('http://localhost:8000/api/keuangan/kurir')
      .then((response) => {
        console.log(response.data)
        setDataKurir(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const filteredData = dataKurir.filter((Kurir) => {
    const kurirName = Kurir?.nama?.toString()?.toLowerCase() || ''

    const nameMatch = kurirName.includes(searchText.toLowerCase())

    return nameMatch
  })
  const handleTransaksiClick = (lapak) => {
    setDataLapak(lapak)
    console.log(lapak)
    setVisible(true)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = itemsPerPage === dataKurir.length ? dataKurir.length : startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1)
    setItemsPerPage(value)
  }

  const startRange = startIndex + 1
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length)
  const isDataEmpty = filteredData.length === 0

  return (
    <>
      <div>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Data Pengiriman Kurir</CCardHeader>
              <CCardBody>
                <CForm className="mb-3">
                  <CRow>
                    <CCol md={6} xs={8}>
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
                    <CCol md={3} xs={6} className="d-flex text-start">
                      <CBadge
                        color="white"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: 'black',
                          fontSize: '20px',
                        }}
                      >
                        Tanggal: {new Date().toLocaleDateString()}
                      </CBadge>
                    </CCol>
                    <CCol md={2} xs={3} className="text-end mt-1">
                      <CFormLabel>Rows Per Page:</CFormLabel>
                    </CCol>
                    <CCol md={1} xs={3} className="text-start">
                      <CFormSelect
                        className="form-select"
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                      >
                        {itemsPerPageOptions.map((option) => (
                          <option key={option} value={option}>
                            {option === dataKurir.length ? 'All' : option}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CForm>
                <CTable striped bordered responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Kurir</CTableHeaderCell>
                      <CTableHeaderCell>Data Transaksi</CTableHeaderCell>
                      <CTableHeaderCell>Penghasilan</CTableHeaderCell>
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
                      paginatedData.map((kurir, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{kurir.nama}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              variant="outline"
                              size="sm"
                              className="ms-2"
                              title="Daftar Roti"
                              onClick={() => handleTransaksiClick(kurir.transaksi)}
                            >
                              <CIcon icon={cilSearch} className="mx-12 me-2" />
                              Open Detail
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {kurir && kurir.penghasilan && kurir.penghasilan.length > 0
                              ? kurir.penghasilan[0].penghasilan
                              : 'Belum ada transaksi'}
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
                <CRow className="mt-2 mb-2">
                  <CCol md={4} xs={8}>
                    Total Rows: {filteredData.length} Page: {startRange} of {endRange}
                  </CCol>
                </CRow>
                <CPagination
                  activepage={currentPage}
                  pages={Math.ceil(filteredData.length / itemsPerPage)}
                  onActivePageChange={setCurrentPage}
                  align="center"
                  doublearrows="false"
                >
                  <CPaginationItem
                    onClick={() => !isDataEmpty && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1 || isDataEmpty}
                    style={{ cursor: isDataEmpty ? 'default' : 'pointer' }}
                  >
                    Prev
                  </CPaginationItem>

                  {Array.from(
                    { length: Math.ceil(filteredData.length / itemsPerPage) },
                    (_, index) => {
                      const pageIndex = index + 1
                      const totalPages = Math.ceil(filteredData.length / itemsPerPage)

                      // Display three consecutive pages centered around the current page
                      if (
                        (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1) ||
                        totalPages <= 3 ||
                        (currentPage === 1 && pageIndex <= 3) ||
                        (currentPage === totalPages && pageIndex >= totalPages - 2)
                      ) {
                        return (
                          <CPaginationItem
                            key={pageIndex}
                            active={pageIndex === currentPage}
                            onClick={() => setCurrentPage(pageIndex)}
                            style={{ cursor: 'pointer' }}
                          >
                            {pageIndex}
                          </CPaginationItem>
                        )
                      }

                      // Display ellipses for pages before the current page
                      if (pageIndex === 1 && currentPage > 2) {
                        return (
                          <CPaginationItem key={pageIndex} disabled style={{ cursor: 'default' }}>
                            ...
                          </CPaginationItem>
                        )
                      }

                      // Display ellipses for pages after the current page
                      if (pageIndex === totalPages && currentPage < totalPages - 1) {
                        return (
                          <CPaginationItem key={pageIndex} disabled style={{ cursor: 'default' }}>
                            ...
                          </CPaginationItem>
                        )
                      }

                      return null
                    },
                  )}

                  <CPaginationItem
                    onClick={() => !isDataEmpty && setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(filteredData.length / itemsPerPage) || isDataEmpty
                    }
                    style={{ cursor: isDataEmpty ? 'default' : 'pointer' }}
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          alignment="center"
          visible={visible}
          className="modal"
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Data lapak</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable striped bordered responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                  <CTableHeaderCell>Jumlah Uang Setoran</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dataLapak.length > 0 ? (
                  dataLapak.map((lapak, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        {lapak
                          ? lapak.lapak
                            ? lapak.lapak.nama_lapak
                            : 'Belum ada transaksi'
                          : 'Belum ada transaksi'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {lapak && lapak.data_penjualan
                          ? lapak.data_penjualan.uang_setoran
                          : 'Belum ada transaksi'}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="2" style={{ textAlign: 'center' }}>
                      Belum ada transaksi yang selesai
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        )
      </div>
    </>
  )
}

export default DataKeuangan
