import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Folder, Video, X, Play } from 'lucide-react'

function Library(){
  const [folders, setFolders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { folderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize folders
    const folderData = [
      // { name: "All Dictionary Videos", id: "1U-Pr4r1-cupgNOOq9NH_uTsQnPSVEKco" },
      { name: "Numbers", id: "1QBiSSz2zyV0CvaPRZo4V2jkn8FI2-jsT" },
      { name: "A", id: "1nkI7lddegUWDvmGsmn68QkB5ikp5_3kt" },
      { name: "B", id: "1S-G5qoWth0aI9fLzKs8Myv2LyMrq8jUh" },
      { name: "C", id: "1iZvUpDh5gtzoRmQKWAVfCOe8iWEjzS2S" },
      { name: "D", id: "1aQywSGpfHXOdM1pfs2rfqU3Y_ScLXRjh" },
      { name: "E", id: "13pJC91P8ligEXJh7ZcVbdOdBv8OM7ugw" },
      { name: "F", id: "1uwjIG-hYqxYTURtWMEpmCc9NzV13uz-S" },
      { name: "G", id: "1_jxELuDPMQb67NM6woqcdcn5QWd2mVeC" },
      { name: "H", id: "1BL9C7zyFAcRQg-DsM-CiIjsoFMbSvTCt" },
      { name: "I", id: "1K6eUYZLdCRh21Ecxx9wcsAJ3HP7jd4CI" },
      { name: "J", id: "198cCQXlwdAwmxabGVvXMZKQ-lnDclO37" },
      { name: "K", id: "1rXKlSTKyWJNqDL6-lupJuufMUZW7Zunc" },
      { name: "L", id: "1MbKLv9fBdLUPE4-PrSbSGBCnudtuKRTg" },
      { name: "M", id: "1qDHOYx4Eijrgo3cZHucMIlPRKgcK__8Z" },
      { name: "N", id: "1UUeBYdHraz86n9wgJG2HR4-gfMuO6o8e" },
      { name: "O", id: "1FZVV2snPZAR9_Zcy-XEo15cKgcVbMiUM" },
      { name: "P", id: "1hR6GnLjEj8_I5UPDJg3ZE0oQDzCnzXFy" },
      { name: "Q", id: "1Q6BYTJRyUElN6XCKrU9RXW2YzHGICPUA" },
      { name: "R", id: "1Zkr_CW-PmeGFjmJRmjA-lYubIVnFyb7o" },
      { name: "S", id: "1EQaicx76vWxgQwSosFQcAbrzgePEwPYN" },
      { name: "T", id: "1QcM74V2Q4OGRzDhZrP_ULHd5W4XgzmPw" },
      { name: "U", id: "1g9DxvHVMcoID1PhbvR8kJ5Mhq921hDcM" },
      { name: "V", id: "1hdhswMEW2FbBhi4GPgYsTBrhThpuSoNK" },
      { name: "W", id: "1JMWkAryDQ074isVeD0_umJfFHOhb3f6t" },
      { name: "X", id: "1t4mOWrTel2OXS76RX7b9X2Gf-6MqmrFp" },
      { name: "Y", id: "1wiWGUBD_R_KobXRAE3Erpp7XUZrUuYNb" },
      { name: "Z", id: "1cTyPjYRqrBTG2cEHQNXd4oRGkp9HtY4M" },
      { name: "EVS", id: "1A1T72ZbXaNJAKBZmwJtU0nQpIZAIYdeC" }
    ];

    setFolders(folderData);
  }, []);

  useEffect(() => {
    if (folderId) {
      function start() {
        gapi.client.init({
          apiKey: 'AIzaSyBeouPJ4-oDgniLe2BWoiBhgAoHD2CvFuA',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        }).then(() => {
          return gapi.client.drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(id, name, mimeType)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
          });
        }).then(response => {
          const files = response.result.files;
          const videoFiles = files.filter(file => file.mimeType.includes('video'));
          setVideos(videoFiles);
        }).catch(error => {
          console.error("Error fetching videos:", error);
        });
      }

      gapi.load('client', start);
    }
  }, [folderId]);

  const handleFolderClick = (folderId) => {
    navigate(`/folder/${folderId}`);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">ISL Dictionary</h1>
        <p className="text-indigo-600">Explore and learn Indian Sign Language</p>
      </header>

      {!folderId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {folders.map(folder => (
            <motion.div
              key={folder.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFolderClick(folder.id)}
              className="bg-white rounded-xl p-6 cursor-pointer transition-all hover:shadow-xl"
            >
              <Folder className="w-12 h-12 text-indigo-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 break-words">{folder.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      )}

      {folderId && videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-800">Videos in Folder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map(video => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVideoClick(video)}
                className="bg-white rounded-xl p-6 cursor-pointer transition-all hover:shadow-xl flex flex-col items-center justify-center"
              >
                <Video className="w-12 h-12 text-indigo-500 mb-4" />
                <h5 className="text-lg font-semibold text-gray-800 text-center break-words mb-2">{video.name.slice(0, -4)}</h5>
                <p className="text-indigo-600 flex items-center">
                  <Play className="w-4 h-4 mr-1" /> Play Video
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl p-8 h-auto relative max-w-4xl w-full mx-4"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Now Playing: {selectedVideo.name}</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[30rem] rounded-lg shadow-lg"
                src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.name}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Library;