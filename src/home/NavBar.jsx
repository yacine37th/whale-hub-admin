import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar min-[767px]:hidden  ">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} color="#ffff" />
          </Link>
        </div>
        <div className={`${sidebar ? "nav-menu active" : "nav-menu"} z-50`}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {/* {SidebarData.map((item, index) => {
              return ( */}
            <li
              className="text-white flex p-4"
              // key={index} className={item.cName}
            >
              <Link
                 to={"/"}
                className="text-white flex justify-center items-center px-8 py-5 w-full "
              >
                <AiIcons.AiFillHome />
                <span className="mr-5 ml-5">{t("home")}</span>
              </Link>
            </li>

            <li
              className="text-white flex p-4"
              // key={index} className={item.cName}
            >
              <Link
                 to={"/category"}

                //  to={item.path}
                className="text-white flex justify-center items-center px-8 py-5 w-full"
              >
                <AiIcons.AiFillCarryOut />
                <span className="mr-5 ml-5 ">{t("categorie")}</span>
              </Link>
            </li>

            <li
              className="text-white flex p-4"
              // key={index} className={item.cName}
            >
              <Link
                //  to={item.path}
                to={"/bag"}

                className="text-white flex justify-center items-center px-8 py-5 w-full"
              >
                <AiIcons.AiFillCarryOut />
                <span className="mr-5 ml-5">{t("bag")}</span>
              </Link>
            </li>
            {/* <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li> */}
            {/* ); */}
            {/* })} */}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
