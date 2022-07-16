import { Request, Router } from "express";

const LobbyModel = require('../models/Lobby');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.v68h6.mongodb.net/recipes?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});

const router = Router();

// TODO: Make caching better, should probably also cache based on lobby id instead of lat/long pair and create a data structure (to include a valid until field and other metadata)
const cache: any = {};


/* GET restaurants listing. */
router.post("/", async function (req, res, next) {
    const recipe = new LobbyModel({ id: req.body.id, participants: req.body.participants, numberRestaurants: req.body.numberRestaurants });
    try {
        await recipe.save();
    } catch (err) {
        console.log(err);
    }
    return res.send(recipe);
});

router.get("/:id", async function (req, res, next) {
    LobbyModel.find({ id: req.params.id }, (err: any, result: any) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

router.put("/", async function (req, res, next) {
    await LobbyModel.update( { id: req.body.id }, { numberRestaurants: req.body.numRestaurants });
    res.send("updated");

});

module.exports = router;
