import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../auth/CekLogin";
import login from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin === 1) {
      navigate("/admin");
    } else if (cekLogin === 2) {
      navigate("/koordinator");
    } else {
      // Handle other cases if needed
    }
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000); // Hide alert after 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });
      if (response.data.response === 200) {
        const newUserType = response.data.user.user_type;
        localStorage.setItem(
          "dataLogin",
          JSON.stringify({
            username: username,
            password: password,
            user_type: newUserType,
          })
        );
        if (newUserType === "admin") {
          navigate("/admin");
        } else if (newUserType === "kurir") {
          navigate("/kurir");
        } else if (newUserType === "koordinator") {
          navigate("/koordinator");
        }
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  return (
    <Card className="m-20 rounded-lg">
      <div className="flex">
        <div className="flex flex-2 w-6/12 h-full">
          <img src={login} alt="Big" className="w-full h-full bg-red-200 border-gray-500 rounded-lg" />
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="h-full w-5/12">
            <img src={logo} alt="Big" className="h-44 object-cover m-auto mt-10" />
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mt-10 font-serif"
            >
              Login!
            </Typography>
            <form className="mt-7">
              <div className="mb-4 flex flex-col gap-6 relative">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <Button className="mt-6 bg-red-100 hover:bg-red-200 rounded-full" fullWidth onClick={handleLogin}>
                Login
              </Button>
            </form>
            {open && (
              <Alert
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "300px",
                  zIndex: 9999,
                }}
                icon={<Icon />}
                className="rounded-none border-l-4 border-[#eb4034] bg-[#eb4034]/10 font-medium text-[#eb4034]"
              >
                Username or password is incorrect.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;
