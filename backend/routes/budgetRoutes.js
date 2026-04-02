const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createBudget, getBudget, getAllBudgets, updateStatus } = require('../controllers/budgetControllers');

const router = express.Router();

// Create budget
router.post('/', protect, createBudget);

// Get all budgets
router.get('/getAllBudgets', protect, getAllBudgets);

// Get budget
router.get('/:eventId' , protect, getBudget);

// Update status
router.put('/updateStatus', protect, updateStatus);

module.exports = router;