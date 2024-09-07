import React, { useState } from 'react';
import axios from 'axios';
import { videoroute } from '../../utils/Apiroutes';

function VideotoText() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file upload change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      // Post the video file to the backend
      const response = await axios.post(videoroute, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscript(response.data.transcription);
    } catch (error) {
      console.error("Error uploading the file", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Video Transcription</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Transcribing...' : 'Upload and Transcribe'}
        </button>
      </form>

      {transcript && (
        <div>
          <h2>Transcription</h2>
          <pre>{transcript}</pre>
        </div>
      )}
    </div>
  );
}

export default VideotoText;
