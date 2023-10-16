import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
  
   
export default function EditKoor() {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const koor = JSON.parse(localStorage.getItem('dataKoor'));

    useEffect(() => {
        
        setNama(koor.nama);
        setUsername(koor.username);
        setPassword(koor.password);
        
    }, []);

    const handleEdit = () => {
      // Create a data object to send to the API
      const data = {
        nama: nama,
        username: username,
        password: password,
        user_type: "koordinator" // Assuming user_type is 'koordinator'
      };

      // Make a POST request to your Laravel API endpoint
      axios.put(`http://localhost:8000/api/koordinator/update/${koor.id}`, data)
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem('dataKoor');
          navigate("/admin/koordinator")
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    function handleCancel(){
        localStorage.removeItem('dataKoor');
        navigate("/admin/koordinator");
    }

    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Akun Koordinator
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
          <Input color="blue" size="lg" label="Name" defaultValue={koor.nama} onChange={(e) => setNama(e.target.value)} />
          <Input color="blue" size="lg" label="Username" defaultValue={koor.username} onChange={(e) => setUsername(e.target.value)}/>
          <Input color="blue" type="password" size="lg" label="Password" defaultValue={koor.password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className='flex justify-between'>
            <Button variant="outlined" className="w-40 mt-2" color='red'fullWidth onClick={handleCancel}>
                Batal
            </Button>
            <Button variant="outlined" className="w-40 mt-2" color='blue' fullWidth onClick={handleEdit}>
                Edit
            </Button>
          </div>
        </form>
      </Card>
    );
}