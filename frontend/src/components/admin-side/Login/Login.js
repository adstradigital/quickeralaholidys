"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("users/users/signin/", { username, password });
      localStorage.setItem("auth_token", res.data.access);
      console.log(res.data.access);
      router.push("/quick-dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0a5047 0%, #1a7a6d 50%, #34a793 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, #ff9a3c 0%, transparent 70%)",
          opacity: 0.3,
          borderRadius: "50%"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, #4facfe 0%, transparent 70%)",
          opacity: 0.2,
          borderRadius: "50%"
        }}
      />
      
      {/* Coconut tree silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "10%",
          fontSize: "120px",
          opacity: 0.1
        }}
      >
        🌴
      </div>

      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "420px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Kerala-themed header */}
        <div className="text-center mb-4">
          <div
            style={{
              background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
              borderRadius: "15px",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <img
              src="/assets/rushi-name-logo.png"
              alt="Kerala Tourism"
              style={{ height: "45px", filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <span style={{ color: "#0a5047", fontSize: "12px", fontWeight: "bold" }}>
              God's Own Country
            </span>
          </div>
        </div>

        <h3 className="text-center mb-3 fw-bold" style={{ color: "#0a5047" }}>
          Welcome to Kerala
        </h3>
        <p className="text-center mb-4" style={{ color: "#666", fontSize: "14px" }}>
          Sign in to explore the beauty of <b style={{ color: "#0a5047" }}>God's Own Country</b>
        </p>

        {error && (
          <div
            className="alert alert-danger text-center py-2 border-0"
            style={{
              background: "rgba(220, 53, 69, 0.1)",
              color: "#dc3545",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#0a5047", fontSize: "14px" }}>
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <span style={{ color: "#1a7a6d" }}>📧</span>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  borderColor: "#dee2e6",
                  borderRadius: "8px"
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#0a5047", fontSize: "14px" }}>
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <span style={{ color: "#1a7a6d" }}>🔒</span>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderColor: "#dee2e6",
                  borderRadius: "8px"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 border-0 fw-bold"
            style={{
              background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(10, 80, 71, 0.3)"
            }}
            disabled={loading}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(10, 80, 71, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(10, 80, 71, 0.3)";
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Exploring Kerala...
              </>
            ) : (
              <>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer with Kerala elements */}
        <div className="text-center">
          <div className="d-flex justify-content-center gap-3 mb-2">
            <span style={{ fontSize: "20px", opacity: 0.7 }}>🛶</span>
            <span style={{ fontSize: "20px", opacity: 0.7 }}>🐘</span>
            <span style={{ fontSize: "20px", opacity: 0.7 }}>🌊</span>
            <span style={{ fontSize: "20px", opacity: 0.7 }}>🌴</span>
          </div>
          <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>
            Experience the magic of backwaters, beaches, and culture
          </p>
        </div>
      </div>
    </div>
  );
}