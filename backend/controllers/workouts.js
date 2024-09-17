// const { create } = require('../models/user');
const Workout = require("../models/workout");
// const Comment = require('../models/comment');

module.exports = {
  index,
  create,
  show,
};

async function index(req, res) {
  const workouts = await Workout.find({ author: req.user._id })
    .sort({ createdAt: -1 })
    .populate("author");
  res.json(workouts);
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    console.log(req.body);
    const workout = await Workout.create(req.body);
    workout._doc.author = req.user;
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  const workout = await Workout.findById(req.params.id).populate("author");
  res.json(workout);
}
