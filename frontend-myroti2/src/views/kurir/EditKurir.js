// EditKurir.js
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
  const [dataArea] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState({
    nama: 0,
    username: 0,
    password: 0,
  })
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    username: '',
    password: '',
    area: null,
  })

  useEffect(() => {
    const idFromLocalStorage = JSON.parse(localStorage.getItem('lsDataEditKurir')).id
    handleData(idFromLocalStorage)
  }, [])

  const handleData = (id) => {
    const dataKurir = JSON.parse(localStorage.getItem('lsDataKurir'))
    // Check if dataKurir is not null or undefined
    if (dataKurir) {
      setCount({
        nama: dataKurir.nama.length,
        username: dataKurir.username.length,
        password: dataKurir.password.length,
      })
      setFormData({
        id: dataKurir.id,
        nama: dataKurir.nama,
        username: dataKurir.username,
        password: dataKurir.password,
        area: dataKurir.area_distribusi,
      })
    }
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

  const handleAreaChange = (e) => {
    const inputValue = e.target.value
    setFormData({ ...formData, area: inputValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const updatedUser = {
      nama: formData.nama,
      username: formData.username,
      password: formData.password,
      area_distribusi: formData.area,
      user_type: 'kurir',
    }
    console.log(updatedUser)

    try {
      const response = await axios.put(
        `http://localhost:8000/api/kurir/update/${formData.id}`,
        updatedUser,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Data kurir telah berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kurir'
          console.log('Kurir data updated successfully:', response.data)
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
