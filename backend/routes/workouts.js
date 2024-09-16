const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

// All paths start with '/api/auth'

// GET /api/workouts - return all workouts
router.get('/', workoutsCtrl.index);

// POST /api/workouts - create a new workout
router.post('/', workoutsCtrl.create);

module.exports = router;
