import React, { useState } from 'react';
import backgroundImage from '../assets/bgroti.jpeg'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const backgroundColorStyle = {
    backgroundColor: 'burlywood',
  };
  
  return (
    <div className="flex h-screen">
      <div className="w-[80%] bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Isi gambar latar belakang */}
      </div>
      <div className="w-1/2 flex justify-center items-center" style={backgroundColorStyle}>
        <div className="bg-white shadow-md rounded px-12 py-12">
          <h1 className="text-center text-2xl font-bold mb-4">MyRoti</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
