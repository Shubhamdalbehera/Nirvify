import Episode from "../models/episodeModel.js";
import Podcast from "../models/podcastModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import * as mm from "music-metadata";

// Resolve __dirname in ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for multiple files (image and audio)
const uploadEpisode = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, path.join(__dirname, "../uploads/epi-images"));
      } else if (file.fieldname === "audiofile") {
        cb(null, path.join(__dirname, "../uploads/epi-audios"));
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
}).fields([
  { name: "image", maxCount: 1 },
  { name: "audiofile", maxCount: 1 },
]);

// Create a new episode
const createEpisode = async (req, res) => {
  const { name, desc, podcast, episodeNo } = req.body; // Added episodeNumber here
  const image = req.files?.image ? req.files.image[0].path : null;
  const audiofile = req.files?.audiofile ? req.files.audiofile[0].path : null;

  // Validate inputs and provide specific error messages
  if (!name || !episodeNo || !desc || !podcast) {
    return res.status(400).json({
      status: false,
      message: "All fields are required.",
    });
  }

  try {
    // Check if the podcast exists
    const selectedPodcast = await Podcast.findById(podcast);
    if (!selectedPodcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Calculate audio duration using music-metadata
    const audioMetadata = await mm.parseFile(audiofile);
    const durationInSeconds = audioMetadata.format.duration;
    const duration = `${Math.floor(durationInSeconds / 60)}:${Math.floor(
      durationInSeconds % 60
    )}`;

    // Create a new episode
    const newEpisode = new Episode({
      name,
      image: image.replace(/\\/g, "/"), // Normalize file path
      desc,
      duration,
      podcast,
      episodeNo, // Store the episode number in the new episode
      audio: audiofile.replace(/\\/g, "/"), // Assign audiofile to the 'audio' field
    });

    await newEpisode.save();

    res.status(201).json({
      status: true,
      episode: newEpisode,
    });
  } catch (error) {
    console.error("Error in createEpisode:", error);
    res
      .status(500)
      .json({ message: "Error creating episode", status: false, error });
  }
};

// Get all episodes
const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find().populate("podcast", "name"); // Populate the podcast field, only fetching the name
    return res.status(200).json({ episodes });
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a single episode by ID
const getEpisodeById = async (req, res) => {
  const { id } = req.params;

  try {
    const episode = await Episode.findById(id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }
    return res.status(200).json({ episode });
  } catch (error) {
    console.error("Error fetching episode:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete an episode by ID
const deleteEpisode = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEpisode = await Episode.findByIdAndDelete(id);
    if (!deletedEpisode) {
      return res.status(404).json({ message: "Episode not found" });
    }
    return res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    console.error("Error deleting episode:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  createEpisode,
  uploadEpisode,
  getAllEpisodes,
  getEpisodeById,
  deleteEpisode,
};
