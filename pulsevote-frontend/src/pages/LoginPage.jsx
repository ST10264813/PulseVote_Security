// src/pages/LoginPage.jsx
import { useLocation } from 'react-router-dom';
import Login from '../components/Login';

export default function LoginPage() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="page-container">
      {message && (
        <div className="message info">{message}</div>
      )}
      <Login />
    </div>
  );
}