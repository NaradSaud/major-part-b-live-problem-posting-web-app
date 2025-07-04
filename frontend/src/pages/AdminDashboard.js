import React, { useContext, useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../api/adminApi';
import { fetchProblems, updateProblemStatus } from '../api/problemApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    async function loadData() {
      try {
        const userRes = await fetchUsers();
        setUsers(userRes.data);
        const problemRes = await fetchProblems();
        setProblems(problemRes.data);
      } catch (err) {
        setError('Unable to load admin data');
      }
    }
    loadData();
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  const updateUserHandler = async (id, isAdmin) => {
    try {
      await updateUser(id, { isAdmin });
      setUsers(users.map(u => u._id === id ? { ...u, isAdmin } : u));
    } catch {
      alert('Update failed');
    }
  };

  const deleteUserHandler = async (id) => {
    if (!window.confirm('Confirm delete user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  const updateStatusHandler = async (id, status) => {
    try {
      await updateProblemStatus(id, status);
      setProblems(problems.map(p => p._id === id ? { ...p, status } : p));
    } catch {
      alert('Failed to update problem status');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: 'auto' }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h3>Users Management</h3>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Admin</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={u.isAdmin}
                    onChange={(e) => updateUserHandler(u._id, e.target.checked)}
                  />
                </td>
                <td>
                  <button onClick={() => deleteUserHandler(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h3>Problems Management</h3>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>User</th><th>Description</th><th>Status</th><th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(p => (
              <tr key={p._id}>
                <td>{p.user?.name} ({p.user?.email})</td>
                <td>{p.description || 'No description'}</td>
                <td>{p.status}</td>
                <td>
                  <select 
                    value={p.status} 
                    onChange={(e) => updateStatusHandler(p._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Solved">Solved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default AdminDashboard;