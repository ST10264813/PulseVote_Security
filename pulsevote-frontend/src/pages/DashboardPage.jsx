// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import api from "../api";

export default function DashboardPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Failed to load dashboard"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}
