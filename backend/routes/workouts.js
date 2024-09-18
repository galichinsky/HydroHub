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

// GET /api/workouts/user/:userId - return all workouts for a user
router.get('/user/:userId', ensureLoggedIn, workoutsCtrl.showUser);

// PUT /api/workouts/:id - update one workout
router.put('/:id', ensureLoggedIn, workoutsCtrl.update);

// DELETE /api/workouts/:id - delete one workout
router.delete('/:id', ensureLoggedIn, workoutsCtrl.delete);

// POST /api/workouts/:id/comments - add a comment to a workout
router.post('/:id/comments', ensureLoggedIn, workoutsCtrl.addComment);

// DELETE /api/workouts/:id/comments/:commentId - delete a comment from a workout
// router.delete('/:id/comments/:commentId', ensureLoggedIn, workoutsCtrl.removeComment);

module.exports = router;
