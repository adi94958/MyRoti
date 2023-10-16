import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const options = [
    'Ayam',
    'Bebek',
    'Kudanil',
    'Pasteur',
  ];

export default function RegisKurir() {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [area, setArea] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleRegister = () => {
      // Create a data object to send to the API
      const data = {
        nama: nama,
        username: username,
        password: password,
        area: area,
        user_type: 'kurir', // Assuming user_type is 'koordinator'
      };
  
      // Make a POST request to your Laravel API endpoint
      axios.post('http://localhost:8000/api/kurir/registrasi', data)
        .then((response) => {
          console.log(response.data.message);
          navigate("/admin/kurir")
          // Optionally, you can redirect the user or perform other actions here
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSelectOption = (option) => {
      setArea(option);
      setIsOpen(false);
    };
  
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleCancel(){
      navigate("/admin/kurir");
    }

    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Tambah Akun Kurir
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" color="blue" label="Name" value={nama} onChange={(e) => setNama(e.target.value)}/>
            <Input size="lg" color="blue" label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input type="password" color="blue" ize="lg" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div>
                <Button
                type="button"
                onClick={toggleDropdown}
                className="border rounded-lg p-2 w-96 focus:outline-none"
                >
                {area || 'Select an option'}
                </Button>
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-96 bg-white border rounded-lg shadow-lg">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="border-b p-2 w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <ul>
                    {filteredOptions.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelectOption(option)}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                    >
                        {option}
                    </li>
                    ))}
                </ul>
                </div>
            )}            
          </div>
          <div className='flex justify-between'>
            <Button variant="outlined" className="w-40 mt-2" color='red'fullWidth onClick= {handleCancel}>
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