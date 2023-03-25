import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd , IoPause, IoPlay, IoTrash} from 'react-icons/io5'
import {AiOutlineClear} from "react-icons/ai"
import { useState } from 'react';
import { useEffect } from 'react';
import { GetDataToContext } from '../context/providerContext';
import { getAllSongs } from './../api/index';
import {setAllSongs, filterSongBySearch} from '../context/reducer'
import {SongCard} from '../components'

const DashboardSong = () => {

  const [songFilter, setSongFilter] = useState("")
  const [isFocus, setIsFocus]  = useState(false);
  const {state, dispatch} = GetDataToContext();

  useEffect(() => {
    getAllSongs().then((data) => {
      dispatch(setAllSongs(data.song))
    })
  }, [])


  const handleSearchSong = (e) => {
    setSongFilter(e.target.value)
    dispatch(filterSongBySearch(e.target.value))
  }

  const handleClearInput = () => {
    setSongFilter("")
    dispatch(filterSongBySearch(""))
  }

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        
        <NavLink to="/dashboard/newSong" className="flex items-center justify-center px-4 py-3
        border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>

        <input type="text" placeholder='Search here...' value={songFilter} 
              onChange={(e) => handleSearchSong(e)}
              className= {`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent
              outline-none duration-150 transition-all ease-out text-base text-textColor font-semibold`}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
        />

        <i>
            <AiOutlineClear className='text-2xl text-textColor cursor-pointer' onClick={handleClearInput}/>
        </i>

      </div>

      <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {' '}
            </span>
            {
              state.filterSongsBySearch ? state.filterSongsBySearch.length : state?.allSongs?.length
            }
          </p>
          <i className="text-xs text-textColor font-semibold">
            Let's click the song to play music
          </i>
        </div>

      <SongContainer 
        data={state.filterSongsBySearch ? state.filterSongsBySearch : state.allSongs}
      />

      </div>


    </div>
  )
}

export const SongContainer = ({data}) => {
  console.log({data})
  return (
    <div className="mt-20 w-full flex flex-wrap gap-3 items-center justify-evenly">
      {
        data && data.map((song, index) => {
          return <SongCard key={index} data={song} index={index} type="song"/>
        })
      }
    </div>
  )
}

export default DashboardSong