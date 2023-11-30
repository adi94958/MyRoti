import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  CForm,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { cilCart, cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';

const Pengiriman = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman
  const navigate = useNavigate();

  useEffect(() => {
    handleData();
  }, []);

  function handleData() {
    axios
      .get('http://localhost:8000/api/koordinator/transaksi')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleKirim(item) {
    localStorage.setItem(
      'dataTransaksi',
      JSON.stringify({
        kode_lapak: item.kode_lapak,
        nama_lapak: item.nama_lapak,
        nama_kurir: item.nama,
      })
    );
    navigate('/pengiriman/kelola/kirim');
  }

  const filteredData = data.filter((lapak) => {
    const searchableFields = ['nama_lapak', 'nama_kurir'];

    return (
      searchText === '' ||
      searchableFields.some((field) => {
        const fieldValue = lapak[field];

        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
              <CTableHeaderCell>No Telp Lapak</CTableHeaderCell>
              <CTableHeaderCell>Kurir</CTableHeaderCell>
              <CTableHeaderCell>No Telp Kurir</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.nama_lapak}</CTableDataCell>
                  <CTableDataCell>{item.no_telp}</CTableDataCell>
                  <CTableDataCell>{item.nama}</CTableDataCell>
                  <CTableDataCell>{item.no_telp_kurir}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      variant="outline"
                      className="ms-2"
                      title="Kirim"
                      onClick={() => handleKirim(item)}
                    >
                      <CIcon icon={cilCart} className="mx-12 me-2" />
                      Kirim
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
        <CPagination
          activePage={currentPage}
          pages={Math.ceil(filteredData.length / itemsPerPage)}
          onActivePageChange={setCurrentPage}
          align="center"
          doubleArrows={false} // Menghilangkan tombol "Garis ganda"
        >
          <CPaginationItem
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
          >
            Sebelumnya
          </CPaginationItem>

          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <CPaginationItem
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
              style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
            >
              {index + 1}
            </CPaginationItem>
          ))}

          <CPaginationItem
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
            style={{ cursor: 'pointer' }} // Tambahkan properti CSS ini
          >
            Berikutnya
          </CPaginationItem>
        </CPagination>
        <div className="text-muted mt-2">
          Total Data: {filteredData.length}
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Pengiriman;
