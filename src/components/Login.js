import React from "react";

import {FcGoogle} from 'react-icons/fc'
import {GoogleAuthProvider,
        signInWithPopup,
        onAuthStateChanged, 
        getAuth
      } 
from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

import {app} from '../config/firebase.config'
import {LoginBg} from '../assets/video'


const Login = ({setCurrentAuth}) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignInGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((currentUser) => {
        console.log({currentUser})
        if (currentUser) {
          onAuthStateChanged(auth, async (user) => {
            console.log("change auth Login");
            if (user) {
              localStorage.setItem("currentAuth", "true")
              setCurrentAuth(true);
              navigate("/");
          }
        })
      }
    })
  }

  useEffect(() => {
    if (localStorage.getItem("currentAuth") === "true") {
      navigate("/");
    }
  }, [])


  return (
    <div className="relative w-screen h-screen">
      <video 
        src={LoginBg}
        loop
        autoPlay
        muted
        className="w-screen h-screen object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4"
      >
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center"
        >
          <div 
            onClick={handleSignInGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover: shadow-md duration-100 ease-in-out transition-all">
            <FcGoogle className="text-xl "/>
            Sign in with Google
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
