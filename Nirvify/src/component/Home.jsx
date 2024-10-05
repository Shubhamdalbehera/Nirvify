import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayPodcast from "./DisplayPodcast";
import Upload from "../pages/Upload";
import Navbar from "./Navbar";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const audioRef = useRef(null);

  const handleLogout = () => {
    // Stop the audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the playback time
    }
  };

  return (
    <div className="w-full m-2 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={<DisplayHome audioRef={audioRef} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/podcast/:id"
          element={
            <DisplayPodcast isLoggedIn={isLoggedIn} audioRef={audioRef} />
          }
        />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default Home;
