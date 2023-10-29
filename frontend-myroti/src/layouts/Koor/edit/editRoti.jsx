import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../../auth/CekLogin";

export default function EditRoti() {
  const [nama_roti, setNamaRoti] = useState("");
  const [stok_roti, setStokRoti] = useState("");
  const [rasa_roti, setRasaRoti] = useState("");
  const [harga_satuan_roti, setHargaSatuanRoti] = useState("");
  const [isValidate, setIsValidate] = useState(true);
  const navigate = useNavigate();

  const roti = JSON.parse(localStorage.getItem("dataRoti"));

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 2) {
      navigate("/admin");
    }
    setNamaRoti(roti.nama_roti);
    setStokRoti(roti.stok_roti);
    setRasaRoti(roti.rasa_roti);
    setHargaSatuanRoti(roti.harga_satuan_roti);
  }, []);

  useEffect(() => {
    if (nama_roti.length > 0 && nama_roti.length <= 50) {
        console.log(nama_roti)
      if (stok_roti != null) {
        console.log(stok_roti)
        if (rasa_roti.length > 0 && rasa_roti.length <= 25) {
          if (harga_satuan_roti != null) {
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
  }, [nama_roti, stok_roti, rasa_roti, harga_satuan_roti]);

  const handleEdit = () => {
    const data = {
      nama_roti: nama_roti,
      stok_roti: stok_roti,
      rasa_roti: rasa_roti,
      harga_satuan_roti: harga_satuan_roti,
    };

    axios
      .put(
        `http://localhost:8000/api/koordinator/dataroti/update/${roti.kode_roti}`,
        data
      )
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("dataRoti");
        navigate("/koordinator/data_roti");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleCancel() {
    localStorage.removeItem("dataRoti");
    navigate("/koordinator/data_roti");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="flex justify-center">
          <form className="w-80 max-w-screen-lg sm:w-96 p-6 bg-white  rounded-lg md:shadow-lg md:border">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              Edit Data Roti
            </Typography>
            <div className="mb-4 flex flex-col gap-3">
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
                className="w-40 mt-2"
                color="red"
                fullWidth
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button
                variant="outlined"
                className="w-40 mt-2"
                color="blue"
                fullWidth
                disabled={isValidate}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
