import React from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { useState } from "react";
import { storage } from "../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";
import { deleteAlbum, deleteArtist, deleteSong, getAllAlbums, getAllArtists, getAllSongs } from "./../api/index";
import { GetDataToContext } from "../context/providerContext";
import { setAlertType, setAllAlbums, setAllArtists, setAllSongs, setIsPlayingSong, setSongIndex } from "../context/reducer";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const { state, dispatch } = GetDataToContext();

  const appearMenu = () => {
    setIsDelete(true)
    dispatch(setIsPlayingSong(false))
  };

  const noDeleteObject = () => {
    setIsDelete(false);
    dispatch(setIsPlayingSong(false))
  };

  const deleteObjectEvent = ({ id, picture, songURL, type }) => {
    if (type === "artist") {
      const deleteRef = ref(storage, picture);
      deleteObject(deleteRef).then(() => {});
      deleteArtist(id).then((value) => {
        if (value.message === "Delete Successfully") {
          dispatch(setAlertType("delete"));
          setIsDelete(false)
          getAllArtists().then((data) => {
            dispatch(setAllArtists(data.artist));
            
          });
        } else dispatch(setAlertType("danger"));
      });
      setTimeout(() => {
        dispatch(setAlertType(null));
      }, 4000);
    }



    if (type === 'album') {
      const deleteRef = ref(storage, picture);
      deleteObject(deleteRef).then(() => {});
      deleteAlbum(id).then((value) => {
        if (value.message === "Delete Successfully") {
          dispatch(setAlertType("delete"));
          setIsDelete(false)
          getAllAlbums().then((data) => {
            dispatch(setAllAlbums(data.album));
            
          });
        } else dispatch(setAlertType("danger"));
      });
      setTimeout(() => {
        dispatch(setAlertType(null));
      }, 4000);
    }

    if (type === 'song') {
      const deleteRef = ref(storage, picture);
      deleteObject(deleteRef).then(() => {});
      const deleteRefUrlSong = ref(storage, songURL);
      deleteObject(deleteRefUrlSong).then(() => {});
      deleteSong(id).then((value) => {
        if (value.message === "Delete Successfully") {
          dispatch(setAlertType("delete"));
          setIsDelete(false)
          getAllSongs().then((data) => {
            dispatch(setAllSongs(data.song));
            
          });
        } else dispatch(setAlertType("danger"));
      });
      setTimeout(() => {
        dispatch(setAlertType(null));
      }, 4000);
    }
  };


  const handleMenuMusicPlayer = () => {
    dispatch(setIsPlayingSong(true))
    dispatch(setSongIndex(index))
  }

  return (
    <motion.div 
      className="relative w-40 min-w-210 px-2 cursor-pointer hover:bg-card py-4 bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.picture}
          className="w-full h-full rounded-lg object-cover"
          onClick={type === "song" ? handleMenuMusicPlayer : undefined}
        />
      </div>
      <p 
        className="text-base text-center text-headingColor font-semibold my-2"
        onClick={type === "song" ? handleMenuMusicPlayer : undefined}
        >
        {data.name.length > 16 ? `${data.name.slice(0, 16)}...` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data.artist && data.artist.length > 16
            ? `${data.artist.slice(0, 16)}...`
            : data.artist}
        </span>
        <span className="block text-sm text-gray-400 my-1">
          {data.album && data.album.length > 16
            ? `${data.album.slice(0, 16)}...`
            : data.album}
        </span>
        <span className="block text-sm text-gray-400 my-1">
          {data.twitter && data.twitter.length > 16
            ? `${data.twitter.slice(0, 16)}...`
            : data.twitter}
        </span>
        <span className="block text-sm text-gray-400 my-1">
          {data.instagram && data.instagram.length > 16
            ? `${data.instagram.slice(0, 16)}...`
            : data.instagram}
        </span>
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
        >
          <IoTrash onClick={appearMenu} />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center py-2"
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure do you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              onClick={() =>
                deleteObjectEvent({
                  id: data._id,
                  picture: data.picture,
                  songURL: data.songURL,
                  type: type,
                })
              }
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
              onClick={noDeleteObject}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
