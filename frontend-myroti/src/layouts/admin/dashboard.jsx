import React, { useEffect, useState } from "react";
import CardList from "./components/cardList";
import axios from "axios";
import CekLogin from "../../auth/CekLogin";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 1) {
      navigate("/koor");
    }
    handleData();
  }, []);

  function handleData() {
    axios
      .get("http://localhost:8000/api/dashboard/admin")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Remove dashboardInside function

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-serif">Dashboard</h1>

      <CardList
        data={[
          {
            title: "Koordinator",
            description: data.koordinator,
          },
          {
            title: "Pemilik",
            description: "5 Akun",
          },
          {
            title: "Keuangan",
            description: "5 Akun",
          },
          {
            title: "Kurir",
            description: data.kurir,
          },
        ]}
      />
    </div>
  );
}
