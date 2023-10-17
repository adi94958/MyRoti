import React from "react";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconButton } from "@material-tailwind/react";

export default function Header({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("dataLogin"));
  return (
    <div>
      <div className="bg-brown-700 h-16 px-1 flex items-center border-b border-gray-200">
        <div className="flex items-center flex-1">
          <IconButton variant="text" onClick={toggleSidebar} className="mr-4">
            <GiHamburgerMenu fontSize="20px" className=" text-white" />
          </IconButton>
          <img className="h-8 rounded-lg" src={logo} alt="description" />
          <span className="flex flex-1 pl-1 font-serif text-3xl text-white">
            MyRoti
          </span>
        </div>
        <div className="flex justify-end items-center flex-1">
          <h1 className="text-2xl font-sherif text-white pr-8">Hi, {user.username}</h1>
        </div>
      </div>
    </div>
  );
}
