import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navAdmin = [
  {
    component: CNavTitle,
    name: 'Kelola Data Akun',
  },
  {
    component: CNavItem,
    name: 'Koordinator',
    to: '/admin/koordinator',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kurir',
    to: '/admin/kurir',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Keuangan',
    to: '/admin/keuangan',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pemilik',
    to: '/admin/pemilik',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default navAdmin
