import React from "react";
import { HiOutlineViewGrid, HiOutlineCube } from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "Distribusi",
    label: "Distribusi",
    path: "/koordinator",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Lapak",
    label: "Data Lapak",
    path: "/koordinator/data_lapak",
    icon: <HiOutlineCube />,
  },
  {
    key: "roti",
    label: "Data Roti",
    path: "/koordinator/data_roti",
    icon: <HiOutlineCube />,
  },
];
