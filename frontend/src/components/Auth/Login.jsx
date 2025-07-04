import React, { useState, useContext } from 'react';
import { loginUser } from '../../api/authApi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'auto', padding:20}}>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div style={{marginTop:10}}>
          <label>Password</label><br />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <button style={{marginTop:10}} type="submit">Login</button>
      </form>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;