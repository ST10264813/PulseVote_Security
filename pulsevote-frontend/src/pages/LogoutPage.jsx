// src/pages/LogoutPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout
    logout();
    
    // Redirect to home page after a brief delay
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="page-container">
      <div className="logout-container">
        <h2>Logging you out...</h2>
        <p>You have been successfully logged out.</p>
        <p>Redirecting to home page...</p>
        <div className="loading-spinner">Goodbye!</div>
      </div>
    </div>
  );
}