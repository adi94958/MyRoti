import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
  
   
export default function RegisKoor() {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = () => {
      // Create a data object to send to the API
      const data = {
        nama: nama,
        username: username,
        password: password,
        user_type: 'koordinator', // Assuming user_type is 'koordinator'
      };
      
      // Make a POST request to your Laravel API endpoint
      axios.post('http://localhost:8000/api/koordinator/registrasi', data)
        .then((response) => {
          console.log(response.data.message);
          navigate("/admin/koordinator")
          // Optionally, you can redirect the user or perform other actions here
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    function handleCancel(){
      navigate("/admin/koordinator");
    }

    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Tambah Akun Koordinator
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
          <Input color="blue" size="lg" label="Name" value={nama} onChange={(e) => setNama(e.target.value)} />
          <Input color="blue" size="lg" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input color="blue" type="password" size="lg" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='flex justify-between'>
            <Button variant="outlined" className="w-40 mt-2" color='red'fullWidth onClick={handleCancel}>
                Batal
            </Button>
            <Button variant="outlined" className="w-40 mt-2" color='blue' fullWidth  onClick={handleRegister}>
                Regis
            </Button>
          </div>
        </form>
      </Card>
    );
}