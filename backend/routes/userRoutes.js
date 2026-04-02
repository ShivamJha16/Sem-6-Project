const express = require("express")
const router = express.Router()
const { protect } = require("../middlewares/authMiddleware")
const { registerUser, loginUser, getAllUsers } = require("../controllers/userControllers")

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/', protect, getAllUsers)

module.exports = router