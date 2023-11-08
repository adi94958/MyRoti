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
    to: '/pengiriman',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
]

export default navKurir
