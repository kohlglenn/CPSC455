// const User = require('./index');
const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    participants: {
      type: [Object],
      required: true,
    },
    host: {
      type: Object,
      required: true,
    },
    numberRestaurants: {
      type: Number,
      required: true,
    },
    distance: {
      type: [Number],
      required: true,
    },
    price: {
      type: [Number],
      required: true,
    },
    rating: {
      type: [Number],
      required: true,
    },
    reviewCount: {
      type: [Number],
      required: true,
    },
    restaurants: {
      type: [Object],
    },
    votes: {
      type: [Object],
      required: true,
      default: [],
    },
    winner: {
      type: Object,
    },
  },
  { timestamps: true }
);

LobbySchema.index({ expireAfterSeconds: 3600 });

const Lobby = mongoose.model("LobbyData", LobbySchema);
module.exports = Lobby;
