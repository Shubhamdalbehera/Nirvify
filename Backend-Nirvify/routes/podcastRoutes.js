import express from "express";
import {
  createPodcast,
  uploadImage,
  getPodcasts,
  deletePodcast,
} from "../controller/podcastController.js";

const router = express.Router();

// POST request to add a new podcast with image
router.post("/add-podcast", uploadImage.single("image"), createPodcast);

// GET request to fetch all podcasts
router.get("/list-podcast", getPodcasts);

// 

// DELETE request to remove a podcast by ID
router.delete("/:id", deletePodcast);

export default router;
