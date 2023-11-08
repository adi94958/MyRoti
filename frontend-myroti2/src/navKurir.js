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
    component: CNavItem,
    name: 'Pengiriman',
    to: '/kurir',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pengiriman Kurir',
        to: '/kurir',
      },
      {
        component: CNavItem,
        name: 'Daftar Pengiriman',
        to: 'kurir/daftar-pengiriman',
      },
    ],
  },
]

export default navKurir
