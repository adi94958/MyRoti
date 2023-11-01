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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navKoordinator = [
  {
    component: CNavItem,
    name: 'Kelola Data',
    to: '/admin',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
]

export default navKoordinator
