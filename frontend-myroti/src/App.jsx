import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./layouts/admin/layout"
import Dashboard from "./layouts/admin/dashboard";
import Koordinator from "./layouts/admin/koordinator";
import Pemilik from "./layouts/admin/pemilik";
import Kurir from "./layouts/admin/kurir";
import Keuangan from "./layouts/admin/keuangan";
import RegisKoor from "./layouts/admin/regis/regiskoor";
import RegisKeuangan from "./layouts/admin/regis/regiskeuangan";
import RegisKurir from "./layouts/admin/regis/regiskurir";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/koordinator" element={<Koordinator />} />
          <Route path="/admin/pemilik" element={<Pemilik />} />
          <Route path="/admin/kurir" element={<Kurir />} />
          <Route path="/admin/keuangan" element={<Keuangan />} />
          <Route path="/admin/koordinator/regis" element={<RegisKoor />} />
          <Route path="/admin/keuangan/regis" element={<RegisKeuangan />} />
          <Route path="/admin/kurir/regis" element={<RegisKurir />} />
        </Route>
      </Routes>
    </Router>
  );
}
