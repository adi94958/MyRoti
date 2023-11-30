import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { cilSearch } from '@coreui/icons'

const DataPengiriman = () => {
  const [searchText, setSearchText] = useState('')
  const [dataRoti, setDataRoti] = useState([])
  const [visible, setVisible] = useState(false)
  const [kurir_id, setKurirId] = useState('')
  const [dataTransaksi, setDataTransaksi] = useState([])
  const [dataPenjualan, setDataPenjualan] = useState([])

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
    handleData()
    handlePenjualan()
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

  const handlePenjualan = () => {
    axios
      .get('http://localhost:8000/api/kurir/datapenjualan')
      .then((response) => {
        console.log(response.data)
        setDataPenjualan(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const filteredDataWithPenjualan = dataTransaksi
    .filter((lapak) => {
      const lapakName = lapak?.lapak?.nama_lapak?.toString()?.toLowerCase() || ''
      const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
      const isStatus = lapak?.status === 'finished'
      const isKurirMatch = lapak?.id_kurir === kurir_id
      return lapakNameMatch && isStatus && isKurirMatch
    })
    .map((lapak) => {
      const matchingPenjualan = dataPenjualan.find(
        ({ kode_lapak }) => kode_lapak === lapak.lapak.kode_lapak,
      )
      const isMatching = matchingPenjualan !== undefined
      return {
        ...lapak,
        dataPenjualan: {
          tanggal_pengambilan: matchingPenjualan?.tanggal_pengambilan || '',
          uang_setoran: matchingPenjualan?.uang_setoran || 0,
        },
      }
    })

  console.log('filteredDataWithPenjualan:', filteredDataWithPenjualan)

  const handleRotiClick = async (lapak) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/kurir/riwayat-transaksi/${lapak.id_transaksi}`,
      )
      console.log('Response:', response)
      if (response.status >= 200 && response.status < 300) {
        const data = response.data
        console.log('Data Roti:', data.detail_roti)
        setDataRoti(data.detail_roti)
        setVisible(true)
        console.log(dataTransaksi)
        console.log(dataRoti)
      } else {
        throw new Error('Gagal mengambil data roti')
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message)
    }
  }

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
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Alamat Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengambilan</CTableHeaderCell>
                    <CTableHeaderCell>Roti</CTableHeaderCell>
                    <CTableHeaderCell>Uang Setoran</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredDataWithPenjualan.map((lapak, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.alamat_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.dataPenjualan?.tanggal_pengambilan}</CTableDataCell>
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
                      <CTableDataCell>{lapak.dataPenjualan?.uang_setoran}</CTableDataCell>
                      <CTableDataCell>
                        {lapak.status === 'finished' ? (
                          <span style={{ color: 'green' }}> {lapak.status} </span>
                        ) : (
                          <span>{lapak.status}</span>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        backdrop="static"
        visible={visible}
        className="modal"
        onClose={() => {
          setVisible(false)
        }}
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
                <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRoti.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti_basi}</CTableDataCell>
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
    </div>
  )
}

export default DataPengiriman
