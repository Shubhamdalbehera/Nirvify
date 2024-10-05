import Podcast from "../models/podcastModel.js";
import Episode from "../models/episodeModel.js"; // Import Episode model
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, up) => {
    up(null, path.join(__dirname, "../uploads/podcast-images"));
  },
  filename: (req, file, up) => {
    up(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({ storage });

// Create a new podcast
const createPodcast = async (req, res) => {
  const { name, desc, podcasterName } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newPodcast = new Podcast({
      name,
      image: image ? image.replace(/\\/g, "/") : null, // Normalize file path
      desc,
      podcasterName,
    });

    await newPodcast.save();
    res.status(201).json({
      status: true,
      podcast: newPodcast,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating podcast", status: false, error });
  }
};

// Fetch all podcasts
const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    const hostUrl = `${req.protocol}://${req.get("host")}`;

    // Return full URL for images
    const modifiedPodcasts = podcasts.map((podcast) => ({
      ...podcast.toObject(),
      image: podcast.image ? `${hostUrl}/${podcast.image}` : null,
    }));

    return res.status(200).json({ podcasts: modifiedPodcasts });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a podcast by ID with cascading deletion of episodes
const deletePodcast = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the podcast by ID
    const podcast = await Podcast.findById(id);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Delete all episodes associated with this podcast
    await Episode.deleteMany({ podcast: id });

    // Now delete the podcast itself using findByIdAndDelete
    await Podcast.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Podcast and associated episodes deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createPodcast, uploadImage, getPodcasts, deletePodcast };
