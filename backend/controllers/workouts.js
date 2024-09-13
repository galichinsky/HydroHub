// controllers/workouts.js
const express = require('express');
const verifyToken = require('../middleware/checkToken');
const Workout = require('../models/workout');
const router = express.Router();

// Routes
router.use(verifyToken);

// GET /workouts - display all workouts
router.get('/posts',)
