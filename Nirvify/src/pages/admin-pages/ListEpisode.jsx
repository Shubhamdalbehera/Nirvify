import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ListEpisode = () => {
  const [episodes, setEpisodes] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/episode/list-episode"
        );
        setEpisodes(response.data.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  const openBanner = (episodeId) => {
    setSelectedEpisodeId(episodeId);
    setShowBanner(true);
  };

  const closeBanner = () => {
    setShowBanner(false);
    setSelectedEpisodeId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/episode/${selectedEpisodeId}`
      );
      setEpisodes(
        episodes.filter((episode) => episode._id !== selectedEpisodeId)
      );
      closeBanner();
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting episode:", error);
      alert("Failed to delete the episode.");
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="mx-auto p-8 h-screen bg-gradient-to-l from-[#212121] to-gray-800">
      <h2 className="text-2xl text-white font-bold mb-4">Episodes List</h2>
      <table className="min-w-full text-white border-gray-300">
        <thead>
          <tr className="bg-gray-600 text-gray-200 uppercase leading-normal">
            <th className="py-3 px-6 text-left">S_No</th>
            <th className="py-3 px-6 text-left">Episode No</th>
            {/* New Episode No Column */}
            <th className="py-3 px-6 text-left">Episode Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Duration</th>
            <th className="py-3 px-6 text-left">Podcast</th>
            <th className="py-3 px-6 text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => (
            <tr
              key={episode._id}
              className="border-b border-gray-200 hover:bg-gray-400 hover:text-black transition-colors duration-200">
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{episode.episodeNo}</td>
              {/* Display episode number */}
              <td className="py-3 px-6 text-left">{episode.name}</td>
              <td className="py-3 px-6 text-left">{episode.desc}</td>
              <td className="py-3 px-6 text-left">{episode.duration}</td>
              <td className="py-3 px-6 text-left">{episode.podcast?.name}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => openBanner(episode._id)}
                  className="bg-red-500 text-white px-6 py-1 rounded-full hover:bg-red-600">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded-lg text-black shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this episode?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeBanner}
                className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-6">Episode deleted successfully.</p>
            <button
              onClick={closeAlert}
              className="bg-gray-400 text-black px-4 py-2 rounded-full hover:bg-gray-200">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEpisode;
