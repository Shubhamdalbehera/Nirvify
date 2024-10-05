import React, { useEffect, useState } from "react";
import PodcastItem from "./PodcastItem";
import EpisodeItem from "./EpisodeItem";
import axios from "axios"; // To fetch data from the backend

const DisplayHome = ({ isLoggedIn }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [episodeData, setEpisodeData] = useState([]); // Initialize episodeData properly
  const [podcastError, setPodcastError] = useState(null); // State for podcast errors
  const [episodeError, setEpisodeError] = useState(null); // State for episode errors

  useEffect(() => {
    // Fetch podcasts from the backend
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/podcast/list-podcast"
        ); // Replace with your correct backend route
        if (response.data && response.data.podcasts) {
          setPodcasts(response.data.podcasts); // Ensure podcasts are set correctly
        } else {
          setPodcastError("No podcasts found in the response");
        }
      } catch (error) {
        setPodcastError("Error fetching podcasts: " + error.message);
      }
    };

    // Fetch episodes from the backend
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/episode/list-episode" // Replace with your correct backend route for episodes
        );
        if (response.data && response.data.episodes) {
          setEpisodeData(response.data.episodes); // Ensure episodes are set correctly
        } else {
          setEpisodeError("No episodes found in the response");
        }
      } catch (error) {
        setEpisodeError("Error fetching episodes: " + error.message);
      }
    };

    fetchPodcasts();
    fetchEpisodes(); // Call the fetch function for episodes
  }, []);

  return (
    <div className="bg-[#212121] pl-4 mt-3 p-0.5">
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Essential Listening</h1>
        <div className="flex overflow-auto">
          {podcastError ? (
            <p className="text-red-400">{podcastError}</p>
          ) : Array.isArray(podcasts) && podcasts.length > 0 ? (
            podcasts.map((item, index) => {
              const imageUrl = `http://localhost:3000/uploads/podcast-images/${item.image
                .split("/")
                .pop()}`; // Correct image URL construction
              return (
                <PodcastItem
                  key={index}
                  image={imageUrl} // Use the constructed image URL
                  name={item.name}
                  podcaster={item.podcasterName}
                  id={item._id}
                />
              );
            })
          ) : (
            <p className="text-slate-400">No podcasts available.</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Chart-Toppers: Must-Listen Episodes
        </h1>
        <div className="flex overflow-auto">
          {episodeError ? (
            <p className="text-red-400">{episodeError}</p>
          ) : Array.isArray(episodeData) && episodeData.length > 0 ? (
            episodeData.map((item, index) => {
              const episodeImageUrl = `http://localhost:3000/uploads/epi-images/${item.image
                .split("/")
                .pop()}`;
              const audioUrl = `http://localhost:3000/uploads/epi-audios/${item.audio
                .split("/")
                .pop()}`;
              return (
                <EpisodeItem
                  key={index}
                  image={episodeImageUrl}
                  audio={audioUrl}
                  episodeNo={item.episodeNo} // Make sure to adjust these based on your episode data structure
                  desc={item.desc}
                  isLoggedIn={isLoggedIn}
                />
              );
            })
          ) : (
            <p className="text-slate-400">No episodes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
