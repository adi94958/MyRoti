import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../../auth/CekLogin";

export default function RegisRoti() {
  const [kode_roti, setKodeRoti] = useState("");
  const [nama_roti, setNamaRoti] = useState("");
  const [stok_roti, setStokRoti] = useState("");
  const [rasa_roti, setRasaRoti] = useState("");
  const [harga_satuan_roti, setHargaSatuanRoti] = useState("");
  const [isValidate, setIsValidate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 2) {
        navigate("/admin");
    }
  }, []);

  useEffect(() => {
    if (kode_roti.length != null) {
      if (nama_roti.length != null) {
        if (stok_roti.length != null) {
            if (rasa_roti.length != null) {
                if (harga_satuan_roti.length != null) {
                    setIsValidate(false);
                } else {
                    setIsValidate(true);
                }
            } else {
                setIsValidate(true);
            }
        } else {
          setIsValidate(true);
        }
      } else {
        setIsValidate(true);
      }
    } else {
      setIsValidate(true);
    }
  }, [kode_roti, nama_roti, stok_roti, rasa_roti, harga_satuan_roti]);

  const handleRegister = () => {
    const data = {
      nama_roti: nama_roti,
      stok_roti: stok_roti,
      rasa_roti: rasa_roti,
      harga_satuan_roti: harga_satuan_roti,
    };

    axios
      .post("http://localhost:8000/api/koordinator/dataroti/registrasi", data)
      .then((response) => {
        console.log(response.data.message);
        navigate("/koordinator/data_roti");
        // Optionally, you can redirect the user or perform other actions here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleCancel() {
    navigate("/koordinator/data_roti");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="flex justify-center">
          <form className="w-80 max-w-screen-lg sm:w-96 p-6 bg-white  rounded-lg md:shadow-lg md:border">
            <Typography variant="h4" className="mb-4 text-center font-serif" color="blue-gray">
                Tambah Data Roti
            </Typography>
            <div className="mb-4 mt-4 flex flex-col gap-3">
              <Input
                color="blue"
                size="lg"
                label="Nama Roti"
                defaultValue={nama_roti}
                onChange={(e) => setNamaRoti(e.target.value)}
              />
              <Input
                color="blue"
                size="lg"
                label="Stok Roti"
                defaultValue={stok_roti}
                onChange={(e) => setStokRoti(e.target.value)}
              />
              <Input
                color="blue"
                size="lg"
                label="Rasa Roti"
                defaultValue={rasa_roti}
                onChange={(e) => setRasaRoti(e.target.value)}
              />
              <Input
                color="blue"
                size="lg"
                label="Harga Satuan Roti"
                defaultValue={harga_satuan_roti}
                onChange={(e) => setHargaSatuanRoti(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outlined"
                className="w-40 mt-2 hover:bg-red-700 hover:text-white"
                color="red"
                fullWidth
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button
                variant="outlined"
                className="w-40 mt-2 hover:bg-blue-700 hover:text-white"
                color="blue"
                fullWidth
                disabled={isValidate}
                onClick={handleRegister}
              >
                Daftar
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}