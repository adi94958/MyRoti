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
    // Digunakan untuk mendapatkan data riwayat kurir dari API
    // Anda dapat menggantinya dengan data dummy Anda
    // axios
    //   .get('http://127.0.0.1:8000/api/kurir/riwayat')
    //   .then((response) => {
    //     setRiwayatKurir(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    // Dummy data riwayat kurir
    const dummyRiwayatKurir = [
      {
        nama_lapak: 'Lapak A',
        alamat_lapak: 'Alamat Lapak A',
        catatan_penjual: 'Catatan Penjual A',
        status: 'Finished',
        roti: [
          { nama: 'Roti Tawar', jumlah: 10 },
          { nama: 'Roti Coklat', jumlah: 5 },
          { nama: 'Roti Keju', jumlah: 15 },
        ],
      },
      {
        nama_lapak: 'Lapak B',
        alamat_lapak: 'Alamat Lapak B',
        catatan_penjual: 'Catatan Penjual B',
        status: 'Finished',
        roti: [
          { nama: 'Roti Tawar', jumlah: 8 },
          { nama: 'Roti Keju', jumlah: 12 },
        ],
      },
      {
        nama_lapak: 'Lapak C',
        alamat_lapak: 'Alamat Lapak C',
        catatan_penjual: 'Catatan Penjual C',
        status: 'Finished',
        roti: [
          { nama: 'Roti Coklat', jumlah: 7 },
          { nama: 'Roti Keju', jumlah: 10 },
        ],
      },
    ]

    setRiwayatKurir(dummyRiwayatKurir)
  }

  const handleRotiClick = (lapak, index) => {
    setDataRoti(lapak.roti)
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
                    title="Daftar Roti"
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
    </CCard>
  )
}

export default RiwayatKurir
