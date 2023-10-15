import React, { useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });

      if (response.data.response === 200) {
        setMessage(response.data.message);  
        setUserType(response.data.user.user_type);
        console.log(response);

        // Berdasarkan userType, Anda dapat menentukan tindakan setelah login
        if (userType === "admin") {
          // Tindakan untuk admin
          console.log("Admin logged in");
          navigate("/admin")

        } else if (userType === "kurir") {
          // Tindakan untuk kurir
          console.log("Kurir logged in");
        } else if (userType === "koordinator") {
          // Tindakan untuk koordinator
          console.log("Koordinator logged in");
        }
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        color="transparent"
        shadow={false}
        className="border border-solid border-gray-300 px-8 py-14 h-200"
      >
        <Typography variant="h3" color="blue-gray" className="text-center">
          Login
        </Typography>
        <form className="mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;