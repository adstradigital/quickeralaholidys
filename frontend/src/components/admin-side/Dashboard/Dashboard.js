"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserFriends,
  FaServicestack,
  FaEnvelope,
  FaImages,
  FaCar,
  FaBlog,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
  FaUmbrellaBeach,
  FaWater,
  FaTree,
} from "react-icons/fa";
import UserManagement from "../UserManagement/UserManagement";
import ServicesManagement from "../ServicesManagement/ServicesManagement";
import EnquiryManagement from "../list_enquiries/list_enquiries";
import PageContentEditor from "../PageContentEdit/PageContentEdit";

export default function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (!token) {
      router.push("/quick-userlogin");
    } else {
      setUserRole(role || "admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    router.push("/quick-userlogin");
  };

  if (!userRole) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #0a5047 0%, #1a7a6d 50%, #34a793 100%)"
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status"></div>
          <p className="text-white">Loading Kerala Holidays...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { key: "overview", label: "Dashboard Overview", icon: <FaChartLine /> },
    { key: "users", label: "User Management", icon: <FaUserFriends /> },
    { key: "services", label: "Services & Packages", icon: <FaServicestack /> },
    { key: "enquiries", label: "Customer Enquiries", icon: <FaEnvelope /> },
    { key: "pages", label: "Content Editor", icon: <FaImages /> },
    // { key: "vehicles", label: "Transport", icon: <FaCar /> },
    // { key: "blogs", label: "Travel Blogs", icon: <FaBlog /> },
  ];

  const stats = [
    { label: "Total Bookings", value: "1,247", color: "#0a5047", icon: "📅" },
    { label: "Enquiries", value: "356", color: "#1a7a6d", icon: "📧" },
    { label: "Active Packages", value: "28", color: "#34a793", icon: "🎯" },
    { label: "Revenue", value: "₹8.2L", color: "#ff9a3c", icon: "💰" },
  ];

  return (
    <div className="d-flex vh-100" style={{ background: "#f8f9fa" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column text-white shadow-lg transition-all"
        style={{
          width: sidebarCollapsed ? "80px" : "280px",
          backgroundColor: "#0a5047",
          background: "linear-gradient(180deg, #0a5047 0%, #1a7a6d 100%)",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 1000
        }}
      >
        {/* Header */}
        <div className="p-4 text-center border-bottom border-light border-opacity-25">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <button
              className="btn btn-sm text-white p-1"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>
          
          {!sidebarCollapsed && (
            <>
              <div className="mb-3">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #ff9a3c, #ff6b6b)",
                    fontSize: "24px"
                  }}
                >
                  🌴
                </div>
              </div>
              <h5 className="fw-bold mb-1">Quick Kerala Holidays</h5>
              <small className="text-light opacity-75">Admin Dashboard</small>
              <div className="mt-2">
                <span className="badge bg-warning text-dark">Premium</span>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <ul className="nav flex-column mt-3 px-3 flex-grow-1">
          {menuItems.map((item) => (
            <li className="nav-item mb-2" key={item.key}>
              <button
                className={`btn w-100 text-start d-flex align-items-center ${
                  activePage === item.key
                    ? "btn-light text-dark fw-bold shadow"
                    : "btn-outline-light text-white bg-transparent"
                }`}
                style={{ 
                  borderRadius: "12px", 
                  transition: "all 0.3s ease",
                  padding: "12px 15px",
                  border: activePage === item.key ? "none" : "1px solid rgba(255,255,255,0.2)"
                }}
                onClick={() => setActivePage(item.key)}
              >
                <span className={`${sidebarCollapsed ? '' : 'me-3'}`} style={{ fontSize: "16px" }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="p-3 border-top border-light border-opacity-25">
          {!sidebarCollapsed && (
            <div className="text-center mb-3">
              <div className="d-flex justify-content-center gap-2 mb-2">
                <span style={{ fontSize: "14px", opacity: 0.7 }}>🛶</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>🐘</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>🌊</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>🌴</span>
              </div>
              <small className="text-light opacity-75">God's Own Country</small>
            </div>
          )}
          <button
            className="btn btn-danger w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2"
            onClick={handleLogout}
            style={{ borderRadius: "10px" }}
          >
            <FaSignOutAlt /> {!sidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light overflow-auto" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
        {/* Header */}
        <div className="bg-white shadow-sm border-bottom">
          <div className="d-flex justify-content-between align-items-center p-4">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#0a5047" }}>
                {activePage === "overview" ? "Dashboard Overview" : 
                 menuItems.find((m) => m.key === activePage)?.label}
              </h2>
              <p className="text-muted mb-0">
                {activePage === "overview" 
                  ? "Welcome to Kerala Holidays Admin Panel 🎉" 
                  : `Manage ${menuItems.find((m) => m.key === activePage)?.label.toLowerCase()}`}
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="fw-semibold" style={{ color: "#0a5047" }}>Admin User</div>
                <small className="text-muted">Kerala Holidays</small>
              </div>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "45px",
                  height: "45px",
                  background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
                  color: "white",
                  fontSize: "18px"
                }}
              >
                👑
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {activePage === "overview" && (
            <div>
              {/* Stats Cards */}
              <div className="row mb-5">
                {stats.map((stat, index) => (
                  <div key={index} className="col-xl-3 col-md-6 mb-4">
                    <div 
                      className="card border-0 shadow-sm h-100"
                      style={{ 
                        borderRadius: "15px",
                        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                        borderLeft: `4px solid ${stat.color}`
                      }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              background: `${stat.color}15`,
                              fontSize: "20px"
                            }}
                          >
                            {stat.icon}
                          </div>
                          <div>
                            <h4 className="fw-bold mb-0" style={{ color: stat.color }}>
                              {stat.value}
                            </h4>
                            <small className="text-muted">{stat.label}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Welcome Section */}
              <div className="row">
                <div className="col-12">
                  <div 
                    className="card border-0 text-white overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #0a5047 0%, #1a7a6d 50%, #34a793 100%)",
                      borderRadius: "20px"
                    }}
                  >
                    <div className="card-body p-5">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h3 className="fw-bold mb-3">Welcome to Kerala Holidays! 🌴</h3>
                          <p className="mb-4 opacity-90">
                            Manage your tourism services, track bookings, and create amazing experiences 
                            for travelers exploring God's Own Country. Start by exploring the different 
                            sections in the sidebar.
                          </p>
                          <button 
                            className="btn btn-light fw-bold px-4"
                            style={{ color: "#0a5047" }}
                            onClick={() => setActivePage("services")}
                          >
                            Explore Services →
                          </button>
                        </div>
                        <div className="col-md-4 text-center">
                          <div style={{ fontSize: "120px", opacity: 0.8 }}>
                            🛶
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Component Renderers */}
          {activePage === "users" && <UserManagement activePage={activePage} />}
          {activePage === "services" && <ServicesManagement activePage={activePage} />}
          {activePage === "enquiries" && <EnquiryManagement activePage={activePage} />}
          {activePage === "pages" && <PageContentEditor activePage={activePage} />}

          {activePage !== "users" && activePage !== "overview" && 
           activePage !== "services" && activePage !== "enquiries" && activePage !== "pages" && (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5 text-center">
                <div style={{ fontSize: "80px", marginBottom: "20px", opacity: 0.7 }}>🌊</div>
                <h4 style={{ color: "#0a5047" }}>Coming Soon</h4>
                <p className="text-muted">
                  This section is under development. Check back later for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}