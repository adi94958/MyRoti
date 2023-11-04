import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import navAdmin from 'src/navAdmin'

import sidebarContentAtom from 'src/recoil/sidebarContentRecoil'
import navKoordinator from 'src/navKoordinator'

const Dashboard = () => {
  const navigate = useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(sidebarContentAtom)

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    if (infoLogin === null) {
      navigate('/login')
    } else {
      if (infoLogin.user_type === 'admin') {
        setSidebar(navAdmin)
        navigate('/admin')
      } else if (infoLogin.user_type === 'koordinator') {
        setSidebar(navKoordinator)
        navigate('/koordinator')
      } else if (infoLogin.user_type === 'kurir') {
        setSidebar(navAdmin)
        navigate('/kurir')
      } else if (infoLogin.user_type === 'keuangan') {
        setSidebar(navAdmin)
      } else if (infoLogin.user_type === 'pemilik') {
        setSidebar(navAdmin)
      }
    }
  }, [])
}

export default Dashboard
