import React from 'react'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import MyRotiLogo from 'src/assets/images/MyRotiLogoBaru.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import sidebarShow from '../recoil/sidebarRecoil'
import { useRecoilState, useRecoilValue } from 'recoil'
import sidebarContentSelector from 'src/recoil/sidebarContentSelector'

const AppSidebar = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(sidebarShow)
  const navigation = useRecoilValue(sidebarContentSelector)

  return (
    <CSidebar
      position="fixed"
      visible={showSidebar}
      onVisibleChange={(visible) => {
        setShowSidebar(visible)
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img
          src={MyRotiLogo}
          className="c-sidebar-brand-full"
          height={50} // adjust the height as needed
          alt="MyRoti Logo"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
