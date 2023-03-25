import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";
import {
  Login,
  Home,
  Dashboard,
  DashboardHome,
  DashboardUsers,
  DashboardSong,
  DashboardAlbums,
  DashboardArtists,
  DashboardNewSong,
  MusicPlayer,
  Music,
  Premium,
  Contact,
} from "./components";
import { app } from "./config/firebase.config";
import { validateUser } from "./api/index";
import { setUser } from "./context/reducer";
import { GetDataToContext } from "./context/providerContext";

const HomeApp = React.lazy(() => import("./components/Home"));

function App() {
  const [currentAuth, setCurrentAuth] = useState(
    false || localStorage.getItem("currentAuth") === "true"
  );
  console.log({ currentAuth });
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { state, dispatch } = GetDataToContext();
  console.log(dispatch);
  console.log(state.isPlayingSong, state.songIndex);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("change auth App");
      if (user) {
        await user.getIdToken().then(async (token) => {
          console.log("token" + "\n" + token);
          validateUser(token).then((data) => {
            console.log({ data });
            dispatch(setUser(data));
          });
        });
      } else {
        setCurrentAuth(false);
        localStorage.setItem("currentAuth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence onExitComplete>
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        {/* <button onClick={handleSignOutGoogle}>Sign Out</button> */}
        {console.log("re-render app")}
        <Routes>
          <Route
            path="login"
            element={<Login setCurrentAuth={setCurrentAuth} />}
          />
          <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><HomeApp /></Suspense>} />
          <Route path="/musics" element={<Music />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="dashboard" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="user" element={<DashboardUsers />} />
            <Route path="songs" element={<DashboardSong />} />
            <Route path="albums" element={<DashboardAlbums />} />
            <Route path="artists" element={<DashboardArtists />} />
            <Route path="newSong" element={<DashboardNewSong />} />
          </Route>
        </Routes>

        {state.isPlayingSong && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 
            bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center
            justify-center"
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
