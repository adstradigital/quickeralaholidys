"use client";

import { useState, useEffect } from "react";
import API from "../../../api/axios";
import './list_enquiries.css';

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await API.get("tourism/enquiries/");
      if (response.data.status === "success") {
        setEnquiries(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await API.patch(
        `tourism/enquiries/${id}/update_status/`,
        { status }
      );

      if (response.data.status === "success") {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === id ? { ...e, status: status } : e
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    if (filter === "all") return true;
    return enquiry.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved": return "✅";
      case "Rejected": return "❌";
      default: return "⏳";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "#10B981";
      case "Rejected": return "#EF4444";
      default: return "#F59E0B";
    }
  };

  const getServiceIcon = (service) => {
    const serviceLower = service?.toLowerCase() || "";
    if (serviceLower.includes('houseboat')) return '🚤';
    if (serviceLower.includes('ayurveda')) return '🧘‍♂️';
    if (serviceLower.includes('wildlife')) return '🐘';
    if (serviceLower.includes('beach')) return '🏖️';
    if (serviceLower.includes('mountain')) return '⛰️';
    if (serviceLower.includes('cultural')) return '🏛️';
    return '🎯';
  };

  if (loading) {
    return (
      <div className="enquiry-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading enquiries...</p>
          <div className="floating-elements">
            <div className="floating-element">🌴</div>
            <div className="floating-element">🚤</div>
            <div className="floating-element">🐘</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-management">
      {/* Header Section */}
      <div className="enquiry-header">
        <div className="header-content">
          <div className="header-icon">📋</div>
          <div className="header-text">
            <h1>Travel Enquiries</h1>
            <p>Manage customer requests for Kerala adventures</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon">📥</div>
            <div className="stat-info">
              <span className="stat-number">{enquiries.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-number">
                {enquiries.filter(e => !e.status || e.status === "Pending").length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">
                {enquiries.filter(e => e.status === "Approved").length}
              </span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Enquiries
          </button>
          <button 
            className={`filter-tab ${filter === "Pending" ? "active" : ""}`}
            onClick={() => setFilter("Pending")}
          >
            ⏳ Pending
          </button>
          <button 
            className={`filter-tab ${filter === "Approved" ? "active" : ""}`}
            onClick={() => setFilter("Approved")}
          >
            ✅ Approved
          </button>
          <button 
            className={`filter-tab ${filter === "Rejected" ? "active" : ""}`}
            onClick={() => setFilter("Rejected")}
          >
            ❌ Rejected
          </button>
        </div>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search enquiries..." 
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Enquiries Grid */}
      {filteredEnquiries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No enquiries found</h3>
          <p>There are no enquiries matching your current filter.</p>
        </div>
      ) : (
        <div className="enquiries-grid">
          {filteredEnquiries.map((enquiry, index) => (
            <div key={enquiry.id} className="enquiry-card">
              <div className="card-header">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {enquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="customer-details">
                    <h4>{enquiry.name}</h4>
                    <p>{enquiry.email}</p>
                  </div>
                </div>
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(enquiry.status) }}
                >
                  {getStatusIcon(enquiry.status)} {enquiry.status || "Pending"}
                </div>
              </div>

              <div className="card-body">
                <div className="enquiry-details">
                  <div className="detail-item">
                    <span className="detail-icon">📱</span>
                    <span>{enquiry.phone || "Not provided"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">{getServiceIcon(enquiry.service)}</span>
                    <span>{enquiry.service || "General Enquiry"}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-icon">💬</span>
                    <span className="message-text">{enquiry.message}</span>
                  </div>
                </div>

                <div className="enquiry-meta">
                  <span className="meta-item">#{enquiry.id}</span>
                  <span className="meta-item">📅 Recently</span>
                </div>
              </div>

              <div className="card-actions">
                {(!enquiry.status || enquiry.status === "Pending") && (
                  <>
                    <button
                      className="action-btn confirm-btn"
                      onClick={() => handleStatusChange(enquiry.id, "Approved")}
                    >
                      <span>✅</span>
                      Confirm Booking
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => handleStatusChange(enquiry.id, "Rejected")}
                    >
                      <span>❌</span>
                      Decline
                    </button>
                  </>
                )}
                
                {enquiry.status === "Approved" && (
                  <button className="action-btn approved-btn" disabled>
                    <span>✅</span>
                    Booking Confirmed
                  </button>
                )}
                
                {enquiry.status === "Rejected" && (
                  <button className="action-btn rejected-btn" disabled>
                    <span>❌</span>
                    Booking Declined
                  </button>
                )}

                <button 
                  className="action-btn details-btn"
                  onClick={() => setSelectedEnquiry(enquiry)}
                >
                  <span>👁️</span>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Enquiry Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Name</label>
                    <p>{selectedEnquiry.name}</p>
                  </div>
                  <div className="detail-field">
                    <label>Email</label>
                    <p>{selectedEnquiry.email}</p>
                  </div>
                  <div className="detail-field">
                    <label>Phone</label>
                    <p>{selectedEnquiry.phone || "Not provided"}</p>
                  </div>
                  <div className="detail-field">
                    <label>Service</label>
                    <p>{selectedEnquiry.service || "General Enquiry"}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Message</h3>
                <div className="message-box">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="detail-section">
                <h3>Current Status</h3>
                <div 
                  className="status-display"
                  style={{ backgroundColor: getStatusColor(selectedEnquiry.status) }}
                >
                  {getStatusIcon(selectedEnquiry.status)} 
                  {selectedEnquiry.status || "Pending"}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              {(!selectedEnquiry.status || selectedEnquiry.status === "Pending") && (
                <>
                  <button
                    className="modal-btn confirm-btn"
                    onClick={() => {
                      handleStatusChange(selectedEnquiry.id, "Approved");
                      setSelectedEnquiry(null);
                    }}
                  >
                    ✅ Confirm Booking
                  </button>
                  <button
                    className="modal-btn reject-btn"
                    onClick={() => {
                      handleStatusChange(selectedEnquiry.id, "Rejected");
                      setSelectedEnquiry(null);
                    }}
                  >
                    ❌ Decline Booking
                  </button>
                </>
              )}
              <button 
                className="modal-btn secondary-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Elements */}
      <div className="background-elements">
        <div className="bg-element palm">🌴</div>
        <div className="bg-element boat">🚤</div>
        <div className="bg-element elephant">🐘</div>
        <div className="bg-element temple">🛕</div>
      </div>
    </div>
  );
} 