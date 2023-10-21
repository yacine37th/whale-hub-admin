import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function HomeNavBar() {
  return (
    <div className="w-full   bg-primary-color bg-blue-900   mb-5">
      <div
        className="flex items-center text-white justify-between   px-36
        max-[768px]:px-8 z-50
        "
      >
        <div className="w-24 max-md:w-14">
          {/* <h1 className="bg-red text-3xl">Rahma</h1> */}
          <img src={logo} alt="" />
        </div>

        <div className="flex  text-xl max-md:text-base">
          <NavLink
            to="/"
            className={`p-5  `}
            //   ${({ isActive, isPending }) =>
            // isPending
            //   ? "pending"
            //   : isActive
            //   ? "active"
            //   : "bg-black text-red-900 font-bold"}
          >
            {({ isActive, isPending }) => (
              <p
                className={
                  isActive
                    ? "duration-700 border-b-2 transition ease-in-out text-gray-500"
                    : "duration-700 border-b-0 transition ease-in-out hover:border-b"
                }
              >
                Users
              </p>
            )}
            {/* <p>{t("home")}</p> */}
          </NavLink>
          {/* 
      <Link to={"/"} className="p-5" >
    
      </Link> */}
          <NavLink
            to="/acceptedUsers"
            className={` p-5`}
            //   ${({ isActive, isPending }) =>
            //     isPending
            //       ? "pending font-bold underline"
            //       : isActive
            //       ? "active   "
            //       : "bg-black "}
          >
            {({ isActive, isPending }) => (
              <p
                className={
                  isActive
                    ? "duration-700 border-b-2 transition ease-in-out text-gray-500"
                    : "duration-700 border-b-0 transition ease-in-out hover:border-b"
                }
              >
                Accepted Users
              </p>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HomeNavBar;
