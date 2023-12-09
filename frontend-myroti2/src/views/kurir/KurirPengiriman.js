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
  CFormLabel,
  CFormSelect,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'

const DataPengiriman = () => {
  const [searchText, setSearchText] = useState('')
  const [dataRoti, setDataRoti] = useState([])
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [foto, setFoto] = useState(null)
  const [dataFoto, setDataFoto] = useState([])
  const [kurir_id, setKurirId] = useState('')
  const [dataTransaksi, setDataTransaksi] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerPageOptions = [10, 25, 50, dataTransaksi.length]; // Jumlah data per halaman

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
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
  const filteredData = dataTransaksi.filter((lapak) => {
    const lapakName = lapak?.lapak.nama_lapak?.toString()?.toLowerCase() || ''
    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const isStatus = lapak?.status !== 'delivered' && lapak?.status !== 'finished'
    const isKurirMatch = lapak?.id_kurir === kurir_id
    return lapakNameMatch && isStatus && isKurirMatch
  })

  const handleRotiClick = (lapak) => {
    setDataRoti(lapak.transaksi_roti)
    setVisible(true)
    console.log(dataTransaksi)
    console.log(dataRoti)
  }

  const handleFile = (index) => {
    const newDataFoto = [...dataFoto]
    const selectedFile = newDataFoto[index]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataURL = event.target.result
        setFoto(dataURL) // Set the data URL as the image source
        setOpen(true)
      }
      reader.readAsDataURL(selectedFile) // Read the file as data URL
    }
  }

  const handleFoto = (event, index) => {
    const selectedFile = event.target.files[0]
    const newDataFoto = [...dataFoto]
    newDataFoto[index] = selectedFile
    setDataFoto(newDataFoto)
    console.log(newDataFoto)
  }

  const handleStatus = (lapak) => {
    axios
      .put(`http://localhost:8000/api/kurir/transaksi/${lapak.id_transaksi}`, {
        status: 'on delivery',
      })
      .then(() => {
        // The PUT request is successful, now you can refresh the data
        handleData()
      })
      .catch((error) => {
        console.error('Error updating status:', error)
      })
  }
  const handleSubmit = (lapak, index) => {
    const newDataFoto = [...dataFoto]
    const selectedFile = newDataFoto[index]

    if (selectedFile) {
      const formData = new FormData()
      formData.append('bukti_pengiriman', selectedFile)
      axios
        .post(`http://localhost:8000/api/kurir/transaksi/${lapak.id_transaksi}`, formData)
        .then((response) => {
          console.log('File uploaded successfully', response)
          setFoto(null)
          handleData()
        })
        .catch((error) => {
          console.error('Error uploading file:', error)
        })
    } else {
      console.error('No file selected for upload')
    }
  }

<<<<<<< Updated upstream
=======
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === dataTransaksi.length ? dataTransaksi.length : startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1);
    setItemsPerPage(value);
  };

  const startRange = startIndex + 1;
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length);

>>>>>>> Stashed changes
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
                  <CCol md={2} xs={3}>
                    <CFormLabel>Rows Per Page:</CFormLabel>
                  </CCol>
                  <CCol md={2} xs={3}>
                    <CFormSelect
                      className="form-select"
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option === dataTransaksi.length ? 'All' : option}
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
                    <CTableHeaderCell>Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
                    <CTableHeaderCell>Roti</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Pengiriman</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((lapak, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.alamat_lapak}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti"
                          onClick={() => handleRotiClick(lapak)}
                        >
                          <CIcon icon={cilSearch} className="mx-12 me-2" />
                          Open Detail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CFormInput
                            type="file"
                            size="sm"
                            id="formFileSm"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={(e) => handleFoto(e, index)}
                            disabled={lapak.status === 'ready'}
                            style={{ width: '60%' }}
                          />
                          <CButton
                            variant="outline"
                            size="sm"
                            className="mx-2"
                            onClick={() => handleFile(index)}
                            disabled={lapak.status === 'ready'}
                          >
                            Lihat
                          </CButton>
                          <CButton
                            variant="outline"
                            size="sm"
                            className="mx-1"
                            onClick={() => handleSubmit(lapak, index)}
                            disabled={lapak.status === 'ready'}
                          >
                            Submit Foto
                          </CButton>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            lapak.status === 'ready'
                              ? 'green' // Assuming 'ready' status should display green text
                              : 'red',
                        }}
                      >
                        {lapak.status}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          variant="outline"
                          onClick={() => handleStatus(lapak)}
                          disabled={lapak.status === 'on delivery'}
                        >
                          Accept
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
<<<<<<< Updated upstream
=======
              <CRow className='mt-2 mb-2'>
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
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ cursor: 'pointer' }}
                >
                  Prev
                </CPaginationItem>

                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => {
                  const pageIndex = index + 1;
                  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

                  // Display three consecutive pages centered around the current page
                  if (
                    (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1) ||
                    (totalPages <= 3 || (currentPage === 1 && pageIndex <= 3) || (currentPage === totalPages && pageIndex >= totalPages - 2))
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
                    );
                  }

                  // Display ellipses for pages before the current page
                  if (pageIndex === 1 && currentPage > 2) {
                    return (
                      <CPaginationItem
                        key={pageIndex}
                        disabled
                        style={{ cursor: 'default' }}
                      >
                        ...
                      </CPaginationItem>
                    );
                  }

                  // Display ellipses for pages after the current page
                  if (pageIndex === totalPages && currentPage < totalPages - 1) {
                    return (
                      <CPaginationItem
                        key={pageIndex}
                        disabled
                        style={{ cursor: 'default' }}
                      >
                        ...
                      </CPaginationItem>
                    );
                  }

                  return null;
                })}

                <CPaginationItem
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                  style={{ cursor: 'pointer' }}
                >
                  Next
                </CPaginationItem>
              </CPagination>
>>>>>>> Stashed changes
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <CModal
          alignment="center"
          visible={visible}
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

export default DataPengiriman
