const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

// const Comment = mongoose.model("Comment", commentSchema);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String,  required: true },
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
    intensity: {
      type: [String],
      enum: ["Easy", "Moderate", "Hard", "All-out"],
      required: true,
    },
    course: { 
      type: [String],
      enum: ["SCM", "SCY", "LCM"],  
    },
    totalTime: { type: Number,  },
    workout: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comments: [ commentSchema ],
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
