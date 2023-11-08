import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBurger,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEnvelopeLetter,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navKurir = [
  {
    component: CNavTitle,
    name: 'Kelola Distribusi',
  },
  {
    component: CNavGroup,
    name: 'Pengiriman',
    to: '/kurir',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pengiriman',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Daftar Pengiriman',
        to: 'kurir/daftar-pengiriman',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Roti',
  //   to: '/roti',
  //   icon: <CIcon icon={cilBurger} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Lapak',
  //   to: '/lapak',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
]

export default navKurir
