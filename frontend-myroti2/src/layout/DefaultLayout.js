import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import sidebarContentAtom from '../recoil/sidebarContentRecoil'
import { useRecoilState } from 'recoil'
import navAdmin from '../navAdmin'
import navKoordinator from './../navKoordinator'
import navKurir from './../navKurir'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(sidebarContentAtom)

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    if (infoLogin === null) {
      navigate('/login')
    } else {
      if (infoLogin.user_type === 'admin') {
        setSidebar(navAdmin)
      } else if (infoLogin.user_type === 'koordinator') {
        setSidebar(navKoordinator)
      } else if (infoLogin.user_type === 'kurir') {
        setSidebar(navKurir)
      } else if (infoLogin.user_type === 'keuangan') {
        setSidebar(navAdmin)
      } else if (infoLogin.user_type === 'pemilik') {
        setSidebar(navAdmin)
      }
    }
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
