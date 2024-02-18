const router = require("express").Router();
const eventController = require("../../controllers/eventController")

// Get all Events
router.get("/",eventController.getAllEvents);

// Get an existing Event
router.get("/:eventId",eventController.getOneEvent);

// Create a new Event
router.post("/",eventController.createNewevent);

// Update your exsiting Event
router.patch("/:eventId",eventController.updateOneEvent);

// Deleting an existing Event
router.delete("/:eventId",eventController.deleteOneEvent);

module.exports = router;