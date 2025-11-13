"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./BookingListing.css";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load token AFTER hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("auth_token");
      setToken(t);
    }
  }, []);

  // ------------------------------
  // ✅ FIX: These functions MUST be here,
  // OUTSIDE useEffect so JSX can access them
  // ------------------------------

  async function handleConfirm(id) {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/package/bookings/${id}/confirm/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
      );
    } catch (err) {
      console.error("Error confirming booking:", err);
    }
  }

  async function handleReject(id) {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/package/bookings/${id}/reject/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b))
      );
    } catch (err) {
      console.error("Error rejecting booking:", err);
    }
  }

  // ------------------------------
  // Fetch bookings when token exists
  // ------------------------------

  useEffect(() => {
    if (!token) return;

    async function fetchBookings() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/package/bookings/list/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [token]);

  // ------------------------------
  // UI
  // ------------------------------

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="bookings-card">
      <h3 className="bookings-title">All Bookings</h3>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Package</th>
              <th>Traveler Name</th>
              <th>Dates</th>
              <th>Total Amt</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user || "Guest"}</td>
                <td>{b.package_name || b.custom_destination}</td>
                <td>{b.full_name}</td>
                <td>
                  {b.start_date} → {b.end_date}
                </td>
                <td>₹{b.total_amount}</td>
                <td>{new Date(b.created_at).toLocaleDateString()}</td>

                <td>
                  {b.status === "confirmed" ? (
                    <span className="status-badge status-confirmed">
                      Confirmed
                    </span>
                  ) : b.status === "rejected" ? (
                    <span className="status-badge status-rejected">
                      Rejected
                    </span>
                  ) : (
                    <>
                      <button
                        className="btn-confirm"
                        onClick={() => handleConfirm(b.id)}
                      >
                        Confirm
                      </button>

                      <button
                        className="btn-reject"
                        onClick={() => handleReject(b.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
