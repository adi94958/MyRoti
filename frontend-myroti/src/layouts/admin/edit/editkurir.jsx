import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const options = [
    'Ayam',
    'Bebek',
    'Kudanil',
    'Pasteur',
  ]; 
   
export default function EditKurir() {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [area, setArea] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
  
    const kurir = JSON.parse(localStorage.getItem('dataKurir'));

    useEffect(() => {
        
        setNama(kurir.nama);
        setUsername(kurir.username);
        setPassword(kurir.password);
        setArea(kurir.area);
        
    }, []);

    const handleEdit = () => {
      // Create a data object to send to the API
      const data = {
        nama: nama,
        username: username,
        password: password,
        area: area,
        user_type: "kurir" 
      };

      console.log(data)
      // Make a POST request to your Laravel API endpoint
      axios.put(`http://localhost:8000/api/kurir/update/${kurir.id}`, data)
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem('dataKurir');
          navigate("/admin/kurir")
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
        localStorage.removeItem('dataKurir');
        navigate("/admin/kurir");
    }

    return (
      <Card color="transparent" shadow={false}>
        <div className='flex justify-center'>
          <form className="mt-20 mb-2 w-80 max-w-screen-lg sm:w-96">
            <Typography variant="h4" className='mb-4' color="blue-gray">
              Edit Akun Kurir
            </Typography>
            <div className="mb-4 flex flex-col gap-6">
            <Input color="blue" size="lg" label="Name" defaultValue={kurir.nama} onChange={(e) => setNama(e.target.value)} />
            <Input color="blue" size="lg" label="Username" defaultValue={kurir.username} onChange={(e) => setUsername(e.target.value)}/>
            <Input color="blue" type="password" size="lg" label="Password" defaultValue={kurir.password} onChange={(e) => setPassword(e.target.value)} />
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
              <Button variant="outlined" className="w-40 mt-2" color='red'fullWidth onClick={handleCancel}>
                  Batal
              </Button>
              <Button variant="outlined" className="w-40 mt-2" color='blue' fullWidth onClick={handleEdit}>
                  Edit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    );
}