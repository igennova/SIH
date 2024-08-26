const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  id: String,    // Serial number or identifier
  label: String, // Folder name
  link: String   // Google Drive link
});

module.exports = mongoose.model('signLamguageData', folderSchema);
