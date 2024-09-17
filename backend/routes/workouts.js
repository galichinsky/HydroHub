const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

// All paths start with '/api/auth'

// GET /api/workouts - return all workouts
router.get('/', workoutsCtrl.index);

// POST /api/workouts - create a new workout
router.post('/', workoutsCtrl.create);

// GET /api/workouts/:id - return one workout
router.get('/:id', workoutsCtrl.show);

// PUT /api/workouts/:id - update one workout
router.put('/:id', workoutsCtrl.update);



module.exports = router;
