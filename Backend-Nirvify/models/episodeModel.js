// import mongoose from "mongoose";

// const episodeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   desc: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   audio: {
//     type: String,
//     required: true,
//   },
//   duration: {
//     type: String,
//     required: true,
//   },
//   podcast: {
//     type: String,
//     ref: "Podcast", // Reference to the associated podcast
//     required: true,
//   },
//   episodeNo: {
//     type: Number,
//     required: true,
//   },
// });

// const episodeModel = mongoose.model("Episode", episodeSchema);

// export default episodeModel;


import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Store duration as seconds
    required: true,
  },
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Podcast", // Reference to the associated podcast by ObjectId
    required: true,
  },
  episodeNo: {
    type: Number,
    required: true,
    validate: {
      validator: async function (value) {
        // Ensure episode number is unique within a podcast
        const episode = await this.constructor.findOne({ podcast: this.podcast, episodeNo: value });
        if (episode) {
          return false; // Episode number exists
        }
        return true;
      },
      message: "Episode number must be unique within the podcast.",
    },
  },
});

// Pre-save hook to auto-increment episode number if it's not provided
episodeSchema.pre("save", async function (next) {
  if (!this.episodeNo) {
    const lastEpisode = await this.constructor
      .find({ podcast: this.podcast })
      .sort({ episodeNo: -1 })
      .limit(1);
    this.episodeNo = lastEpisode.length > 0 ? lastEpisode[0].episodeNo + 1 : 1;
  }
  next();
});

const Episode = mongoose.model("Episode", episodeSchema);

export default Episode;

