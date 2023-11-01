import React from 'react'
import { NavLink } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import sidebarShow from '../recoil/sidebarRecoil' // Import the Recoil atom

const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))

const AppHeader = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(sidebarShow) // Use useRecoilState to access the Recoil state

  return (
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
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <span className="bigger-text">{infoLogin.nama}</span>
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
  )
}

export default AppHeader
