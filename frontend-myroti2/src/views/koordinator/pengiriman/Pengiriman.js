import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
} from '@coreui/react'
import { cilCart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const Pengiriman = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    handleData()
  }, [])

  function handleData() {
    axios
      .get('http://localhost:8000/api/koordinator/transaksi')
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  function handleKirim(item) {
    console.log(item)
    localStorage.setItem(
      'dataTransaksi',
      JSON.stringify({
        kode_lapak: item.kode_lapak,
        nama_lapak: item.nama_lapak,
        nama_kurir: item.nama,
      }),
    )
    navigate('/pengiriman/kelola/kirim')
  }

  return (
    <CCard>
      <CCardHeader>Data Pengiriman</CCardHeader>
      <CCardBody>
        <CForm className="mb-3"></CForm>
        <CTable striped bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>No.</CTableHeaderCell>
              <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
              <CTableHeaderCell>Kurir</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((item, index) => {
              const isLast = index === data.length - 1

              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.nama_lapak}</CTableDataCell>
                  <CTableDataCell>{item.nama}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      variant="outline"
                      className="ms-2"
                      title="Kirim"
                      onClick={() => handleKirim(item)}
                    >
                      <CIcon icon={cilCart} className="mx-12" />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Pengiriman
