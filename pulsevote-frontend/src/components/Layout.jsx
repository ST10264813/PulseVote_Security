// src/components/Layout.jsx
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const token = localStorage.getItem("token");

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>{" | "}
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>{" | "}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>{" | "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <hr />
      <main>{children}</main>
    </div>
  );
}
