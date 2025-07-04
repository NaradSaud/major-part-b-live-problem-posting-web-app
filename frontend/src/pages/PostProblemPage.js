import React, { useState, useEffect, useContext } from 'react';
import CameraCapture from '../components/CameraCapture/CameraCapture';
import MapPicker from '../components/Map/MapPicker';
import useGeoLocation from '../hooks/useGeoLocation';
import { postProblem } from '../api/problemApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostProblemPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const geoLocation = useGeoLocation();

  useEffect(() => {
    if (geoLocation.lat && geoLocation.lng) {
      setLocation({ lat: geoLocation.lat, lng: geoLocation.lng });
    }
  }, [geoLocation.lat, geoLocation.lng]);

  const handleCapture = (dataUrl) => {
    setPhotoPreview(dataUrl);
    // Convert dataURL to file object
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        setPhotoFile(file);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!photoFile) return setError('Photo is required.');
    if (!location.lat || !location.lng) return setError('Location is required.');

    setError(null);
    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('lat', location.lat);
    formData.append('lng', location.lng);
    formData.append('description', description);

    try {
      await postProblem(formData);
      alert('Problem posted successfully');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post problem');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Post a Problem</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CameraCapture onCapture={handleCapture} />
      <div style={{ marginTop: 10 }}>
        <label>Description (optional):</label><br />
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Select Location (or tap map to change):</label>
        <MapPicker location={location} setLocation={setLocation} />
      </div>
      <button onClick={submitHandler} style={{ marginTop: 10 }}>Submit Problem</button>
    </div>
  );
};

export default PostProblemPage;