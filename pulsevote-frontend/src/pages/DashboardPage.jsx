// src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Add authorization header
      const token = localStorage.getItem('token');
      const response = await api.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load dashboard data';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.email}!</p>
      </div>

      {error && <div className="message error">{error}</div>}

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile Information</h3>
            <div className="profile-info">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Account Statistics</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Login Count:</span>
                <span className="stat-value">{data?.loginCount || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Login:</span>
                <span className="stat-value">
                  {data?.lastLogin ? new Date(data.lastLogin).toLocaleString() : 'Now'}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="actions">
              <button className="btn btn-primary">Update Profile</button>
              <button className="btn btn-secondary">Change Password</button>
              <button className="btn btn-secondary">Download Data</button>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {data?.recentActivity?.length > 0 ? (
                data.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p>No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}