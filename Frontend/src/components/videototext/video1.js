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
    <div className="min-h-screen flex bg-zinc-900 text-white">
      <div className="p-8 rounded-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-500">Video Transcription</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full px-4 py-2 text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold 
                        ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Transcribing...' : 'Upload and Transcribe'}
          </button>
        </form>

        {transcript && (
          <div className="mt-8 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">Transcription</h2>
            <pre className="whitespace-pre-wrap text-gray-300">{transcript}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideotoText;
