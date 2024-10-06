import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";
import axios from "axios";

const DisplayPodcast = ({ isLoggedIn }) => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerControl);
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showAuthBanner, setShowAuthBanner] = useState(false);

  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        // Fetch the podcast details
        const podcastResponse = await axios.get(`http://localhost:3000/api/podcast/list-podcast`);
        setPodcast(podcastResponse.data.podcast);

        // Fetch the episodes for this podcast
        const episodeResponse = await axios.get(`http://localhost:3000/api/podcast/list-podcast`);
        setEpisodes(episodeResponse.data.episodes);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchPodcastData();
  }, [id]);

  const handleEpisodeClick = (episodeId) => {
    if (isLoggedIn) {
      playWithId(episodeId);
    } else {
      setShowAuthBanner(true);
    }
  };

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-[#212121] pl-5 mt-3 p-0.5 pb-5">
        <div className="mt-5 flex gap-4 flex-col md:flex-row md:items-end">
          <img
            className="w-48 rounded"
            src={`http://localhost:3000/${podcast._id}`}
            alt={podcast.name}
          />
          <div className="flex flex-col font-circular">
            <p className="font-semibold pl-1">Podcast</p>
            <p className="text-5xl font-bold md:text-7xl">{podcast.name}</p>
            <p className="pl-1 text-lg font-bold pt-1">
              {podcast.podcasterName}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff26] pl-5 p-0.5 pb-5">
        <div className="mt-5 flex gap-4 flex-col md:items-start">
          <h1 className="font-medium">About</h1>
          <p className="text-zinc-400">{podcast.desc}</p>
        </div>
        <div className="pt-8 pb-4 pr-5">
          <hr />
        </div>
        {episodes.map((item) => (
          <div
            key={item._id} // Assuming the episode ID is stored in `_id`
            onClick={() => handleEpisodeClick(item._id)}
            className="cursor-pointer flex flex-col items-center">
            <div className="flex gap-4 flex-col md:flex-row w-[80%] p-5 hover:bg-[#212121] hover:rounded-md">
              <img
                className="w-28 rounded"
                src={`http://localhost:3000/${item.image}`} // Replace with the correct path for episode images
                alt={item.name}
              />
              <div className="text-xl mb-2">
                {item.episodeNo} {item.name}
                <img
                  className="inline-flex mb-2 size-14 ml-2 cursor-pointer transform transition-transform duration-100 hover:scale-105"
                  src="/path-to-play-button-icon" // Replace with the correct play button icon path
                  alt="Play"
                />
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
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

export default DisplayPodcast;
