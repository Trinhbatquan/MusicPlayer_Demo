import React, {useState} from "react";
import { NavLink } from "react-router-dom";

import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrow } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { GetDataToContext } from "../context/providerContext";
import {motion} from 'framer-motion'
// import "./style.css";

const Header = () => {
  const auth = getAuth(app);
  const { state } = GetDataToContext();
  const [isMenuAdmin, setIsMenuAdmin] = useState(false)
  
  console.log(state)

  const handleSignOutGoogle = async () => {
    await auth.signOut().then(() => {
      return;
    });
  };

  const handleMenuAdmin = () => {
    setIsMenuAdmin(!isMenuAdmin);
  }

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to="/">
        <img src={Logo} alt="logo project" className="w-12" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-sm">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            HOME
          </NavLink>
        </li>
        <li className="mx-5 text-sm">
          <NavLink
            to="/musics"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            MUSICS
          </NavLink>
        </li>
        <li className="mx-5 text-sm">
          <NavLink
            to="/premium"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            PREMIUM
          </NavLink>
        </li>
        <li className="mx-5 text-sm">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      <div 
        className="hoverItemCSS flex items-center ml-auto cursor-pointer gap-2 relative"
        onClick={handleMenuAdmin}
        >
        <img
          src={state ? state?.user?.user?.picture : ""}
          className="w-11 min-w-[44px] h-11 object-contain rounded-full shadow-md"
          alt="None"
        />
        <div className="flex flex-col">
          <p>{state ? state?.user?.user?.name : "UserName"}</p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member. <FaCrow className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
        <div className="absolute z-10 p-3 top-10 right-0 w-190 gap-4 opacity-0 shadow-md rounded-md backdrop-blur-sm "></div>
        {isMenuAdmin && (
          <motion.div 
            className="cssHover absolute z-10 p-3 top-12 right-0 w-190 gap-4 bg-card shadow-md rounded-md backdrop-blur-sm "
            initial={{opacity: 0, translateY: 50}}
            animate={{opacity: 1, translateY: 0}}
            exit={{opacity: 0, translateY: -50}}
            // transition={{duration: 300}}
          >
          <NavLink to="/userProfile">
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              Profile
            </p>
          </NavLink>
          <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
            My Favourite
          </p>
          <hr />
          {state?.user?.user?.role === "admin" && (
            <>
              <NavLink to="/dashboard/home">
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  DashBoard
                </p>
              </NavLink>
              <hr />
            </>
          )}
          <p
            className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
            onClick={handleSignOutGoogle}
          >
            Sign Out
          </p>
        </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
