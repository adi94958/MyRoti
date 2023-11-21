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
  CInputGroup,
  CFormInput,
  CCol,
  CRow,
  CForm
} from '@coreui/react'
import { cilCart, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const Pengiriman = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('') //State untuk seatch
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

  const filteredData = data.filter((lapak) => {
    const searchableFields = [
      'nama_lapak',
      'nama_kurir',
    ];

    return searchText === '' || searchableFields.some((field) => {
      const fieldValue = lapak[field];

      // Check if the field value is a string before applying toLowerCase()
      return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(searchText.toLowerCase());
    });
  });

  return (
    <CCard>
      <CCardHeader>Data Pengiriman</CCardHeader>
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
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
              <CTableHeaderCell>Kurir</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
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
              ))
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Pengiriman
