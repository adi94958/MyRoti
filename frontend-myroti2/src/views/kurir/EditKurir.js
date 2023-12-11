import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const EditKurir = () => {
  const [message, setMessage] = useState('')
  const [dataArea, setDataArea] = useState([])
  const [dataKurir, setDataKurir] = useState([])
  const [count, setCount] = useState({
    nama: 0,
    username: 0,
    password: 0,
    no_telp: 0,
  })
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    username: '',
    password: '',
    no_telp: '',
    area_id: '',
    area_distribusi: null,
  })

  useEffect(() => {
    const Kurir = JSON.parse(localStorage.getItem('lsDataEditKurir'))

    console.log(Kurir.id_kurir)
    handleData(Kurir.id_kurir)
  }, [])

  const handleData = (id) => {
    axios
      .get('http://localhost:8000/api/kurir/edit/' + id)
      .then((response) => {
        console.log(response.data)
        setDataKurir(response.data)
        const kurirData = response.data
        setCount({
          nama: kurirData.nama.length,
          username: kurirData.username.length,
          password: kurirData.password.length,
          no_telp: kurirData.no_telp ? kurirData.no_telp.length : 0,
        })
        setFormData({
          id: kurirData.id_kurir,
          nama: kurirData.nama,
          username: kurirData.username,
          password: kurirData.password,
          no_telp: kurirData.no_telp,
          area_id: kurirData.area_id,
          area_distribusi: kurirData.area__distribusi.area_distribusi,
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const handleNamaChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 50) {
      setFormData({ ...formData, nama: inputValue })
      setCount({ ...count, nama: inputValue.length })
    } else {
      setFormData({ ...formData, nama: inputValue.slice(0, 50) })
    }
  }

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 25) {
      setFormData({ ...formData, username: inputValue })
      setCount({ ...count, username: inputValue.length })
    } else {
      setFormData({ ...formData, username: inputValue.slice(0, 25) })
    }
  }

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 25) {
      setFormData({ ...formData, password: inputValue })
      setCount({ ...count, password: inputValue.length })
    } else {
      setFormData({ ...formData, password: inputValue.slice(0, 25) })
    }
  }

  const handleTelpChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 25) {
      setFormData({ ...formData, no_telp: inputValue })
      setCount({ ...count, no_telp: inputValue.length })
    } else {
      setFormData({ ...formData, no_telp: inputValue.slice(0, 25) })
    }
  }

  const handleAreaChange = (e) => {
    const inputValue = e.target.value
    setFormData({ ...formData, area: inputValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newUser = {
      nama: formData.nama,
      username: formData.username,
      password: formData.password,
      no_telp: formData.no_telp,
      area_id: formData.area_id,
      user_type: 'kurir',
    }
    console.log(newUser)
    console.log(formData)

    try {
      const response = await axios.put(
        `http://localhost:8000/api/kurir/update/${formData.id}`,
        newUser,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Data kurir telah berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kurir/pengiriman'
          console.log('User created successfully:', response.data)
        }
      })
    } catch (error) {
      console.log('Full error response:', error.response)
      if (error.response && error.response.data && error.response.data.message) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage)
      }
      setLoading(false)
    }
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Edit Akun Kurir</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Nama"
                    placeholder="Nama"
                    floatingLabel="Nama"
                    value={formData.nama}
                    disabled
                    required
                    onChange={handleNamaChange}
                  />
                  <CInputGroupText size="sm">{count.nama}/50</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Username"
                    placeholder="Username"
                    floatingLabel="Username"
                    value={formData.username}
                    disabled
                    required
                    onChange={handleUsernameChange}
                  />
                  <CInputGroupText size="sm">{count.username}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Password"
                    placeholder="Password"
                    floatingLabel="Password"
                    value={formData.password}
                    required
                    onChange={handlePasswordChange}
                  />
                  <CInputGroupText size="sm">{count.password}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="No Telp"
                    placeholder="No Telp"
                    floatingLabel="No Telp"
                    value={formData.no_telp}
                    required
                    onChange={handleTelpChange}
                  />
                  <CInputGroupText size="sm">{count.no_telp}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Area"
                    placeholder="Area"
                    floatingLabel="Area"
                    value={formData.area_distribusi}
                    required
                    disabled
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={1}>
                <Link to={`/kurir`}>
                  <CButton color="danger" variant="outline" className="ms-2" title="Back">
                    Back
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={1}>
                {loading ? (
                  <CButton color="primary" variant="outline" type="submit" disabled>
                    <CSpinner color="info" size="sm" />
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" type="submit">
                    Update
                  </CButton>
                )}
              </CCol>
            </CRow>
            <CRow className="mt-2">
              {message && <p className="error-message alert alert-danger">{message}</p>}
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default EditKurir
