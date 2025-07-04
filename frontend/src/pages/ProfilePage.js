import React, { useState, useEffect, useContext } from 'react';
import { fetchUserProfile, updateUserProfile } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile()
        .then(({ data }) => {
          setFormData({ name: data.name, email: data.email, password: '' });
        })
        .catch(() => setMsg('Failed to load profile'));
    }
  }, [user]);

  if (!user) {
    logout();
    return <div>Please login to view profile.</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await updateUserProfile(formData);
      setMsg('Profile updated');
      // Optionally update context with new info if changed email or name
      login({ ...user, name: formData.name, email: formData.email });
    } catch {
      setMsg('Failed to update profile');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>My Profile</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Name:</label><br />
          <input value={formData.name} required onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Email:</label><br />
          <input type="email" value={formData.email} required onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password: (leave blank if no change)</label><br />
          <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button style={{ marginTop: 10 }} type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;