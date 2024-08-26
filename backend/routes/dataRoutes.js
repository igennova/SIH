const express = require('express');
const router = express.Router();
const Folder = require('../Models/signLangaugeData'); // Adjust the path to your Mongoose model

// Get all sign language data
router.get('/data', async (req, res) => {
  try {
    const folders = await Folder.find(); // Fetch all documents from the collection

    // Check if data is fetched
    if (!folders.length) {
      return res.status(404).json({ message: 'No folders found.' });
    }

    // Transform data to match the expected format
    const transformedData = folders.map((folder, index) => [
      folder.id,    // Serial number (if applicable)
      folder.label, // Folder name
      folder.link   // Google Drive link
    ]);

    res.json(transformedData); // Send data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' }); // Handle any errors
  }
});

module.exports = router;
