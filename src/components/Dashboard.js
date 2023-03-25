import React from 'react'
import Header from './Header';
import { NavLink } from 'react-router-dom';
import {IoHome} from 'react-icons/io5'
import { Outlet } from 'react-router-dom';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import {Alert} from '../components'
import { GetDataToContext } from '../context/providerContext';

const Dashboard = () => {
  const {state, dispatch} = GetDataToContext();
  return (
    <div
        className='w-full h-auto flex flex-col items-center justify-center bg-primary'
    >
        <Header />
        <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
          <NavLink to="/dashboard/home">
            <IoHome className='text-2xl text-textColor'/>
          </NavLink>
          <NavLink to="/dashboard/user" className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Users
          </NavLink>
          <NavLink to="/dashboard/songs" className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Songs
          </NavLink>
          <NavLink to="/dashboard/artists" className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Artists
          </NavLink>
          <NavLink to="/dashboard/albums" className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Albums
          </NavLink>
        </div>

        <div className='my-4 w-full p-4'>
          <Outlet />

          {
            state.alertType && <Alert type={state.alertType}/>
          }
        </div>

    </div>
  )
}
export default Dashboard
