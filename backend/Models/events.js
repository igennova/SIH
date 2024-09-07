const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  event_name: { type: String, required: true },
  organization_name: { type: String, required: true },
  place: { type: String, required: true },
  timing: { type: Date, required: true },
  image_url: { type: String, required: false } // Add image URL field
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

//https://ibb.co/bXG34Xm