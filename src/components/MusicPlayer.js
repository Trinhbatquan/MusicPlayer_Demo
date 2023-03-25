import React, {useState, useEffect} from "react"
import { GetDataToContext } from '../context/providerContext'
import {RiPlayList2Fill} from 'react-icons/ri'
import {motion} from 'framer-motion'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { IoMusicalNote, IoClose} from 'react-icons/io5';
import { setIsPlayingSong, setSongIndex } from "../context/reducer"







export const PlayListCard = () => {


  const {state, dispatch} = GetDataToContext();
  
  useEffect(() => {
    
  }, [])


  const handleCurrentSong = (index) => {
    if (state.songIndex !== index) {
      dispatch(setSongIndex(index))
    }
  }
  
  return (
    <div className='absolute left-4 bottom-32 gap-2 w-300 max-w-[375px] h-420 max-h-[h-420px] 
    flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary'>
      {
        state.allSongs.length > 0 && (
        state.allSongs.map((music, index) => {
          return (
            <motion.div
              key={index}
              initial={{opacity: 0, translateX: -50}}
              animate={{opacity: 1, translateX: 0}}
              transition={{duration: 0.3, delay: index * 0.1}}
              className="group w-full p-6 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
              onClick={() => handleCurrentSong(index)}
            >
              <IoMusicalNote className="text-textColor group-hover:text-red-500 text-xl cursor-pointer"/>
              <div className='flex items-center flex-col'>
                <p className='text-sm text-headingColor font-semibold'>
                  {
                    `${music?.name.length > 20 
                      ? music?.name.slice(0,20) : music?.name}...`
                  } {" "}
                  <span className='text-xs'>({music?.album})</span>
                </p>
                <p className='text-textColor text-xs'>
                  {
                    music?.artist
                  }
                  {" "}
                  <span className='text-xs text-textColor font-semibold'>
                    ({music?.category})
                  </span>
                </p>
              </div>
            </motion.div>
          )
        })
      )}
    </div>
  )
}




const MusicPlayer = () => {

  const {state, dispatch} = GetDataToContext();
  const [isPlayingCard, setIsPlayingCard] = useState(false);



  const song = state?.allSongs[state?.songIndex];



  const nextTrack = () => {
    if (state.songIndex === state.allSongs.length -1) {
      dispatch(setSongIndex(0))
    } else {
      dispatch(setSongIndex(state.songIndex + 1))
    } 
  }


  const previousTrack = () => {
    if (state.songIndex === 0) {
      dispatch(setSongIndex(state.allSongs.length - 1))
    } else {
      dispatch(setSongIndex(state.songIndex + 1))
    }
  }

  const isMenuPlayingCard = () => {
    setIsPlayingCard(!isPlayingCard)
  }

  const closeMusicPlay = () => {
    dispatch(setIsPlayingSong(false))
  }

  const handleEndSong = (index) => {
    if (index === state.allSongs.length - 1) {
      dispatch(setSongIndex(0))
    } else {
      dispatch(setSongIndex(index + 1))

    }
  }

  return (
    <div className='w-full flex items-center gap-3'>
      <div className='flex items-center w-full gap-3 p-4 relative'>
        <img 
          src={song?.picture} 
          alt="None"
          className='w-40 h-20 object-cover bg-top rounded-md'
        />



        <div className='flex items-start flex-col '>


          <p className='text-xl text-headingColor font-semibold flex items-center'>
            {
              `${song?.name.length > 24 ? `${song?.name.slice(0,24)}...` : song?.name}`
            }
            <span className='text-base'>{`(${song?.album})`}</span>
          </p>
          <p className='text-textColor flex items-center'>
            {
              `${song?.artist}`
            }
            <span className='text-sm text-textColor font-semibold'>{`(${song?.category})`}</span>
          </p>

          <motion.i
            whileTap={{scale: 0.8}}
          >
            <RiPlayList2Fill className='text-textColor hover:text-headingColor text-lg' onClick={isMenuPlayingCard}/>
          </motion.i>

        </div>

        <div className='flex-1'>
          <AudioPlayer 
            src={song?.songURL}
            onPlay={() => console.log('playing')}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={() => handleEndSong(state.songIndex)}
          />
        </div>


        {isPlayingCard ? (
          <PlayListCard />
        ) : ""}

        <motion.div
          whileTap={{scale: 0.75}}
        >
          <IoClose className=" text-textColor cursor-pointer" onClick={closeMusicPlay}/>
        </motion.div>

      </div>
    </div>
  )
}





export default MusicPlayer
