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
import Transaksi from "./layouts/Koor/transaksi/item";
import Roti from "./layouts/Koor/roti";
import EditRoti from "./layouts/Koor/edit/editRoti";
import RegisRoti from "./layouts/Koor/regis/regisRoti";
import RegisKeuangan from "./layouts/admin/regis/regisKeuangan";
import EditKeuangan from "./layouts/admin/edit/editKeuangan";
import RegisPemilik from "./layouts/admin/regis/regisPemilik";
import EditPemilik from "./layouts/admin/edit/editPemilik";
import Lapak from "./layouts/Koor/lapak";
import RegisLapak from "./layouts/Koor/regis/regisLapak";
import EditLapak from "./layouts/Koor/edit/editLapak";

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
            <Route path="/admin/keuangan/regis" element={< RegisKeuangan/>} />
            <Route path="/admin/keuangan/edit" element={<EditKeuangan />} />
            <Route path="/admin/pemilik/regis" element={< RegisPemilik/>} />
            <Route path="/admin/pemilik/edit" element={<EditPemilik />} />
          <Route path="/koordinator" element={<LayoutKoor />}>
            <Route index element ={<Distribusi />} />
            <Route path="/koordinator/data_roti" element={<Roti />} />
            <Route path="/koordinator/data_lapak" element={<Lapak />} />
          </Route>
            <Route path="/koordinator/transaksi" element={<Transaksi />}/>
            <Route path="/koordinator/data_roti/edit" element={<EditRoti />} />
            <Route path="/koordinator/data_roti/regis" element={<RegisRoti />} />
            <Route path="/koordinator/data_lapak/regis" element={<RegisLapak />} />
            <Route path="/koordinator/data_lapak/edit" element={<EditLapak />} />
      </Routes>
    </Router>
  );
}
