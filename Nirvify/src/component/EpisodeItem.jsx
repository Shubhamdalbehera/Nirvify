import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";

const EpisodeItem = ({ id, name, image, desc, episodeNo, isLoggedIn }) => {
  const { playWithId } = useContext(PlayerControl);
  const [showAuthBanner, setShowAuthBanner] = useState(false);

  const handleEpisodeClick = () => {
    if (isLoggedIn) {
      playWithId(id);
    } else {
      setShowAuthBanner(true);
    }
  };

  return (
    <>
      <div
        onClick={handleEpisodeClick}
        className="relative group w-56 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <div className="absolute bottom-[105px] right-3 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300">
          <img className="w-16" src={assets.play_button} alt="" />
        </div>
        <p className="font-bold mt-2">
          Episode No: {episodeNo} {name}
        </p>
        <p className="text-slate-200 text-sm">{desc}</p>
      </div>

      {showAuthBanner && (
        <AuthBanner
          message={
            <span>
              Start listening with
              <br />a Nirvify account
            </span>
          }
          onClose={() => setShowAuthBanner(false)}
        />
      )}
    </>
  );
};

export default EpisodeItem;
