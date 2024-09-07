const Event = require('../Models/events'); // Import your event model

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events); // Send the events as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id); // Find an event by ID
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event); // Send the event as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const { event_name, organization_name, place, timing } = req.body;

  try {
    const newEvent = new Event({
      event_name,
      organization_name,
      place,
      timing
    });
    const savedEvent = await newEvent.save(); // Save the event to the database
    res.status(201).json(savedEvent); // Send the newly created event as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};

// Update an existing event by ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { event_name, organization_name, place, timing } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      event_name,
      organization_name,
      place,
      timing
    }, { new: true }); // Update the event and return the updated document

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent); // Send the updated event as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id); // Delete the event by ID

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' }); // Send a success message
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error });
  }
};
