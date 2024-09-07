const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventcontroller'); // Adjust the path according to your project structure

// Define routes for event operations

// Get all events
router.get('/events', eventController.getAllEvents);

// Get a specific event by ID
router.get('/events/:id', eventController.getEventById);

// Create a new event
router.post('/events', eventController.createEvent);

// Update an existing event by ID
router.put('/events/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
