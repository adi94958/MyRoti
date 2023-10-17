import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../auth/CekLogin";
import login from "../../assets/loginn.png";
import logo from "../../assets//logo.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin === 1) {
      navigate("/admin");
    } else if (cekLogin === 2) {
      navigate("/koor");
    }else{
      
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });
      if (response.data.response === 200) {
        const newUserType = response.data.user.user_type;
        setMessage(response.data.message);
        localStorage.setItem(
          "dataLogin",
          JSON.stringify({
            username: username,
            password: password,
            user_type: response.data.user.user_type,
          })
        );
        if (response.data.user.user_type === "admin") {
          navigate("/admin");
        } else if (response.data.user.user_type === "kurir") {
          navigate("/kurir");
        } else if (response.data.user.user_type === "koordinator") {
          navigate("/koordinator");
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
    <div className="flex h-screen bg-red-200">
      <div className="flex-2 lg:hidden">
        <img src={login} alt="Big" className=" w-full h-full" />
      </div>

      <div className="flex flex-1 justify-end items-center">
        <div className="h-full w-90 sm:w-3/4 bg-white">
          <Card
            color="transparent"
            shadow={false}
            className="border border-solid border-gray-300 px-8 py-5 h-200"
          >
            <img src={logo} alt="Big" className="h-44 object-cover m-auto " />
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mt-20"
            >
              Login
            </Typography>
            <form className="mt-7">
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
            {message && (
              <Typography
                variant="body"
                color="red"
                className="text-center mt-4"
              >
                {message}
              </Typography>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
