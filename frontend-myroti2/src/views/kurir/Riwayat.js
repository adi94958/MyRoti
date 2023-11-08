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
} from '@coreui/react'

const RiwayatKurir = () => {
  const [riwayatKurir, setRiwayatKurir] = useState([])

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

  return (
    <CCard>
      <CCardHeader>Riwayat Kurir</CCardHeader>
      <CCardBody>
        <CTable striped bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>No.</CTableHeaderCell>
              <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
              <CTableHeaderCell>Alamat</CTableHeaderCell>
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
                <CTableDataCell>{item.catatan_penjual}</CTableDataCell>
                <CTableDataCell>{item.status}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default RiwayatKurir
