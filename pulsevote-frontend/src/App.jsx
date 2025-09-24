import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import HomePage from "./pages/HomePage"; // must exist
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage"; 
import DashboardPage from "./pages/DashboardPage"; 
import LogoutPage from "./pages/LogoutPage"; 
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
