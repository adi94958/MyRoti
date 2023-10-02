import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState } from "react";
  import { Link } from "react-router-dom";

  const options = [
    'Ayam',
    'Bebek',
    'Kudanil',
    'Pasteur',
  ];

  export default function RegisKurir() {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSelectOption = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Tambah Akun Koordinator
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Username" />
            <Input type="password" size="lg" label="Password" />
            <div>
                <button
                type="button"
                onClick={toggleDropdown}
                className="border rounded-lg p-2 w-48 focus:outline-none"
                >
                {selectedOption || 'Select an option'}
                </button>
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <input
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
          <Link to="/admin/kurir">
            <Button className="mt-6" fullWidth>
                Register
            </Button>
          </Link>
        </form>
      </Card>
    );
  }