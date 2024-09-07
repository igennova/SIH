import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useParams, useNavigate } from 'react-router-dom';

function Video() {
  const [folders, setFolders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { folderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize folders
    const folderData = [
      // { name: "All Dictionary Videos", id: "1U-Pr4r1-cupgNOOq9NH_uTsQnPSVEKco" },
      {name:"Numbers", id:"1QBiSSz2zyV0CvaPRZo4V2jkn8FI2-jsT"},
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
      {name:"EVS",id:"1A1T72ZbXaNJAKBZmwJtU0nQpIZAIYdeC"}
      // ... other folders
    ];
    
    setFolders(folderData);
  }, []);

  useEffect(() => {
    if (folderId) {
      function start() {
        gapi.client.init({
          apiKey: 'AIzaSyBeouPJ4-oDgniLe2BWoiBhgAoHD2CvFuA',  // Replace with your API key
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
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {!folderId && (
        <>
          <h1 className="text-20xl text-center font-bold mb-6">ISL DICTIONARY</h1>
          <div className="flex flex-wrap gap-10">
            {folders.map(folder => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition w-64 h-40 flex flex-col justify-center items-center"
              >
                <h4 className="text-3xl font-semibold text-center break-words">{folder.name}</h4>
              </div>
            ))}
          </div>
        </>
      )}

      {folderId && videos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Videos in Folder</h2>
          <div className="flex flex-wrap gap-10">
            {videos.map(video => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition w-64 h-40 flex flex-col justify-center items-center"
              >
                <h5 className="text-lg font-semibold text-center break-words">{video.name.slice(0, -4)}</h5>
                <p className="mt-2">Click to Play</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Now Playing: {selectedVideo.name}</h2>
            <iframe
              width="640"
              height="480"
              src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={selectedVideo.name}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;