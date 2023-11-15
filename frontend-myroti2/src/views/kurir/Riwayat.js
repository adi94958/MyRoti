import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const RiwayatKurir = () => {
  const [riwayatKurir, setRiwayatKurir] = useState([])
  const [visible, setVisible] = useState(false)
  const [dataRoti, setDataRoti] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(null)

  useEffect(() => {
    fetchRiwayatKurir()
  }, [])

  const fetchRiwayatKurir = () => {
    axios
      .get('http://127.0.0.1:8000/api/kurir/riwayat')
      .then((response) => {
        setRiwayatKurir(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleRotiClick = (lapak, index) => {
    const combinedRoti = lapak.roti.map((roti) => {
      const matchingRotiBasi = lapak.rotiBasi.find((rotiBasi) => rotiBasi.nama === roti.nama)
      return {
        nama: roti.nama,
        jumlah: roti.jumlah,
        jumlahBasi: matchingRotiBasi ? matchingRotiBasi.jumlah : 0,
      }
    })

    setDataRoti(combinedRoti)
    setCurrentItemIndex(index)
    setVisible(true)
  }

  return (
    <CCard>
      <CCardHeader>Riwayat Kurir</CCardHeader>
      <CCardBody>
        <CTable striped bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>No.</CTableHeaderCell>
              <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
              <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
              <CTableHeaderCell>Detail Roti</CTableHeaderCell>
              <CTableHeaderCell>Catatan Penjual</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {riwayatKurir.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.nama_lapak}</CTableDataCell>
                <CTableDataCell>{item.alamat_lapak}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    variant="outline"
                    className="ms-2"
                    title="Detail Roti"
                    onClick={() => handleRotiClick(item, index)}
                  >
                    <CIcon icon={cilSearch} className="mx-12 me-2" />
                    Open Detail
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <div style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                    {item.catatan_penjual}
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="success" style={{ color: 'white' }} disabled>
                    {item.status}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      {visible && (
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Data Roti</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {dataRoti.length === 0 ? (
              <p>No data available.</p>
            ) : (
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataRoti.map((roti, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{roti.nama}</CTableDataCell>
                      <CTableDataCell>{roti.jumlah}</CTableDataCell>
                      <CTableDataCell>{roti.jumlahBasi}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </CCard>
  )
}

export default RiwayatKurir
