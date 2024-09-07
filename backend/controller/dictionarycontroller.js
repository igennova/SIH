// pages/api/fetchVideos.js
import axios from 'axios';

export default async function handler(req, res) {
  const { folderId } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/drive/v3/files`, {
      params: {
        q: `'${folderId}' in parents`,
        key: "AIzaSyBeouPJ4-oDgniLe2BWoiBhgAoHD2CvFuA", // Ensure this is set in your environment variables
        fields: 'files(id, name, mimeType)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      }
    });
    res.status(200).json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching videos', error: error.response?.data || error.message });
  }
}
