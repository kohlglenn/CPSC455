import { Request, Router } from "express";
import { Restaurant } from "../models";
import { calculateBestRestaurant } from "./util";

const LobbyModel = require("../models/Lobby");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.v68h6.mongodb.net/recipes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const router = Router();

/* GET restaurants listing. */
router.post("/", async function (req, res, next) {
  const lobby = new LobbyModel({
    id: req.body.id,
    participants: req.body.participants,
    host: req.body.host,
    numberRestaurants: req.body.numberRestaurants,
    rating: req.body.rating,
    distance: req.body.distance,
    price: req.body.price,
    reviewCount: req.body.reviewCount,
  });
  try {
    await lobby.save();
  } catch (err) {
    console.log(err);
  }
  return res.send(lobby);
});

router.get("/:id", async function (req, res, next) {
  LobbyModel.find({ id: req.params.id }, (err: any, result: any) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

router.put("/updateLobby", async function (req, res, next) {
  const filters = req.body.filters;
  await LobbyModel.update(
    { id: req.body.id },
    {
      numberRestaurants: filters.numberRestaurants,
      distance: filters.distance,
      categories: filters.categories,
      rating: filters.rating,
      price: filters.price,
      reviewCount: filters.reviewCount,
    }
  );
  res.send("updated");
});

router.put("/addUser", async function (req, res, next) {
  await LobbyModel.update(
    { id: req.body.id },
    { $push: { participants: req.body.user } }
  );
  res.send("updated");
});

router.post("/restaurants", async function (req, res, next) {
  const { id, restaurants } = req.body;
  await LobbyModel.updateOne({ id: id }, { restaurants });
  const result = await LobbyModel.findOne({ id: id });
  res.json(result);
});

router.post("/vote", async function (req, res, next) {
  const { id, vote } = req.body;
  await LobbyModel.updateOne({ id: id }, { $push: { votes: vote } });
  let result = await LobbyModel.findOne({ id: id });
  const winner = calculateBestRestaurant(result);
  if (winner) {
    await LobbyModel.updateOne({ id: id }, { winner });
    result = await LobbyModel.findOne({ id: id });
    console.log(result);
  }
  res.json(result);
});

module.exports = router;
