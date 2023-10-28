import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../../auth/CekLogin";

export default function RegisLapak() {
  const [namaLapak, setNamaLapak] = useState("");
  const [alamatLapak, setAlamatLapak] = useState("");

  const [area, setArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [isOpenKurir, setIsOpenKurir] = useState(false);
  const [searchTermKurir, setSearchTermKurir] = useState("");

  const [isKurir, setIsKurir] = useState(false);
  const [isArea, setIsArea] = useState(false);
  const [areaPilihan, setAreaPilihan] = useState("");
  const [kurirPilihan, setKurirPilihan] = useState("");
  const [Options, setOptions] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null); // New state for selected courier
  const [courierOptions, setCourierOptions] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 2) {
      navigate("/admin");
    }
    handleDataArea();
    handleDataCouriers();
  }, []);

  useEffect(() => {
    if (namaLapak.length >= 0 && namaLapak.length <= 25) {
      if (alamatLapak.length >= 0 && alamatLapak.length <= 15) {
        if (isKurir === true) {
          if (isArea === true) {
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
  }, [namaLapak, alamatLapak, isKurir, isArea]);

  function handleDataCouriers() {
    axios
      .get("http://localhost:8000/api/kurir") // Replace with the actual API endpoint for couriers
      .then((response) => {
        setCourierOptions(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleDataArea() {
    axios
      .get("http://localhost:8000/api/area")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleRegister = () => {
    const data = {
      nama_lapak: namaLapak,
      alamat_lapak: alamatLapak,
      area_id: area,
      id_kurir: selectedCourier,
    };

    axios
      .post("http://localhost:8000/api/koordinator/lapak/registrasi", data)
      .then((response) => {
        console.log(response.data.message);
        navigate("/koordinator/data_lapak");
        setIsValidate(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownKurir = () => {
    setIsOpenKurir(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchChangeKurir = (e) => {
    setSearchTermKurir(e.target.value);
  };

  const handleSelectOption = (option) => {
    console.log(option.id);
    setArea(option.id);
    setAreaPilihan(option.area_distribusi);
    setIsOpen(false);
    setIsArea(true);
  };

  const handleSelectCourier = (courier) => {
    setSelectedCourier(courier.id);
    setKurirPilihan(courier.nama);
    setIsOpenKurir(false);
    setIsKurir(true);
  };

  function handleCancel() {
    navigate("/koordinator/data_lapak");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="flex justify-center">
          <form className="w-80 max-w-screen-lg sm:w-96 p-6 bg-white  rounded-lg md:shadow-lg md:border">
            <Typography
              variant="h4"
              className="mb-4 text-center font-serif"
              color="blue-gray"
            >
              Registrasi Lapak
            </Typography>
            <div className="mb-4 mt-4 flex flex-col gap-3">
              <Input
                color="blue"
                size="lg"
                label="Nama Lapak"
                defaultValue={namaLapak}
                onChange={(e) => setNamaLapak(e.target.value)}
              />
              <Input
                color="blue"
                size="lg"
                label="Alamat Lapak"
                defaultValue={alamatLapak}
                onChange={(e) => setAlamatLapak(e.target.value)}
              />
              <div className="relative">
                <div className="flex flex-auto">
                  <Button
                    type="button"
                    onClick={toggleDropdownKurir}
                    className="border rounded-lg p-2 w-96 h-12 focus:outline-none"
                  >
                    {kurirPilihan||"-- Pilih Kurir --"}
                  </Button>
                </div>
                {isOpenKurir && (
                  <div className="absolute flex flex-col w-full mt-2 left-0 bg-white border rounded-lg shadow-lg z-10">
                    <Input
                      type="text"
                      label="Search"
                      className="border-b p-2 w-full"
                      value={searchTermKurir}
                      onChange={handleSearchChangeKurir}
                    />
                    <ul className="max-h-36 overflow-auto">
                      {courierOptions
        
                        .map((kurir, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectCourier(kurir)}
                            className="cursor-pointer p-2 hover:bg-gray-100"
                          >
                            {kurir.nama}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="flex flex-auto">
                  <Button
                    type="button"
                    onClick={toggleDropdown}
                    className="border rounded-lg p-2 w-96 h-12 focus:outline-none"
                  >
                    {areaPilihan || "-- Pilih Area --"}
                  </Button>
                </div>
                {isOpen && (
                  <div className="absolute flex flex-col w-full mt-2 left-0 bg-white border rounded-lg shadow-lg z-10">
                    <Input
                      type="text"
                      label="Search"
                      className="border-b p-2 w-full"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <ul className="max-h-36 overflow-auto">
                      {Options.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectOption(option)}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                        >
                          {option.area_distribusi}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outlined"
                  className="w-40 mt-2  hover:bg-red-700 hover:text-white"
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
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
