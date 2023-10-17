import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import LayoutAdmin from "./layouts/admin/layoutAdmin"
import Dashboard from "./layouts/admin/dashboard";
import Koordinator from "./layouts/admin/koordinator";
import Pemilik from "./layouts/admin/pemilik";
import Kurir from "./layouts/admin/kurir";
import Keuangan from "./layouts/admin/keuangan";
import RegisKoor from "./layouts/admin/regis/regiskoor";
import RegisKurir from "./layouts/admin/regis/regiskurir";
import EditKoor from "./layouts/admin/edit/editkoor";
import EditKurir from "./layouts/admin/edit/editkurir";
import Login from "./layouts/login/login"
import LayoutKoor from "./layouts/Koor/layoutKoor"
import Distribusi from "./layouts/Koor/distribusi";

export default function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/koordinator" element={<Koordinator />} />
            <Route path="/admin/pemilik" element={<Pemilik />} />
            <Route path="/admin/kurir" element={<Kurir />} />
            <Route path="/admin/keuangan" element={<Keuangan />} />
          </Route>
            <Route path="/admin/koordinator/regis" element={<RegisKoor />} />
            <Route path="/admin/kurir/regis" element={<RegisKurir />} />
            <Route path="/admin/koordinator/edit" element={<EditKoor />} />
            <Route path="/admin/kurir/edit" element={<EditKurir />} />
          <Route path="/koordinator" element={<LayoutKoor />}>
            <Route index element ={<Distribusi />} />
          </Route>
      </Routes>
    </Router>
  );
}
