const { spawn } = require('child_process');
const fs = require('fs');
const { createClient } = require('@deepgram/sdk');
const ffmpegStatic = require('ffmpeg-static');

// Initialize Deepgram SDK with your API key
const deepgram = createClient('56163d7b5b63a0f3df8188fa8048883444e34a60');

// Helper function to run FFMPEG using spawn
async function runFfmpeg(inputFilePath, outputWavPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegStatic, ['-i', inputFilePath, '-ar', '16000', '-ac', '1', outputWavPath]);

    ffmpeg.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`ffmpeg process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });
  });
}

// Controller function to handle transcription
exports.transcribeVideo = async (req, res) => {
  const videoFile = req.file;
  const outputWavFile = 'output.wav';

  if (!videoFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Convert MP4 to WAV using FFMPEG
    await runFfmpeg(videoFile.path, outputWavFile);

    // Read the WAV file
    const audioFileBuffer = fs.readFileSync(outputWavFile);

    // Transcribe using Deepgram
    const response = await deepgram.listen.prerecorded.transcribeFile(
      audioFileBuffer,
      {
        model: 'nova-2',
        punctuate: true,
      }
    );

    // Log the entire response for debugging
    // console.log('Deepgram response:', response);

    // Extract transcript from the response
    if (response.result && response.result.results && response.result.results.channels && response.result.results.channels.length > 0) {
      const channel = response.result.results.channels[0];
      if (channel && channel.alternatives && channel.alternatives.length > 0) {
        const transcript = channel.alternatives[0].transcript;
        return res.json({ transcription: transcript });
      } else {
        return res.status(500).json({ error: 'No alternatives found in transcription result' });
      }
    } else {
      return res.status(500).json({ error: 'Transcription result not found or is incomplete' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during transcription' });
  } finally {
    // Clean up the temporary files
    if (fs.existsSync(videoFile.path)) {
      fs.unlinkSync(videoFile.path);
    }
    if (fs.existsSync(outputWavFile)) {
      fs.unlinkSync(outputWavFile);
    }
  }
};
