import React, { useState, useContext } from 'react';
import { registerUser } from '../../api/authApi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'auto', padding:20}}>
      <h2>Register</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} type="text" required />
        </div>
        <div style={{marginTop:10}}>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div style={{marginTop:10}}>
          <label>Password</label><br />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <button style={{marginTop:10}} type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;