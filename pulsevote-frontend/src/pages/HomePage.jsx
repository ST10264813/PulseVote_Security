// src/pages/HomePage.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to My App</h1>
        {isAuthenticated ? (
          <div>
            <p>Hello, {user?.email}! Welcome back.</p>
            <div className="cta-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p>Your awesome application description goes here.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Your data is protected with industry-standard security measures.</p>
          </div>
          <div className="feature-card">
            <h3>User Dashboard</h3>
            <p>Manage your account and access personalized features.</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface designed for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}