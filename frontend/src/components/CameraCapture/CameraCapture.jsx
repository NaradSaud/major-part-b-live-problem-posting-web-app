import React, { useState, useRef } from 'react';
import useCamera from '../../hooks/useCamera';

const CameraCapture = ({ onCapture }) => {
  const { videoRef, takePhoto } = useCamera();
  const [photoDataUrl, setPhotoDataUrl] = useState(null);

  const captureHandler = () => {
    const photo = takePhoto();
    if (photo) {
      setPhotoDataUrl(photo);
      if (onCapture) onCapture(photo);
    }
  };

  const retakeHandler = () => {
    setPhotoDataUrl(null);
  };

  return (
    <div style={{textAlign:'center'}}>
      {!photoDataUrl ? (
        <>
          <video ref={videoRef} autoPlay style={{width:'100%', maxWidth:'400px'}} />
          <button onClick={captureHandler}>Capture Photo</button>
        </>
      ) : (
        <>
          <img src={photoDataUrl} alt="captured" style={{width:'100%', maxWidth:'400px'}} />
          <div>
            <button onClick={retakeHandler}>Retake</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;