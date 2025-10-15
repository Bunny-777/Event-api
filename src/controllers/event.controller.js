import prisma from "../db.js";

export const createEvent = async (req, res) => {
  try {
    const { title, start_time, location, capacity } = req.body;

    if (!title || !start_time || !location || !capacity)
      return res.status(400).json({ message: "All fields required" });

    if (capacity <= 0 || capacity > 1000)
      return res.status(400).json({ message: "Capacity must be between 1 and 1000" });

    const event = await prisma.event.create({
      data: { title, start_time: new Date(start_time), location, capacity },
    });

    res.status(201).json({ message: "Event created", eventId: event.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { registrations: { include: { user: true } } },
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: event_id },
      include: { registrations: true },
    });
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check event date
    if (new Date(event.start_time) < new Date())
      return res.status(400).json({ message: "Cannot register for past events" });

    // Check if full
    if (event.registrations.length >= event.capacity)
      return res.status(400).json({ message: "Event is full" });

    // Check duplicate registration
    const existing = await prisma.registration.findUnique({
      where: { user_id_event_id: { user_id, event_id } },
    });
    if (existing)
      return res.status(400).json({ message: "Already registered" });

    const reg = await prisma.registration.create({
      data: { user_id, event_id },
    });

    res.status(201).json({ message: "Registration successful", reg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    const existing = await prisma.registration.findUnique({
      where: { user_id_event_id: { user_id, event_id } },
    });

    if (!existing)
      return res.status(400).json({ message: "User not registered for this event" });

    await prisma.registration.delete({
      where: { user_id_event_id: { user_id, event_id } },
    });

    res.status(200).json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: { start_time: { gt: now } },
    });

    // Custom sorting
    events.sort((a, b) => {
      if (a.start_time.getTime() === b.start_time.getTime()) {
        return a.location.localeCompare(b.location);
      }
      return a.start_time - b.start_time;
    });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const eventStats = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { registrations: true },
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    const total = event.registrations.length;
    const remaining = event.capacity - total;
    const usedPercentage = ((total / event.capacity) * 100).toFixed(2);

    res.status(200).json({
      totalRegistrations: total,
      remainingCapacity: remaining,
      percentageUsed: usedPercentage + "%",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
