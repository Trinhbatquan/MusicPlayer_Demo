import React from "react";
import {BsFacebook, BsGithub} from 'react-icons/bs'
import {AiOutlineMail, AiFillLinkedin} from 'react-icons/ai'

import {Header} from '../components'

const Premium = () => {
  return (
    <div className="w-full h-auto flex flex-col 
    items-center justify-center bg-primary">
      <Header />
      <div className="flex w-full mt-8 p-8 items-center justify-start">
          <span className="text-lg font-semibold text-headingColor">NOTHING</span>
      </div>
    </div>
  );
};

export default Premium;