import { createContext, useEffect, useRef, useState } from "react";
import { episodeData } from "../assets/assets";

export const PlayerControl = createContext();

const PlayerControlProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [trackIndex, setTrackIndex] = useState(0);
  const [track, setTrack] = useState(episodeData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "00",
    },
    totalTime: {
      second: "00",
      minute: "00",
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const nextTrack = async () => {
    const nextIndex = (trackIndex + 1) % episodeData.length;
    await setTrackIndex(nextIndex);
    await setTrack(episodeData[nextIndex]);

    audioRef.current.load();
    audioRef.current.play();
    setPlayStatus(true);
  };

  const prevTrack = async () => {
    const prevIndex =
      (trackIndex - 1 + episodeData.length) % episodeData.length;
    await setTrackIndex(prevIndex);
    await setTrack(episodeData[prevIndex]);

    audioRef.current.load();
    audioRef.current.play();
    setPlayStatus(true);
  };

  const playWithId = async (id) => {
    await setTrack(episodeData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const seekEpisode = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const resetPlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayStatus(false);
    }
  };

  useEffect(() => {
    const setUpTimeUpdate = () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (!isNaN(audioRef.current.duration)) {
            seekBar.current.style.width =
              Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
              ) + "%";

            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    };

    setTimeout(setUpTimeUpdate, 1000);

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef]);

  const controlValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    prevTrack,
    nextTrack,
    playWithId,
    seekEpisode,
    resetPlayer, // Expose resetPlayer
  };

  return (
    <PlayerControl.Provider value={controlValue}>
      {props.children}
    </PlayerControl.Provider>
  );
};

export default PlayerControlProvider;
