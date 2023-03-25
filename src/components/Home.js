import React from "react";
import { FaUser } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { GetDataToContext } from "../context/providerContext";
import { useEffect } from "react";
import { getAllUsers, getAllSongs, getAllArtists, getAllAlbums } from "../api";
import {
  setAllUsers,
  setAllAlbums,
  setAllArtists,
  setAllSongs,
} from "../context/reducer";
import { bgColors } from "./../utils/styles";
import { Header } from "../components";

export const DashboardCard = ({ icon, name, count }) => {
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <div
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400"
      style={{ backgroundColor: bgColor }}
    >
      {icon}
      <p className="text-md text-textColor font-semibold">{name}</p>
      <p className="text-md text-textColor">{count}</p>
    </div>
  );
};

const Home = () => {
  const { state, dispatch } = GetDataToContext();
  console.log(state);

  useEffect(() => {
    getAllUsers().then((data) => {
      dispatch(setAllUsers(data.users));
    });
    getAllSongs().then((data) => {
      dispatch(setAllSongs(data.song));
    });
    getAllArtists().then((data) => {
      dispatch(setAllArtists(data.artist));
    });
    getAllAlbums().then((data) => {
      dispatch(setAllAlbums(data.album));
    });
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="flex flex-col w-full mt-8">
        <div className="ml-8 flex flex-col items-start justify-center">
          <i className="text-xs text-textColor font-semibold">
            If you want to add, update, delete music, artist, album. Please click to
            UserName/Dashboard
          </i>
          <i className="text-xs text-textColor font-semibold">
            Or contact with admin to grant permission!
          </i>
        </div>
        <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
          <DashboardCard
            name="Users"
            count={state?.allUsers.length > 0 ? state.allUsers.length : 0}
            icon={<FaUser className="text-2xl text-textColor" />}
          />
          <DashboardCard
            name="Songs"
            icon={<GiLoveSong className="text-2xl text-textColor" />}
            count={state?.allSongs.length > 0 ? state.allSongs.length : 0}
          />
          <DashboardCard
            name="Artists"
            icon={<RiUserStarFill className="text-2xl text-textColor" />}
            count={state?.allArtists.length > 0 ? state.allArtists.length : 0}
          />
          <DashboardCard
            name="Albums"
            icon={<GiMusicalNotes className="text-2xl text-textColor" />}
            count={state?.allAlbums.length > 0 ? state.allAlbums.length : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
