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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormGroup,
  CLabel,
  CFormTextarea,
<<<<<<< Updated upstream
=======
  CInputGroup,
  CRow,
  CCol,
  CPagination,
  CPaginationItem,
  CFormLabel,
  CFormSelect,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
} from '@coreui/react'
import { cilPen, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'




const DaftarPengiriman = () => {
  const [data, setData] = useState([
    {
      id: 1,
      namaLapak: "Lapak 1",
      alamatLapak: "Jl. Lapak 1, Kota A",
      jenisRoti: [
        { jenis: "Roti Tawar", jumlah: 50, harga: 5000 }, // Harga per roti adalah 5000
        { jenis: "Roti Manis", jumlah: 30, harga: 7000 }  // Harga per roti adalah 7000
      ],
      totalHargaRoti: '',
      status: "Delivered"
    },
    {
      id: 2,
      namaLapak: "Lapak 2",
      alamatLapak: "Jl. Lapak 2, Kota B",
      jenisRoti: [
        { jenis: "Roti Gandum", jumlah: 20, harga: 6000 },   // Harga per roti adalah 6000
        { jenis: "Roti Keju", jumlah: 15, harga: 8000 },      // Harga per roti adalah 8000
        { jenis: "Roti Coklat", jumlah: 25, harga: 7500 }     // Harga per roti adalah 7500
      ],
      totalHargaRoti: '',
      status: "Delivered"
    },
    {
      id: 3,
      namaLapak: "Lapak 3",
      alamatLapak: "Jl. Lapak 3, Kota C",
      jenisRoti: [
        { jenis: "Roti Lapis", jumlah: 28, harga: 5500 },     // Harga per roti adalah 5500
        { jenis: "Roti Pisang", jumlah: 42, harga: 6500 }     // Harga per roti adalah 6500
      ],
      status: "Delivered"
    }
  ]);
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [modalRotiBasi, setModalRotiBasi] = useState(false)
  const [loading, setLoading] = useState(false)
<<<<<<< Updated upstream
  function handleModalRoti() {
    console.log(modalRoti)
=======
  const [dataRotiDipilih, setDataRotiDipilih] = useState([])
  const [searchText, setSearchText] = useState('')
  const [formData, setFormData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataTransaksi, setDataTransaksi] = useState([])
  const [catatanNtotalHarga, setCatatanNtotalHarga] = useState([])
  const itemsPerPageOptions = [10, 25, 50, dataTransaksi.length]; // Jumlah data per halaman

  const [idKurir, setKurirId] = useState('')
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      // Get infoLogin from localStorage
      const infoLogin = JSON.parse(localStorage.getItem('dataLogin'));

      setKurirId(infoLogin.id);

      const response = await axios.get('http://localhost:8000/api/kurir/transaksi');

      setDataTransaksi(response.data);

      const initCatatanNtotalHarga = response.data.map((transaksi) => ({
        id_transaksi: transaksi.id_transaksi,
        catatan_penjual: "",
        total_dengan_rotibasi: 0,
      }))
      setCatatanNtotalHarga(initCatatanNtotalHarga)

      response.data.map((transaksi) => {
        const initRoti = transaksi.transaksi_roti.map((roti) => ({
          id_transaksi: roti.id_transaksi,
          kode_roti: roti.roti.kode_roti,
          harga_satuan_roti: roti.roti.harga_satuan_roti,
          jumlah_roti: 0,
          jumlah_roti_dikirim: roti.jumlah_roti,
        }))
        setFormData(initRoti)
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function handleModalRoti(lapak) {
>>>>>>> Stashed changes
    setModalRoti(true)
<<<<<<< Updated upstream
  }

<<<<<<< Updated upstream
  function handleModalRotiBasi() {
    console.log(modalRoti)
=======
=======
    setDataRotiDipilih(lapak.transaksi_roti)
  }

>>>>>>> Stashed changes
  function handleModalRotiBasi(lapak) {
>>>>>>> Stashed changes
    setModalRotiBasi(true)
  }

  const [dataDenganTotalHarga, setDataDenganTotalHarga] = useState([]);
  useEffect(() => {
    const newDataDenganTotalHarga = data.map(item => {
      const totalHargaRoti = item.jenisRoti.reduce((total, roti) => {
        return total + roti.jumlah * roti.harga;
      }, 0);
      return {
        ...item,
        totalHargaRoti: totalHargaRoti
      };
    });

    setDataDenganTotalHarga(newDataDenganTotalHarga);
  }, [data]);

<<<<<<< Updated upstream
=======
  const [inputDataRotiBasi, setInputDataRotiBasi] = useState([])
  const handleJumlahRotiBasi = (roti, event) => {
    setRoti(roti)
    const inputValue = event.target.value
    const jumlahRoti = inputValue !== '' ? parseInt(inputValue, 10) : 0

    setInputDataRotiBasi((prevData) => {
      const newData = prevData.map((existingRoti) => {
        if (existingRoti.kode_roti === roti.kode_roti) {
          return {
            ...existingRoti,
            jumlah_roti: jumlahRoti,
          }
        }
        return existingRoti
      })
      if (!newData.some((existingRoti) => existingRoti.kode_roti === roti.kode_roti)) {
        newData.push({
          kode_roti: roti.kode_roti,
          harga_satuan_roti: roti.roti.harga_satuan_roti,
          id_transaksi: roti.id_transaksi,
          jumlah_roti: jumlahRoti,
          stok_roti: roti.jumlah_roti,
        })
      }
      return newData
    })
  }

  const handleCloseRotiBasi = () => {
    setModalRotiBasi(false)
  }

  const simpanRotiBasi = (roti) => {
    const isValid = inputDataRotiBasi.every((item) => {
      return item.stok_roti >= item.jumlah_roti
    })

    if (isValid) {
      const totalHargaRotiBasi = inputDataRotiBasi.reduce((total, roti) => {
        const hargaRoti = roti.jumlah_roti * roti.harga_satuan_roti
        return total + hargaRoti
      }, 0)

      setCatatanNtotalHarga((prevData) => {
        const newData = prevData.map((existingRoti) => {
          if (existingRoti.id_transaksi === roti.id_transaksi) {
            return {
              ...existingRoti,
              total_dengan_rotibasi: totalHargaRotiBasi,
            }
          }
          return existingRoti
        })
        return newData
      })
      setModalRotiBasi(false)
      navigate('/kurir/daftar-pengiriman')
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'Maaf! anda melebihi stok roti yang tersedia',
      })
    }
  }

  const handleSubmit = async (item) => {
    const kodeRotiArray = formData.map((roti) => {
      if (roti.id_transaksi === item.id_transaksi) {
        return roti.kode_roti
      }
    })
    const jumlahRotiArray = formData.map((roti) => {
      if (roti.id_transaksi === item.id_transaksi) {
        return roti.jumlah_roti
      }
    })

    const dataTrans = catatanNtotalHarga.find((transaksi) => transaksi.id_transaksi === item.id_transaksi);
    const catatan = dataTrans.catatan_penjual === "" ? "-" : dataTrans.catatan_penjual;
    const informasiPenjualan = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
      catatan_penjual: catatan,
      total_harga: item.totalHargaRoti,
      total_dengan_rotibasi: dataTrans.total_dengan_rotibasi,
      uang_setoran: item.totalHargaRoti - dataTrans.total_dengan_rotibasi,
    }
    try {
      await axios.post(
        `http://localhost:8000/api/kurir/penjualan/${item.id_transaksi}`,
        informasiPenjualan,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Berhasil di submit.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kurir/daftar-pengiriman'
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  const handleInputCatatanChange = (event, data) => {
    setCatatanNtotalHarga((prevData) => {
      const newData = prevData.map((existingData) => {
        if (existingData.id_transaksi === data.id_transaksi) {
          return {
            ...existingData,
            catatan_penjual: event.target.value,
          }
        }
        return existingData
      })
      return newData
    })
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === dataTransaksi.length ? dataTransaksi.length : startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
>>>>>>> Stashed changes

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1);
    setItemsPerPage(value);
  };

  const startRange = startIndex + 1;
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length);

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1);
    setItemsPerPage(value);
  };

  const startRange = startIndex + 1;
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <>
      <CCard>
        <CCardHeader>Daftar Pengiriman</CCardHeader>
        <CCardBody>
<<<<<<< Updated upstream
          <CForm className="mb-3"></CForm>
=======
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
              <CCol md={2} xs={3}>
                <CFormLabel>Rows Per Page:</CFormLabel>
              </CCol>
              <CCol md={2} xs={3}>
                <CFormSelect
                  className="form-select"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === dataTransaksi.length ? 'All' : option}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
>>>>>>> Stashed changes
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>No.</CTableHeaderCell>
                <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
                <CTableHeaderCell>Daftar Roti</CTableHeaderCell>
                <CTableHeaderCell>Total Harga</CTableHeaderCell>
                <CTableHeaderCell>Roti Basi</CTableHeaderCell>
                <CTableHeaderCell>Catatan</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
<<<<<<< Updated upstream
              {dataDenganTotalHarga.map((item, index) => {
                const isLast = index === dataDenganTotalHarga.length - 1

                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.namaLapak}</CTableDataCell>
                    <CTableDataCell>{item.alamatLapak}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        variant="outline"
                        className="ms-2"
                        title="Daftar Roti"
                        onClick={() => handleModalRoti()}
                      >
                        <CIcon icon={cilSearch} className="mx-12 me-2" />
                        Open Detail
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>{item.totalHargaRoti}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        variant="outline"
                        className="ms-2"
                        title="Daftar Roti Basi"
                        onClick={() => handleModalRotiBasi()}
                      >
                        <CIcon icon={cilPen} className="mx-12 me-2" />
                        Input Roti Basi
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormTextarea
                        id="catatan"
                        name="catatan"
                        // value={catatan}
                        // onChange={handleCatatanChange}
                        placeholder="Masukkan catatan Anda di sini..."
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        className="ms-2"
                        title="status"
                        disabled
                        onClick={'#'}
                      >
                        {item.status}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        variant="outline"
                        className="ms-2"
                        title="submit"
                        onClick={'#'}
                      >
                        Submit
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
=======
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                paginatedData.map((lapak, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.alamat_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.tanggal_pengiriman}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti"
                          onClick={() => handleModalRoti(lapak)}
                        >
                          <CIcon icon={cilSearch} className="mx-12 me-2" />
                          Open Detail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{lapak.totalHargaRoti}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti Basi"
                          onClick={() => handleModalRotiBasi(lapak)}
                        >
                          <CIcon icon={cilPen} className="mx-12 me-2" />
                          Input Roti Basi
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormTextarea
                          id="catatan"
                          name="catatan"
                          value={catatanNtotalHarga.catatan_penjual}
                          onChange={(e) => handleInputCatatanChange(e, lapak)}
                          placeholder="Masukkan catatan Anda di sini..."
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ color: 'orange' }}>{lapak.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="submit"
                          onClick={() => handleSubmit(lapak)}
                        >
                          Submit
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              )}
            </CTableBody>
          </CTable>
          <CRow className='mt-2 mb-2'>
            <CCol md={4} xs={8}>
              Total Rows: {filteredData.length} Page: {startRange} of {endRange}
            </CCol>
          </CRow>
          <CPagination
            activepage={currentPage}
            pages={Math.ceil(filteredData.length / itemsPerPage)}
            onActivePageChange={setCurrentPage}
            align="center"
            doublearrows="false"
          >
            <CPaginationItem
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ cursor: 'pointer' }}
            >
              Prev
            </CPaginationItem>

            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => {
              const pageIndex = index + 1;
              const totalPages = Math.ceil(filteredData.length / itemsPerPage);

              // Display three consecutive pages centered around the current page
              if (
                (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1) ||
                (totalPages <= 3 || (currentPage === 1 && pageIndex <= 3) || (currentPage === totalPages && pageIndex >= totalPages - 2))
              ) {
                return (
                  <CPaginationItem
                    key={pageIndex}
                    active={pageIndex === currentPage}
                    onClick={() => setCurrentPage(pageIndex)}
                    style={{ cursor: 'pointer' }}
                  >
                    {pageIndex}
                  </CPaginationItem>
                );
              }

              // Display ellipses for pages before the current page
              if (pageIndex === 1 && currentPage > 2) {
                return (
                  <CPaginationItem
                    key={pageIndex}
                    disabled
                    style={{ cursor: 'default' }}
                  >
                    ...
                  </CPaginationItem>
                );
              }

              // Display ellipses for pages after the current page
              if (pageIndex === totalPages && currentPage < totalPages - 1) {
                return (
                  <CPaginationItem
                    key={pageIndex}
                    disabled
                    style={{ cursor: 'default' }}
                  >
                    ...
                  </CPaginationItem>
                );
              }

              return null;
            })}
            <CPaginationItem
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              style={{ cursor: 'pointer' }}
            >
              Next
            </CPaginationItem>
          </CPagination>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        </CCardBody>
      </CCard>
      <CModal
        backdrop="static"
        visible={modalRoti}
        className="modal"
        onClose={() => {
          setModalRoti(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map((item) =>
                  item.jenisRoti.map((jenisRotiItem, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{jenisRotiItem.jenis}</CTableDataCell>
                      <CTableDataCell>{jenisRotiItem.jumlah}</CTableDataCell>
                    </CTableRow>
                  ))
                )
              )}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalRoti(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal roti basi */}
      <CModal
        backdrop="static"
        visible={modalRotiBasi}
        className="modal"
        onClose={() => {
          setModalRotiBasi(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Dikirim</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map((item) =>
                  item.jenisRoti.map((jenisRotiItem, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{jenisRotiItem.jenis}</CTableDataCell>
                      <CTableDataCell>{jenisRotiItem.jumlah}</CTableDataCell>
                      <CTableDataCell>
                        <CForm>
                          <CFormInput
                            size="sm"
                            name="jumlah_roti"
                            defaultValue={0}
                            //value={
                            //     inputDataRotiArray[index] ? inputDataRotiArray[index].jumlah_roti : ''
                            // }
                            //onChange={(e) => handleJumlahRoti(item, e, index)}
                            required
                          ></CFormInput>
                        </CForm>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )
              )}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalRotiBasi(false)
            }}
          >
            Close
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick='#'>
              Selesai
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DaftarPengiriman
