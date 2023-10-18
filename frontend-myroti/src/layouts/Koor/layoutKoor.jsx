import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import CekLogin from "../../auth/CekLogin";

export default function Layout() {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const cekLogin = CekLogin();
    console.log(cekLogin)
    if (cekLogin !== 2) {
      navigate("/admin");
    }
  }, []);
  const toggleSidebar = () => {
    setOpen(!isOpen); // Toggle the isOpen state
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header toggleSidebar={toggleSidebar} />{" "}
      {/* Pass the toggleSidebar function to the Header component */}
      <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
        {isOpen && <Sidebar />}
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
