const mongoose = require("mongoose");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const workoutSchema = new Schema(
  {
    workoutName: { type: String, required: true },
    category: {
      type: [String],
      enum: [
        "Freestyle",
        "Backstroke",
        "Breaststroke",
        "Butterfly",
        "IM",
        "Kick",
        "Pull",
        "Drill",
        "Sprint",
        "Distance",
        "Technique",
        "Endurance",
        "Speed",
        "Strength",
        "Recovery",
        "Warm-up",
        "Cool-down",
      ],
      required: true,
    },
    intencity: {
      type: [String],
      enum: ["Easy", "Moderate", "Hard", "All-out"],
      required: true,
    },
    totalDistance: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    workout: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [ commentSchema ],
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
