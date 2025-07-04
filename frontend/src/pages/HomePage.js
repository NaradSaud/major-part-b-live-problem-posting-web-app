import React, { useEffect, useState } from 'react';
import { fetchProblems } from '../api/problemApi';

const HomePage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const { data } = await fetchProblems();
        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch problems');
      }
      setLoading(false);
    };
    loadProblems();
  }, []);

  if (loading) return <div>Loading problems...</div>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Reported Problems Feed</h2>
      {problems.length === 0 ? <p>No problems reported yet.</p> : null}
      {problems.map(prob => (
        <div key={prob._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p>Name: {prob.user?.name}</p>
          <p>Email: {prob.user?.email}</p>
          <p>Status: <strong>{prob.status}</strong></p>
          <p>Description: {prob.description || 'No description'}</p>
          <div>
            <img 
              src={`http://localhost:5000/uploads/${prob.photoUrl}`} 
              alt="problem" 
              style={{ maxWidth: '100%', maxHeight: '300px' }} 
            />
          </div>
          <p>Location: lat {prob.location.lat.toFixed(4)}, lng {prob.location.lng.toFixed(4)}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;