import React from "react";
import { HiOutlineViewGrid, HiOutlineCube } from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "koordinator",
    label: "Koordinator",
    path: "/admin/koordinator",
    icon: <HiOutlineCube />,
  },
  {
    key: "pemilik",
    label: "Pemilik",
    path: "/admin/Pemilik",
    icon: <HiOutlineCube />,
  },
  {
    key: "kurir",
    label: "Kurir",
    path: "/admin/Kurir",
    icon: <HiOutlineCube />,
  },
  {
    key: "keuangan",
    label: "Keuangan",
    path: "/admin/Keuangan",
    icon: <HiOutlineCube />,
  },
];
