const express = require("express")
const router = express.Router()

const { protect } = require("../middlewares/authMiddleware")

const { 
createEvent, 
cancelEvent, 
updateEventStatus, 
getEvent, 
getAllEvents, 
updateEvent,
approveEvent,
rejectEvent
} = require("../controllers/eventControllers")

router.post("/", protect, createEvent)

router.put("/cancel", protect, cancelEvent)

router.put("/status", protect, updateEventStatus)

router.get("/", protect, getEvent)

router.get("/allEvent", protect, getAllEvents)

router.put("/update", protect, updateEvent)

router.put("/approve/:id", protect, approveEvent)

router.put("/reject/:id", protect, rejectEvent)

module.exports = router