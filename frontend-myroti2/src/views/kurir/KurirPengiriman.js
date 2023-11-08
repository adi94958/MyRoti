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
import { cilSearch, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'

const dataTransaksi = [
  {
    nama_lapak: 'Lapak A',
    status: 'Ready',
    roti: [
      { nama: 'Roti Tawar', jumlah: 10 },
      { nama: 'Roti Coklat', jumlah: 5 },
      { nama: 'Roti Keju', jumlah: 15 },
    ],
    nama_kurir: 'Kurir X',
    tanggal_pengiriman: '2023-11-05',
  },
  {
    nama_lapak: 'Lapak B',
    status: 'Delivered',
    roti: [
      { nama: 'Roti Tawar', jumlah: 8 },
      { nama: 'Roti Keju', jumlah: 12 },
    ],
    nama_kurir: 'Adrian',
    tanggal_pengiriman: '2023-11-06',
  },
  {
    nama_lapak: 'Lapak C',
    status: 'On Going',
    roti: [
      { nama: 'Roti Coklat', jumlah: 7 },
      { nama: 'Roti Keju', jumlah: 10 },
    ],
    nama_kurir: 'Adrian',
    tanggal_pengiriman: '2023-11-07',
  },
  {
    nama_lapak: 'Lapak D',
    status: 'Ready',
    roti: [
      { nama: 'Roti Tawar', jumlah: 6 },
      { nama: 'Roti Pandan', jumlah: 9 },
    ],
    nama_kurir: 'Adrian',
    tanggal_pengiriman: '2023-11-08',
  },
  {
    nama_lapak: 'Lapak E',
    status: 'Closed',
    roti: [
      { nama: 'Roti Coklat', jumlah: 10 },
      { nama: 'Roti Pisang', jumlah: 8 },
    ],
    nama_kurir: 'Adrian',
    tanggal_pengiriman: '2023-11-09',
  },
]

const DataPengiriman = () => {
  const [searchText, setSearchText] = useState('')
  const [dataRoti, setDataRoti] = useState([])
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [foto, setFoto] = useState(null)
  const [dataFoto, setDataFoto] = useState([])
  const [nama, setNama] = useState([])

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setNama(infoLogin.nama)
  }, [])

  const filteredData = dataTransaksi.filter((lapak) => {
    const lapakName = lapak.nama_lapak.toString().toLowerCase()
    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const kurirNameMatch = lapak.nama_kurir === nama
    const isStatus = lapak.status !== 'Delivered' && lapak.status !== 'Closed'
    return lapakNameMatch && kurirNameMatch && isStatus
  })

  const handleRotiClick = (lapak) => {
    setDataRoti(lapak.roti)
    setVisible(true)
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

  const handleSubmit = () => {}

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
                    <CTableHeaderCell>Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Roti</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Pengiriman</CTableHeaderCell>
                    <CTableHeaderCell>Submit</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((lapak, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          variant="outline"
                          className="mx-2"
                          onClick={() => handleRotiClick(lapak)}
                        >
                          Lihat Roti
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CFormInput
                            type="file"
                            size="md"
                            id="formFileSm"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={(e) => handleFoto(e, index)}
                            disabled={lapak.status === 'Ready'}
                          />
                          <CButton
                            variant="outline"
                            size="sm"
                            className="mx-2"
                            onClick={() => handleFile(index)}
                            disabled={lapak.status === 'Ready'}
                          >
                            Lihat
                          </CButton>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          variant="outline"
                          size="sm"
                          className="mx-2"
                          onClick={() => handleSubmit()}
                          disabled={lapak.status === 'Ready'}
                        >
                          Submit
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color={lapak.status === 'Ready' ? 'success' : 'danger'}
                          style={{ color: 'white' }}
                          onClick={() => {}}
                        >
                          {lapak.status}
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
                    <CTableDataCell>{roti.nama}</CTableDataCell>
                    <CTableDataCell>{roti.jumlah}</CTableDataCell>
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
