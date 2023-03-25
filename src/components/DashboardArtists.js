import React from 'react'
import {GetDataToContext} from '../context/providerContext'
import { useEffect } from 'react';
import { getAllArtists } from '../api/index';
import { setAllArtists } from '../context/reducer';
import {SongCard} from '../components'

const DashboardArtists = () => {

// if feel like , toucb me, baby no body no body until you

  const {state, dispatch} = GetDataToContext();
  console.log(state);

  useEffect(() => {
    getAllArtists().then((data) => {
      dispatch(setAllArtists(data.artist))
    })
  }, [])

  return (
    <>
       <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {' '}
            </span>
            {
              state?.allArtists?.length
            }
          </p>
        </div>

      <SongContainer 
        data={state?.allArtists}
        />

      </div>
    </>
  )
}

export const SongContainer = ({data, type}) => {
  console.log({data})
  return (
    <div className="mt-10 w-full flex flex-wrap gap-3 items-center justify-evenly">
      {
        data && data.map((song, index) => {
          return <SongCard key={index} data={song} index={index} type="artist"/>
        })
      }
    </div>
  )
}

export default DashboardArtists