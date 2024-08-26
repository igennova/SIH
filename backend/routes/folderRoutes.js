const express = require('express');
const axios = require('axios'); // If you need to make HTTP requests
const router = express.Router();

// Function to extract folder ID from Google Drive link
const extractFolderIdFromLink = (link) => {
  const matches = link.match(/folders\/(.*)/);
  return matches ? matches[1] : '';
};

// Fetch contents from a folder link
router.get('/folder-contents', async (req, res) => {
  const { folderLink } = req.query;
  
  if (!folderLink) {
    return res.status(400).json({ message: 'Folder link is required.' });
  }

  try {
    const folderId = extractFolderIdFromLink(folderLink);
    const driveApiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=AIzaSyBeouPJ4-oDgniLe2BWoiBhgAoHD2CvFuA`; // Replace with your API key

    const response = await axios.get(driveApiUrl);
    const contents = response.data; // Modify as needed based on Google Drive API response

    res.json(contents); // Send folder contents as JSON response
  } catch (err) {
    console.error('Error fetching folder contents:', err);
    res.status(500).json({ message: 'Failed to fetch folder contents.' });
  }
});

module.exports = router;
