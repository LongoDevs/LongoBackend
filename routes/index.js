const express = require('express');
const router = express.Router();

const { rateUser } = require('../controllers/ratingController');
const {
  getAllUsers,
  getNearbyUsers,
  getLeaderboard
} = require('../controllers/userController');

// Root welcome route
router.get('/', (req, res) => {
  res.send('Welcome to the Longo App API!');
});

// Get all users
router.get('/users', getAllUsers);

// Get nearby users
router.get('/users/nearby', getNearbyUsers);

// Leaderboard endpoint 🏆
router.get('/leaderboard', getLeaderboard);

// Submit rating
router.post('/rate/:userId', rateUser);

module.exports = router;
