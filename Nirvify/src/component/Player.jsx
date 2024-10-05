import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";

const Player = ({ isLoggedIn }) => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    nextTrack,
    prevTrack,
    seekEpisode,
  } = useContext(PlayerControl);

  const [showAuthBanner, setShowAuthBanner] = useState(false);

  const handlePlayPause = () => {
    if (isLoggedIn) {
      playStatus ? pause() : play();
    } else {
      setShowAuthBanner(true);
    }
  };

  const handlePrev = () => {
    if (isLoggedIn) {
      prevTrack();
    } else {
      setShowAuthBanner(true);
    }
  };

  const handleNext = () => {
    if (isLoggedIn) {
      nextTrack();
    } else {
      setShowAuthBanner(true);
    }
  };

  return (
    <>
      <div className="relative h-full w-full bg-[#121212] flex flex-col justify-between rounded text-white p-2">
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative flex flex-col w-[120%] to-center">
            <img className="size-28 rounded" src={track.image} alt="" />
            <p className="absolute flex mt-24 p-5">{track.ep}</p>
          </div>
          <div className="absolute flex flex-col ml-32 hidden-custom">
            <p className="pb-3">{track.name}</p>
            <p className="hidden sm:flex text-sm">{track.desc}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-[max(22vw)] gap-1 m-auto mt-12 player-controls">
          <div className="flex pr-7 gap-4 pb-2">
            <img
              onClick={handlePrev}
              className="w-4 cursor-pointer"
              src={assets.prev_icon}
              alt="Previous"
            />
            <img
              onClick={handlePlayPause}
              className="w-4 cursor-pointer"
              src={playStatus ? assets.pause_icon : assets.play_icon}
              alt={playStatus ? "Pause" : "Play"}
            />
            <img
              onClick={handleNext}
              className="w-4 cursor-pointer"
              src={assets.next_icon}
              alt="Next"
            />
          </div>

          <div className="flex flex-row items-center gap-3 w-[max(22vw)]">
            <p className="pb-2 pl-1">
              {time.currentTime.minute}:{time.currentTime.second}
            </p>
            <div
              ref={seekBg}
              onClick={isLoggedIn ? seekEpisode : () => setShowAuthBanner(true)}
              className="w-[40vw] max-w-[270px] bg-gray-300 rounded-full cursor-pointer">
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-bianchigreen_dark rounded-full"
              />
            </div>
            <p className="pr-8 pb-2">
              {time.totalTime.minute}:{time.totalTime.second}
            </p>
          </div>
        </div>
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

export default Player;
