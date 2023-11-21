import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil' // Import useRecoilState
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import sidebarShow from '../recoil/sidebarRecoil'

const AppHeader = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(sidebarShow)
  const [Login, setLogin] = useState([])
  const [open, setOpen] = useState(false)
  const [showPenghasilan, setShowPenghasilan] = useState(false)
  const navigate = useNavigate()

  const penghasilan = 50000

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setLogin(infoLogin)
    if (infoLogin === null) {
      navigate('/login')
    }

    if (infoLogin.user_type == 'kurir') {
      setShowPenghasilan(true)
    } else {
      setShowPenghasilan(false)
    }
  }, [])

  const handlePenghasilan = () => {
    setOpen(true)
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => setShowSidebar(!showSidebar)} // Update Recoil state
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink href="/">Home</CNavLink>
            </CNavItem>
            {showPenghasilan && (
              <CNavItem>
                <CNavLink onClick={handlePenghasilan} style={{ cursor: 'pointer' }}>
                  Penghasilan
                </CNavLink>
              </CNavItem>
            )}
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <span className="bigger-text">{Login.nama}</span>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      {open && (
        <CModal
          size="md"
          alignment="top"
          visible={open}
          onClose={() => setOpen(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Penghasilan Harian</CModalTitle>
          </CModalHeader>
          <CModalBody>Penghasilan Hari Ini: Rp. {penghasilan}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setOpen(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}

export default AppHeader
