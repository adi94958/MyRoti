import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import Layout from "./layouts/admin/layout"
import Dashboard from "./layouts/admin/dashboard";
import Koordinator from "./layouts/admin/koordinator";
import Pemilik from "./layouts/admin/pemilik";
import Kurir from "./layouts/admin/kurir";
import Keuangan from "./layouts/admin/keuangan";
import RegisKoor from "./layouts/admin/regis/regiskoor";
import RegisKeuangan from "./layouts/admin/regis/regiskeuangan";
import RegisKurir from "./layouts/admin/regis/regiskurir";
import EditKoor from "./layouts/admin/edit/editkoor";
import EditKurir from "./layouts/admin/edit/editkurir";
import Login from "./layouts/login/login"

export default function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/koordinator" element={<Koordinator />} />
            <Route path="/admin/pemilik" element={<Pemilik />} />
            <Route path="/admin/kurir" element={<Kurir />} />
            <Route path="/admin/keuangan" element={<Keuangan />} />
            <Route path="/admin/koordinator/regis" element={<RegisKoor />} />
            <Route path="/admin/keuangan/regis" element={<RegisKeuangan />} />
            <Route path="/admin/kurir/regis" element={<RegisKurir />} />
            <Route path="/admin/koordinator/edit" element={<EditKoor />} />
            <Route path="/admin/kurir/edit" element={<EditKurir />} />
          </Route>
      </Routes>
    </Router>
  );
}
