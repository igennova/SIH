const express = require('express');
const multer = require('multer');
const transcriptionController = require('../controller/videototext');

const router = express.Router();

// Configure multer to handle video file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle video file upload and transcription
router.post('/videos', upload.single('file'), transcriptionController.transcribeVideo);

module.exports = router;
