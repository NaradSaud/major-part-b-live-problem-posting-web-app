import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import PostProblemPage from '../pages/PostProblemPage';
import AdminDashboard from '../pages/AdminDashboard';
import { AuthContext } from '../context/AuthContext';

const AppRouter = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        {user && <Link to="/post" style={{ marginRight: 10 }}>Post Problem</Link>}
        {user && <Link to="/profile" style={{ marginRight: 10 }}>Profile</Link>}
        {user && user.isAdmin && <Link to="/admin" style={{ marginRight: 10 }}>Admin Dashboard</Link>}
        {user ? (
          <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={user ? <PostProblemPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRouter;