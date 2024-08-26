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
      { name: "Z", id: "1cTyPjYRqrBTG2cEHQNXd4oRGkp9HtY4M" }
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
    // Navigate to the folder route
    navigate(`/folder/${folderId}`);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      {!folderId && (
        <>
          <h1>Google Drive Folders</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {folders.map(folder => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                style={{
                  border: '2px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  width: '200px',
                  textAlign: 'center',
                }}
              >
                <h4>{folder.name}</h4>
                <p>Click to Open</p>
              </div>
            ))}
          </div>
        </>
      )}

      {folderId && videos.length > 0 && (
        <div>
          <h2>Videos in Folder</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {videos.map(video => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                style={{
                  border: '2px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  width: '200px',
                  textAlign: 'center',
                }}
              >
                <h5>{video.name.slice(0, -4)}</h5>
                <p>Click to Play</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedVideo && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button onClick={handleCloseModal} style={modalStyles.closeButton}>X</button>
            <h2>Now Playing: {selectedVideo.name}</h2>
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

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '30px',
  },
};

export default Video;
