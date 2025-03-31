import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

export const fetchAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

export const fetchEventsById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event Not Found" });
  }
});
