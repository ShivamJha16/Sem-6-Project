const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const { createFeedback, getAllFeedbacks } = require('../controllers/feedbackControllers');

router.post('/', protect, createFeedback);
router.get('/', getAllFeedbacks);

module.exports = router;