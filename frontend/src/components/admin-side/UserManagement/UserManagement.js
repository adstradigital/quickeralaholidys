"use client";

import { useState, useEffect } from "react";
import API from "../../../api/axios";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaUserPlus, FaSearch, FaFilter, FaUserShield, FaUser } from "react-icons/fa";

export default function UserManagement({ activePage }) {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_admin: false,
  });

  // Fetch users when Users page is active
  useEffect(() => {
    if (activePage === "users") {
      fetchUsers();
    }
  }, [activePage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users/users/");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        await API.put(`/users/users/update/${editingUser.id}/`, formData);
      } else {
        await API.post("/users/users/create/", formData);
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData({ username: "", email: "", password: "", is_admin: false });
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      is_admin: user.is_admin,
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleStatus = async (user) => {
    try {
      const updatedStatus = !user.is_active;
      await API.patch(`/users/users/toggle-status/${user.id}/`, {
        is_active: updatedStatus,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/users/delete/${userId}/`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || 
                       (roleFilter === "admin" && user.is_admin) ||
                       (roleFilter === "employee" && !user.is_admin);
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "active" && user.is_active) ||
                         (statusFilter === "inactive" && !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    admin: users.filter(user => user.is_admin).length,
    employee: users.filter(user => !user.is_admin).length,
    active: users.filter(user => user.is_active).length,
  };

  if (activePage !== "users") return null;

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-2" style={{ color: "#0a5047" }}>User Management</h3>
          <p className="text-muted mb-0">Manage admin and employee accounts for Kerala Holidays</p>
        </div>
        <button
          className="btn fw-bold d-flex align-items-center gap-2"
          onClick={() => setShowForm(true)}
          style={{
            background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
            color: "white",
            borderRadius: "10px",
            padding: "10px 20px"
          }}
        >
          <FaUserPlus /> Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #0a5047" }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px", background: "#0a504715", color: "#0a5047" }}>
                  <FaUser />
                </div>
                <div>
                  <h4 className="fw-bold mb-0" style={{ color: "#0a5047" }}>{stats.total}</h4>
                  <small className="text-muted">Total Users</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #1a7a6d" }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px", background: "#1a7a6d15", color: "#1a7a6d" }}>
                  <FaUserShield />
                </div>
                <div>
                  <h4 className="fw-bold mb-0" style={{ color: "#1a7a6d" }}>{stats.admin}</h4>
                  <small className="text-muted">Admin Users</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #34a793" }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px", background: "#34a79315", color: "#34a793" }}>
                  👥
                </div>
                <div>
                  <h4 className="fw-bold mb-0" style={{ color: "#34a793" }}>{stats.employee}</h4>
                  <small className="text-muted">Employees</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #ff9a3c" }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px", background: "#ff9a3c15", color: "#ff9a3c" }}>
                  ✅
                </div>
                <div>
                  <h4 className="fw-bold mb-0" style={{ color: "#ff9a3c" }}>{stats.active}</h4>
                  <small className="text-muted">Active Users</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <FaSearch style={{ color: "#0a5047" }} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "15px" }}>
              <div className="modal-header border-0" style={{ 
                background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
                color: "white",
                borderRadius: "15px 15px 0 0"
              }}>
                <h5 className="modal-title fw-bold">
                  {editingUser ? "✏️ Edit User" : "👤 Add New User"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                    setFormData({ username: "", email: "", password: "", is_admin: false });
                  }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleFormChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password {editingUser && <small className="text-muted">(leave blank to keep current)</small>}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleFormChange}
                      required={!editingUser}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_admin"
                        checked={formData.is_admin}
                        onChange={handleFormChange}
                        style={{ transform: "scale(1.2)" }}
                      />
                      <label className="form-check-label fw-semibold">
                        Admin Privileges
                      </label>
                    </div>
                    <small className="text-muted">Toggle to give admin access</small>
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setShowForm(false);
                        setEditingUser(null);
                        setFormData({ username: "", email: "", password: "", is_admin: false });
                      }}
                      style={{ borderRadius: "8px" }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn fw-bold text-white"
                      disabled={loading}
                      style={{
                        background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
                        borderRadius: "8px",
                        minWidth: "100px"
                      }}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" />
                      ) : null}
                      {editingUser ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ 
                background: "linear-gradient(135deg, #0a5047, #1a7a6d)",
                color: "white"
              }}>
                <tr>
                  <th className="ps-4">User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="mt-2 text-muted">Loading users...</p>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id} style={{ borderLeft: user.is_active ? "4px solid #28a745" : "4px solid #dc3545" }}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: user.is_admin ? 
                                "linear-gradient(135deg, #0a5047, #1a7a6d)" : 
                                "linear-gradient(135deg, #34a793, #62c4b1)",
                              color: "white",
                              fontSize: "14px"
                            }}
                          >
                            {user.is_admin ? "A" : "E"}
                          </div>
                          <div>
                            <div className="fw-semibold">{user.username}</div>
                            <small className="text-muted">ID: {user.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span 
                          className={`badge ${
                            user.is_admin ? "bg-gradient-admin" : "bg-gradient-employee"
                          }`}
                          style={{
                            background: user.is_admin ? 
                              "linear-gradient(135deg, #0a5047, #1a7a6d)" : 
                              "linear-gradient(135deg, #34a793, #62c4b1)",
                            color: "white",
                            borderRadius: "20px",
                            padding: "6px 12px"
                          }}
                        >
                          {user.is_admin ? "👑 Admin" : "👥 Employee"}
                        </span>
                      </td>
                      <td>
                        <span 
                          className={`badge ${
                            user.is_active ? "bg-success" : "bg-danger"
                          }`}
                          style={{ borderRadius: "20px", padding: "6px 12px" }}
                        >
                          {user.is_active ? "🟢 Active" : "🔴 Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm d-flex align-items-center gap-1"
                            onClick={() => handleEdit(user)}
                            style={{
                              background: "rgba(255, 193, 7, 0.1)",
                              color: "#ffc107",
                              border: "1px solid #ffc107",
                              borderRadius: "6px"
                            }}
                          >
                            <FaEdit size={12} /> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            onClick={() => handleDelete(user.id)}
                            style={{ borderRadius: "6px" }}
                          >
                            <FaTrash size={12} /> Delete
                          </button>
                          <button
                            className={`btn btn-sm d-flex align-items-center gap-1 ${
                              user.is_active ? "btn-outline-danger" : "btn-outline-success"
                            }`}
                            onClick={() => handleToggleStatus(user)}
                            style={{ borderRadius: "6px" }}
                          >
                            {user.is_active ? <FaToggleOff size={12} /> : <FaToggleOn size={12} />}
                            {user.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div style={{ fontSize: "48px", opacity: 0.5 }}>👥</div>
                      <p className="text-muted mt-2">No users found</p>
                      {searchTerm || roleFilter !== "all" || statusFilter !== "all" ? (
                        <button 
                          className="btn btn-outline-primary mt-2"
                          onClick={() => {
                            setSearchTerm("");
                            setRoleFilter("all");
                            setStatusFilter("all");
                          }}
                        >
                          Clear filters
                        </button>
                      ) : (
                        <button 
                          className="btn btn-primary mt-2"
                          onClick={() => setShowForm(true)}
                        >
                          Add First User
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}