import React from 'react'
import {BsEmojiWink} from 'react-icons/bs'
import {motion} from 'framer-motion'

const Alert = ({type}) => {
  return (
    <motion.div 
        initial={{translateX: 200, opacity: 0}}
        animate={{translateX: 0, opacity: 1}}
        exit={{translateX: 200, opacity: 0}}
        key={type}
        className= {`fixed top-12 right-12 p-4 rounded-md backdrop-blur-md  flex shadow-xl
        items-center justify-center ${type === "success" && "bg-green-500"} ${type === "danger" && "bg-red-500"} ${type === "delete" && "bg-blue-500"}`}
    >
      {
        type === 'success' && (
            <div className='flex items-center justify-center gap-4'>
                <BsEmojiWink className='text-3xl text-primary'/>
                <p className='text-xl font-semibold text-primary'>Done...Data Saved</p>
            </div>
        )
      }

      {
        type === 'danger' && (
            <div className='flex items-center justify-center gap-4'>
                <BsEmojiWink className='text-3xl text-primary'/>
                <p className='text-xl font-semibold text-primary'>Oh no...Please check again!</p>
            </div>
        )
      }

      {
        type === 'delete' && (
            <div className='flex items-center justify-center gap-4'>
                <BsEmojiWink className='text-3xl text-primary'/>
                <p className='text-xl font-semibold text-primary'>Done...Delete Successfully</p>
            </div>
        )
      }
    </motion.div>
  )
}

export default Alert
