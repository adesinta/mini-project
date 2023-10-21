import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logoImg from "../assets/logo.svg";
import dashboardIcon from "../assets/dashboard-icon.svg";
import productsIcon from "../assets/add-products-icon.svg";
import logoutIcon from "../assets/logout.svg"

const Sidebar = () => {
  const navigate = useNavigate();
  const dataSidebar = [
    {
      id: 1,
      icon_url: dashboardIcon,
      name: "Dashboard",
      navigate_url: "/dashboard-admin",
    },
    {
      id: 2,
      icon_url: productsIcon,
      name: "Products",
      navigate_url: "/products-table",
    },
  ];

  return (
    <div className="bg-[#111215] text-white px-8 py-10 w-[380px] h-screen flex flex-col justify-between sticky top-0 shadow-md">
      <div className="flex flex-col gap-4
      ">
        <div className="flex gap-x-2">
            <img src={logoImg} alt="" />
          <h1 className="text-3xl flex items-center font-bold text-center">
            Fresh<span>Market</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {dataSidebar.map(({ icon_url, name, navigate_url }) => (
            <NavLink to={navigate_url} className="outline-none">
              {({ isActive, isPending }) => (
                <div
                  className={`${
                    isActive
                      ? "bg-gradient-to-r from-[#347C00] to-[#347c006c]"
                      : ""
                  } flex gap-5 p-5 rounded-[10px] hover:bg-[#347C00]`}
                >
                  <img src={icon_url} alt="" />
                  <p className="font-medium">{name}</p>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <button
      onClick={() => navigate("/sign-in")}
      className="flex gap-3 p-5 rounded-[10px] hover:bg-[#347c00]">
        <img src={logoutIcon} alt="" />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
