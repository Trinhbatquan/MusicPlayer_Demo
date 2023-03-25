import React, { useEffect, useRef, useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import {
  setAlbumFilter,
  setAlertType,
  setAllAlbums,
  setAllArtists,
  setAllSongs,
  setArtistFilter,
  setFilterTerm,
  setLanguageFilter,
} from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportFunctions";
import { IoMusicalNote } from "react-icons/io5";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";
import { FilterButton } from "../components";
import { GetDataToContext } from "../context/providerContext";
// import { truncate } from "fs/promises";
// import { FILE } from "dns";

const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  );
};

const FileUpLoader = ({ updateState, setProgress, isLoading, isImage }) => {
  const { state, dispatch } = GetDataToContext();

  const upLoadFileAudio = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`
    );
    //tên file : Images/..../....jpg/
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    //upload file lên firebase

    //theo dõi quá trình upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log("upload" + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          updateState(downloadUrl);
          //downloadUrl = src file = đường dẫn url của firebase ==> chỉ những client connect với filebase với
          //truy cập đường link đó và lấy được dữ liệu (https://firebasestorage.googleapis.com/v0/b/music-player-410…6
          //_n.jpg?alt=media&token=39370dba-af36-4e48-a760-950fd9dc98d2)
          isLoading(false);
          dispatch(setAlertType("success"));
          setTimeout(() => {
            dispatch(setAlertType(null));
          }, 3000);
        });
      }
    );
  };

  //lấy src file ở html thường
  //URL.createObjectURL(e.target.files[0])

  return (
    <label>
      <div class="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <p className="text-2xl font-semibold">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>

      <input
        type="file"
        name="upload-file"
        id="upload-file"
        accept={`${isImage ? ".jpg, .png, *.jpg, *.jpeg, .jpeg, *.pjp" : ".mp3"}`}
        className="h-0 w-0"
        onChange={(e) => upLoadFileAudio(e)}
      />
    </label>
  );
};

const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUpdateProgress, setImageUpdateProgress] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUpdateProgress, setAudioUpdateProgress] = useState(0);
  const [isAudioUploading, setIsAudioUploading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUpLoading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUpLoading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const { state, dispatch } = GetDataToContext();

  useEffect(() => {
    getAllArtists().then((data) => {
      dispatch(setAllArtists(data.artist));
    });

    getAllAlbums().then((data) => {
      dispatch(setAllAlbums(data.album));
    });
  }, []);

  const deleteFileObject = (url, isImage, string) => {
    if (string === "song") {
      if (isImage) {
        setIsImageUploading(true);
      } else {
        setIsAudioUploading(true);
      }
      const deleteRef = ref(storage, url);
      deleteObject(deleteRef).then(() => {
        if (isImage) {
          setSongImageCover(null);
          setIsImageUploading(false);
          dispatch(setAlertType("delete"));
        } else {
          setAudioImageCover(null);
          setIsAudioUploading(false);
          dispatch(setAlertType("delete"));
        }
      });
    } else if (string === "artist") {
      setIsArtistUpLoading(true);
      const deleteRef = ref(storage, url);
      deleteObject(deleteRef).then(() => {
        setArtistImageCover(null);
        setIsArtistUpLoading(false);
        dispatch(setAlertType("delete"));
      });
    } else {
      setIsAlbumUpLoading(true);
      const deleteRef = ref(storage, url);
      deleteObject(deleteRef).then(() => {
        setAlbumImageCover(null);
        setIsAlbumUpLoading(false);
        dispatch(setAlertType("delete"));
      });
    }
    setTimeout(() => {
      dispatch(setAlertType(null));
    }, 3000);
  };

  const saveSong = () => {
    const newSong = {
      name: songName,
      picture: songImageCover,
      songURL: audioImageCover,
      album: state.albumFilter,
      artist: state.artistFilter,
      language: state.languageFilter,
      category: state.filterTerm,
    };
    console.log({newSong})
    if (!songImageCover || !audioImageCover) {
      dispatch(setAlertType("danger"));
    } else {
      setIsAudioUploading(true);
      setIsImageUploading(true);
      saveNewSong(newSong).then((res) => {
        getAllSongs().then((data) => {
          dispatch(setAllSongs(data.song));
        });
      });
      setTimeout(() => {
        setSongName("");
        setIsAudioUploading(false);
        setIsImageUploading(false);
        setSongImageCover(null);
        setAudioImageCover(null);
        dispatch(setFilterTerm(null));
        dispatch(setAlbumFilter(null));
        dispatch(setArtistFilter(null));
        dispatch(setLanguageFilter(null));
        dispatch(setAlertType("success"));
      }, 2000);
    }
    setTimeout(() => {
      dispatch(setAlertType(null));
    }, 4000);
  };
  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      dispatch(setAlertType("danger"));
    } else {
      setIsArtistUpLoading(true);
      const data = {
        name: artistName,
        picture: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram/${instagram}`,
      };
      saveNewArtist(data).then(() => {
        getAllArtists().then((value) => {
          dispatch(setAllArtists(value.artist));
        });
      });
      setTimeout(() => {
        setIsArtistUpLoading(false);
        setArtistImageCover(null);
        setArtistName("");
        setTwitter("");
        setInstagram("");
        dispatch(setAlertType("success"));
      }, 2000);
    }
    setTimeout(() => {
      dispatch(setAlertType(null));
    }, 4000);
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch(setAlertType("danger"));
    } else {
      setIsAlbumUpLoading(true);
      const data = {
        name: albumName,
        picture: albumImageCover,
      };
      saveNewAlbum(data).then(() => {
        getAllAlbums().then((value) => {
          dispatch(setAllAlbums(value.album));
        });
      });
      setTimeout(() => {
        setIsAlbumUpLoading(false);
        setAlbumImageCover(null);
        setAlbumName("");
        dispatch(setAlertType("success"));
      }, 2000);
    }
    setTimeout(() => {
      dispatch(setAlertType(null));
    }, 4000);
  };

  return (
    <div className="flex w-full flex-row items-start justify-between p-4 border border-gray-300 round-md mb-32">
      <div className="text-center flex-1 mr-4 p-4">
        <p className="text-xl font-serif text-headingColor">Add New Song</p>
        <i className="text-xs font-serif text-headingColor my-1">
          If you don't have artist and album of song, please add album and
          artist first
        </i>
        <input
          type="text"
          placeholder="Please enter your song name..."
          className="w-full p-3 rounded-md text-base font-semibold text-textColor 
        outline-sm border border-gray-300 bg-transparent"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />

        <div className="flex w-full justify-between flex-wrap items-center gap-4">
          <FilterButton filterData={state.allArtists} flag="Artists" type="artistFilter"/>
          <FilterButton filterData={state.allAlbums} flag="Albums" type="albumFilter"/>
          <FilterButton filterData={filterByLanguage} flag="Language" type="languageFilter"/>
          <FilterButton filterData={filters} flag="Category" type="filterTerm"/>
        </div>

        <div class="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isImageUploading && <FileLoader progress={imageUpdateProgress} />}
          {!isImageUploading && (
            <>
              {!songImageCover ? (
                <FileUpLoader
                  updateState={setSongImageCover}
                  setProgress={setImageUpdateProgress}
                  isLoading={setIsImageUploading}
                  isImage={true}
                />
              ) : (
                <div className="elative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={songImageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <button
                    className="absolute bottom-3 right-3 p-3
                              rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() =>
                      deleteFileObject(songImageCover, true, "song")
                    }
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div class="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isAudioUploading && <FileLoader progress={audioUpdateProgress} />}
          {!isAudioUploading && (
            <>
              {!audioImageCover ? (
                <FileUpLoader
                  updateState={setAudioImageCover}
                  setProgress={setAudioUpdateProgress}
                  isLoading={setIsAudioUploading}
                  isImage={false}
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md flex items-start">
                  <audio controls className="w-full h-full object-cover">
                    <source src={audioImageCover} />
                  </audio>

                  <button
                    className="absolute bottom-3 right-3 p-3
                              rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() =>
                      deleteFileObject(audioImageCover, false, "song")
                    }
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-24 p-4 mx-auto ">
          {isAudioUploading || isImageUploading ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveSong}
            >
              Send
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="ml-6 text-center mb-8">
          {/* artist save */}
          <p className="mt-4 text-xl font-serif text-headingColor">
            Add New Artist
          </p>
          <div class="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isArtistUploading && (
              <FileLoader progress={artistUploadingProgress} />
            )}
            {!isArtistUploading && (
              <>
                {!artistImageCover ? (
                  <FileUpLoader
                    updateState={setArtistImageCover}
                    setProgress={setArtistUploadingProgress}
                    isLoading={setIsArtistUpLoading}
                    isImage={true}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md flex items-start">
                    <img
                      src={artistImageCover}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3
                                rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() =>
                        deleteFileObject(artistImageCover, true, "artist")
                      }
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            type="text"
            placeholder="Please enter your artist name..."
            className="w-full mt-1 p-3 rounded-md text-base font-semibold text-textColor
          outline-sm border border-gray-300 bg-transparent"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <div className="flex items-center p-3  mt-2 rounded-md shadow-sm border border-gray-300 w-full ">
            <p className="text-base font-semibold text-gray-400">
              www.twitter.com/
            </p>
            <input
              type="text"
              placeholder="your twitter"
              className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
            />
          </div>
          <div className="flex items-center p-3  mt-2 rounded-md shadow-sm border border-gray-300 w-full ">
            <p className="text-base font-semibold text-gray-400">
              www.instagram.com/
            </p>
            <input
              type="text"
              placeholder="your instagram"
              className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
            />
          </div>
          <div className="mx-auto w-72 p-4">
            {isArtistUploading ? (
              <DisabledButton />
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                onClick={saveArtist}
              >
                Send New Artist
              </motion.button>
            )}
          </div>
      </div>

        <div className="text-center ml-6">
          {/* album saves */}
          <p className="text-xl font-serif text-headingColor">Add New Album</p>
          <div class="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
            {!isAlbumUploading && (
              <>
                {!albumImageCover ? (
                  <FileUpLoader
                    updateState={setAlbumImageCover}
                    setProgress={setAlbumUploadingProgress}
                    isLoading={setIsAlbumUpLoading}
                    isImage={true}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md flex items-start">
                    <img
                      src={albumImageCover}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3
                                rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() =>
                        deleteFileObject(albumImageCover, true, "album")
                      }
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            type="text"
            placeholder="Please enter your album name..."
            className="w-full p-3 mt-1 rounded-md text-base font-semibold text-textColor
          outline-sm border border-gray-300 bg-transparent"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
          {/* <div className="flex items-center p-3  mt-2 rounded-md shadow-sm border border-gray-300 w-full ">
            <p className="text-base font-semibold text-gray-400">www.twitter.com/</p>
            <input
              type="text" placeholder="your twitter" className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
              />
        </div>
        <div className="flex items-center p-3  mt-2 rounded-md shadow-sm border border-gray-300 w-full ">
            <p className="text-base font-semibold text-gray-400">www.instagram.com/</p>
            <input
              type="text" placeholder="your instagram" className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
              />
        </div> */}
          <div className="mx-auto w-72 p-4">
            {isAlbumUploading ? (
              <DisabledButton />
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                onClick={saveAlbum}
              >
                Send New Album
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewSong;
