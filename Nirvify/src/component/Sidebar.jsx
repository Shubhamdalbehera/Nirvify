import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import Player from "./Player";
import { useNavigate } from "react-router";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";

const Sidebar = ({ isLoggedIn }) => {
  const { audioRef, track } = useContext(PlayerControl);
  const navigate = useNavigate();

  const [showAuthBanner, setShowAuthBanner] = useState(false);

  const handleCreatePodcast = () => {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      setShowAuthBanner(true);
    }
  };

  return (
    <>
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[14.5%] mb-1 rounded flex flex-col">
          <div className="flex items-center pb-1 pl-5 cursor-pointer">
            <img className="w-40" src={assets.main_logo} alt="" />
          </div>
          <div className="gap-10 rounded h-[15%] inline-flex">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 pl-8 cursor-pointer">
              <img className="w-8" src={assets.home_icon} alt="" />
              <p className="font-bold">Home</p>
            </div>
            <div className="flex items-center gap-2 pl-8 cursor-pointer">
              <img className="w-8" src={assets.search_icon} alt="" />
              <p className="font-bold">Search</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] h-[85%]">
          <div className="pt-3 pl-8 pb-2">
            <div className="flex gap-3">
              <img className="w-8" src={assets.upload_icon} alt="" />
              <p className="font-semibold pt-1">You can upload</p>
            </div>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start gap-1 pl-4">
            <h1>Create your own podcast</h1>
            <p className="font-light">It's easy, we will help you</p>
            <button
              onClick={handleCreatePodcast}
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 transition-transform duration-100 hover:scale-105">
              Create Podcast
            </button>
          </div>
          <div className="h-[45%] p-2 bg-[#242424] m-2 rounded font-semibold flex flex-col gap-1 mt-4">
            <Player audioRef={audioRef} isLoggedIn={isLoggedIn} />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
          </div>
          <footer className="w-full text-center text-xs text-zinc-400 mt-8 mb-5">
            <p>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="underline text-white">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-white">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </footer>
        </div>
      </div>
      {showAuthBanner && (
        <AuthBanner
          message={
            <span>
              Make a Nirvify account
              <br />
              to upload a podcast
            </span>
          }
          onClose={() => setShowAuthBanner(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
