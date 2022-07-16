const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
    numberRestaurants: {
      type: Number,
      required: true,
    },
    restaurants: {
      type: [Object],
    },
    votes: {
      type: [Object],
    },
  },
  { timestamps: true }
);

LobbySchema.index({ expireAfterSeconds: 3600 });

const Lobby = mongoose.model("LobbyData", LobbySchema);
module.exports = Lobby;
