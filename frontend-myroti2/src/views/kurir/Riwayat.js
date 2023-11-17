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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const RiwayatKurir = () => {
  const [riwayatKurir, setRiwayatKurir] = useState([])
  const [visible, setVisible] = useState(false)
  const [dataRoti, setDataRoti] = useState([])
  const [kurir_id, setKurirId] = useState('')
  const [selectedIdTransaksi, setSelectedIdTransaksi] = useState(null)

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
    fetchRiwayatKurir()
  }, [])

  const fetchRiwayatKurir = () => {
    axios
      .get(`http://127.0.0.1:8000/api/kurir/riwayat?id_kurir=${kurir_id}`)
      .then((response) => {
        setRiwayatKurir(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleRotiClick = async (item, index) => {
    try {
      const id_transaksi = item.id_transaksi

      // Use axios for the second API call
      const response = await axios.get(`/api/riwayat-transaksi/${id_transaksi}`)
      const result = response.data

      console.log(result)
      setDataRoti(result.detail_roti)
      setSelectedIdTransaksi(id_transaksi)
      setVisible(true)
    } catch (error) {
      console.error('Error fetching detail roti:', error)
    }
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
