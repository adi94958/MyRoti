import React from 'react'
import {
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
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import {
  cilPen,
  cilSend,
  cilTrash,
  cilSearch,
  cilShortText,
  cilCalendar,
  cilClock,
  cilUserPlus,
  cilFile,
} from '@coreui/icons'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

const Pengiriman = () => {
  return (
    <CCard>
      <CCardHeader>Data Pengiriman</CCardHeader>
      <CCardBody>
        <CForm className="mb-3"></CForm>
        <CTable striped bordered responsive>
          <CTableHead>
            <CForm className="mb-3">
              <CRow>
                <CCol md={8} xs={6}>
                  <Link to="#">
                    <CButton variant="outline">
                      <CIcon icon={cilUserPlus} className="mx-8" />
                      Tambah Roti
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
            </CForm>
            <CTableRow>
              <CTableHeaderCell>ID Pengiriman</CTableHeaderCell>
              <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
              <CTableHeaderCell>Kurir</CTableHeaderCell>
              <CTableHeaderCell>Tanggal</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow key="#">
              <CTableDataCell>KRM321043</CTableDataCell>
              <CTableDataCell>Jaya toko</CTableDataCell>
              <CTableDataCell>adi</CTableDataCell>
              <CTableDataCell>19/07/2023</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" disabled>
                  OnProcess
                </CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Pengiriman
