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
  cilMoney,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navKeuangan = [
  {
    component: CNavTitle,
    name: 'Kelola Keuangan',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/keuangan',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
]

export default navKeuangan
