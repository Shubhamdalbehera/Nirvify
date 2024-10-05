import express from "express";
import {
  createEpisode,
  uploadEpisode,
  getAllEpisodes,
  deleteEpisode,
} from "../controller/episodeController.js";

const router = express.Router();

router.post(
  "/add-episode",
  (req, res, next) => {
    uploadEpisode(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    });
  },
  createEpisode
);

// GET request to fetch all episodes
router.get("/list-episode", getAllEpisodes);

// DELETE request to remove an episode by ID
router.delete("/:id", deleteEpisode);

export default router;
