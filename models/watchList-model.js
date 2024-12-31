import mongoose, { Schema } from "mongoose";

const watchListSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  movieId: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  releaseDate: {
    type: Date,
    required: [true, "Release date is required"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const watchListModel =
  mongoose.models.watchList || mongoose.model("watchList", watchListSchema);
export default watchListModel;
