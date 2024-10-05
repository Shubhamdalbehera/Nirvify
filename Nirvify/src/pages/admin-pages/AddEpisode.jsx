import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const AddEpisode = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [episodeName, setEpisodeName] = useState("");
  const [episodeDesc, setEpisodeDesc] = useState("");
  const [episodeImage, setEpisodeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [audiofile, setAudiofile] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState("");
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  const [episodeNo, setEpisodeNo] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEpisodeImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudiofile(file);
      setIsAudioUploaded(true);
    } else {
      setIsAudioUploaded(false);
    }
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/podcast/list-podcast"
        );
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!image || !audiofile) {
      setMessage("Both image and audio file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", episodeName);
    formData.append("desc", episodeDesc);
    formData.append("podcast", selectedPodcast);
    formData.append("image", episodeImage);
    formData.append("audiofile", audiofile);
    formData.append("episodeNo", episodeNo);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/episode/add-episode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status) {
        setMessage(response.data.message);
        setShowAlert(true);
        setEpisodeName("");
        setEpisodeDesc("");
        setEpisodeImage(null);
        setAudiofile(null);
        setPreviewImage(null);
        setSelectedPodcast("");
        setIsAudioUploaded(false);
        setEpisodeNo("");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding episode";
      setMessage(errorMessage);
      console.error("Error adding episode:", errorMessage);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setSuccessMessage("");
  };

  return (
    <div className="flex h-screen overflow-hidden items-start text-white pt-8 pl-5 sm:pt-5 sm:pl-12 bg-gradient-to-l from-[#212121] to-gray-800">
      <form
        className="flex flex-col items-start pb-10 gap-7 w-full"
        onSubmit={handleFormSubmit}>
        <h2 className="text-xl font-bold text-center mb-4 w-full underline">
          Episode Details
        </h2>

        <div className="flex gap-8">
          {/* Image Upload Section */}
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                src={previewImage || assets.upload_area}
                className="w-24 cursor-pointer"
                alt="Upload Image"
              />
            </label>
          </div>

          {/* Audio Upload Section */}
          <div className="flex flex-col gap-4">
            <p>Upload Audio</p>
            <input
              type="file"
              id="audio"
              onChange={handleAudioChange}
              accept="audio/*"
              hidden
            />
            <label htmlFor="audio">
              {/* Conditionally render the audio upload image */}
              <img
                src={
                  isAudioUploaded ? assets.uploaded_audio : assets.upload_audio
                }
                className="w-24 cursor-pointer"
                alt={isAudioUploaded ? "Audio Uploaded" : "Upload Audio"}
              />
            </label>
          </div>

          {message && (
            <div className="mt-10 pl-6 flex items-center">
              <ExclamationCircleIcon className="h-6 w-6 mr-0.5 text-red-500" />
              <span className="text-red-500">{message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Episode Name</p>
          <input
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            name="name"
            value={episodeName}
            onChange={(e) => setEpisodeName(e.target.value)}
            placeholder="Type Here"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Episode No.</p>
          <input
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            name="episodeNo"
            value={episodeNo}
            onChange={(e) => setEpisodeNo(e.target.value)}
            placeholder="Type Here"
            type="number" // Use number type for episode number
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Episode Description</p>
          <textarea
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            name="desc"
            value={episodeDesc}
            onChange={(e) => setEpisodeDesc(e.target.value)}
            placeholder="Type Here"
          />
        </div>

        <div className="relative flex flex-col gap-2.5">
          <p>Select Podcast</p>
          <select
            className="bg-gray-600 border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none rounded-2xl px-6 py-2 w-full"
            name="podcast"
            value={selectedPodcast} // Use selectedPodcast state for value
            onChange={(e) => setSelectedPodcast(e.target.value)}>
            <option value="">Select Podcast</option>
            {podcasts.map((podcast) => (
              <option key={podcast._id} value={podcast._id}>
                {podcast.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="absolute ml-48 mt-9 text-base bg-black text-white py-2.5 px-16 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium">
            ADD
          </button>
        </div>
      </form>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-6">Episode uploaded successfully.</p>
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

export default AddEpisode;
