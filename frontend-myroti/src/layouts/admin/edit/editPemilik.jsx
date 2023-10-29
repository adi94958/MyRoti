import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../../auth/CekLogin";

export default function EditPemilik() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidate, setIsValidate] = useState(true);
  const navigate = useNavigate();

  const pemilik = JSON.parse(localStorage.getItem("dataPemilik"));

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 1) {
      navigate("/koordinator");
    }
    setNama(pemilik.nama);
    setUsername(pemilik.username);
    setPassword(pemilik.password);
  }, []);

  useEffect(() => {
    if (username.length >= 4 && username.length <= 25) {
      if (password.length >= 4 && password.length <= 15) {
        if (nama.length >= 4 && nama.length <= 50) {
          setIsValidate(false);
        }else{
          setIsValidate(true);
        }
      }else{
        setIsValidate(true);
      }
    }else{
      setIsValidate(true);
    }
  }, [nama, username, password]);

  const handleEdit = () => {
    const data = {
      nama: nama,
      username: username,
      password: password,
      user_type: "pemilik",
    };

    axios
      .put(`http://localhost:8000/api/pemilik/update/${pemilik.id}`, data)
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("dataPemilik");
        navigate("/admin/pemilik");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleCancel() {
    localStorage.removeItem("dataPemilik");
    navigate("/admin/pemilik");
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
            Edit Akun Pemilik
          </Typography>
          <div className="mb-4 flex flex-col gap-3">
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
