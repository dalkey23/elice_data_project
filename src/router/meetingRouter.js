const express = require("express");
const router = express.Router();
const Meeting = require("../models/meeting");

// Create a meeting
router.post("/meetings", async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).send(meeting);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all meetings
router.get("/meetings", async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.send(meetings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a meeting by ID
router.get("/meetings/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).send();
    }
    res.send(meeting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a meeting by ID
router.patch("/meetings/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "comment",
    "volunteerTime",
    "recruitment",
    "content",
    "author",
    "image",
    "address",
    "category",
    "participation",
    "meetingStatus",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).send();
    }
    updates.forEach((update) => (meeting[update] = req.body[update]));
    await meeting.save();
    res.send(meeting);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a meeting by ID
router.delete("/meetings/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) {
      return res.status(404).send();
    }
    res.send(meeting);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
