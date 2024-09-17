const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'

// GET /api/workouts - return all workouts
router.get('/', workoutsCtrl.index);

// POST /api/workouts - create a new workout
router.post('/', ensureLoggedIn, workoutsCtrl.create);

// GET /api/workouts/:id - return one workout
router.get('/:id', ensureLoggedIn, workoutsCtrl.show);

// PUT /api/workouts/:id - update one workout
router.put('/:id', ensureLoggedIn, workoutsCtrl.update);

// DELETE /api/workouts/:id - delete one workout
router.delete('/:id', ensureLoggedIn, workoutsCtrl.delete);

// POST /api/workouts/:id/comments - add a comment to a workout
router.post('/:id/comments', ensureLoggedIn, workoutsCtrl.addComment);

module.exports = router;
