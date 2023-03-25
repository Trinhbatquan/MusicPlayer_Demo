import React from "react";
import {BsFacebook, BsGithub} from 'react-icons/bs'
import {AiOutlineMail, AiFillLinkedin} from 'react-icons/ai'

import {Header} from '../components'

const Contact = () => {
  return (
    <div className="w-full h-auto flex flex-col 
    items-center justify-center bg-primary">
      <Header />
      <div className="mt-8 bg-primary flex items-center justify-evenly w-full
      ">
        <div className="mx-4 p-4">
            <span className="text-textColor text-lg">
                Thank you for your use!
                Have a nice day!!!
            </span>
        </div>
        <div className=" mx-4 p-4 flex flex-col items-start- justify-center">
            <span className="text-textColor text-lg">
                If you have questions, please contact to me by:
            </span>
            <div className="mt-4 flex items-center justify-center">
                <a  className="p-1 ml-4"
                    href="https://www.facebook.com/profile.php?id=100017371533248" 
                    alt="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsFacebook className="text-blue-700 text-lg"/>
                </a>
                <a className="p-1 ml-4"
                    href="https://github.com/Trinhbatquan" 
                    alt="Git"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsGithub className="text-blue-700 text-lg"/>
                </a>
                <a className="p-1 ml-4"
                    href="mailto:trinhbatquan2001@gmail.com" 
                    alt="Mail"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiOutlineMail className="text-blue-700 text-lg"/>
                </a>
                <a className="p-1 ml-4"
                    href="https://www.linkedin.com/in/trinhbatquan/" 
                    alt="Linkedln"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillLinkedin className="text-blue-700 text-lg"/>
                </a>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;