const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

const { createPayment, getAllPayments, getPayments, verifyPayment } = require('../controllers/paymentControllers');

router.post('/', protect, createPayment);
router.post('/verify', protect, verifyPayment);
router.get('/', protect, getPayments);
router.get('/getAllPayments', protect, getAllPayments);

module.exports = router;