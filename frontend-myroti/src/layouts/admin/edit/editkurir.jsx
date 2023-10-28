import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../../auth/CekLogin";

const options = ["kadal", "Ayam", "Bebek", "Kudanil", "Pasteur"];

export default function EditKurir() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [area, setArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isArea, setIsArea] = useState(false);
  const [areaPilihan, setAreaPilihan] = useState("");
  const [Options, setOptions] = useState([]);

  const navigate = useNavigate();

  const kurir = JSON.parse(localStorage.getItem("dataKurir"));


  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 1) {
      navigate("/koordinator");
    }
    setNama(kurir.nama);
    setUsername(kurir.username);
    setPassword(kurir.password);
    setArea(kurir.area);
    handleData();
  }, []);

  useEffect(() => {
    if (username.length >= 4 && username.length <= 25) {
      if (password.length >= 4 && password.length <= 15) {
        if (nama.length >= 4 && nama.length <= 50) {
          if (isArea === true) {
            setIsValidate(false);
          }
        }
      }
    }
  }, [nama, username, password, isArea]);
  function handleData() {
    axios
      .get("http://localhost:8000/api/area")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleEdit = () => {
    // Create a data object to send to the API
    const data = {
      nama: nama,
      username: username,
      password: password,
      area_id: area,
      user_type: "kurir",
    }; 

    console.log(data);
    // Make a POST request to your Laravel API endpoint
    axios
      .put(`http://localhost:8000/api/kurir/update/${kurir.id}`, data)
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("dataKurir");
        navigate("/admin/kurir");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectOption = (option) => {
    console.log(option.id)
    setArea(option.id);
    setAreaPilihan(option.area_distribusi)
    setIsOpen(false);
    setIsArea(true);
  };

  function handleCancel() {
    localStorage.removeItem("dataKurir");
    navigate("/admin/kurir");
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
              Regis Akun Kurir
            </Typography>
            <div className="mb-4 flex flex-col gap-2">
              <Input
                color="blue"
                size="lg"
                label="Name"
                defaultValue={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <p className="pl-1 text-sm text-blue-gray-300">
                Nama Minimal 4 Karakter Maksimal 50 Karakter
              </p>
              <Input
                color="blue"
                size="lg"
                label="Username"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="pl-1 text-sm text-blue-gray-300">
                Username Minimal 4 Karakter Maksimal 25 Karakter
              </p>
              <Input
                color="blue"
                type="password"
                size="lg"
                label="Password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="pl-1 text-sm text-blue-gray-300">
                Password Minimal 4 Karakter Maksimal 15 Karakter
              </p>
              <div className="relative">
                <div className="flex flex-auto">
                  <Button
                    type="button"
                    onClick={toggleDropdown}
                    className="border rounded-lg p-2 w-96 focus:outline-none"
                  >
                    {areaPilihan || "Pilih Area"}
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
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
