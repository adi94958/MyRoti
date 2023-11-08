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
    function handleModalRoti() {
        console.log(modalRoti)
        setModalRoti(true)
    }

    function handleModalRotiBasi() {
        console.log(modalRoti)
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


    return (
        <>
            <CCard>
                <CCardHeader>Daftar Pengiriman</CCardHeader>
                <CCardBody>
                    <CForm className="mb-3"></CForm>
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
