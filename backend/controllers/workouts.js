// const { create } = require('../models/user');
const Workout = require("../models/workout");
// const Comment = require('../models/comment');

module.exports = {
  index,
  create,
  show,
  update,
  delete: remove,
  addComment,
  showUser,
};

async function index(req, res) {
  const workouts = await Workout.find({})
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
  const workout = await Workout.findById(req.params.id).populate("author").populate({path: "comments", populate: {path: "author"}});
  res.json(workout);
}

async function showUser(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("workouts");
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedWorkout);
}

async function remove(req, res) {
  const deletedWorkout = await Workout.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  res.status(200).json(deletedWorkout);
}

async function addComment(req, res) {
  req.body.author = req.user._id;
  const workout = await Workout.findById(req.params.id).populate("author");
  workout.comments.push({ ...req.body, author: req.user._id });
  await workout.save();
  const updatedWorkout = await Workout.findById(req.params.id).populate("author").populate({path: "comments", populate: {path: "author"}});
  res.status(201).json(updatedWorkout);
}
