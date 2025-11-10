"use client";

import { useEffect, useState } from "react";
import API from "../../../api/axios";

export default function PageContentEditor() {
  const [pageName, setPageName] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const BASE_URL = "http://127.0.0.1:8000";

  const PAGE_OPTIONS = [
    { value: "home", label: "🏠 Home", color: "#3b82f6" },
    { value: "about", label: "ℹ️ About", color: "#10b981" },
    { value: "services", label: "🎯 Services", color: "#f59e0b" },
    { value: "contact", label: "📞 Contact", color: "#ef4444" },
    { value: "enquiry", label: "📝 Enquiry", color: "#8b5cf6" },
    { value: "testimonials", label: "⭐ Testimonials", color: "#ec4899" },
    { value: "dashboard", label: "📊 Dashboard", color: "#64748b" },
  ];

  // Fetch page content whenever pageName changes
  useEffect(() => {
    if (!pageName) return;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/pages/page/${pageName}/`);
        if (res.data.status === "success") {
          const content = res.data.data.content || {};
          const arr = Object.entries(content).map(([key, val]) => ({
            key,
            type: val.type || "text",
            value: val.value || val,
          }));
          setFields(arr);
        } else {
          setFields([]);
        }
      } catch (err) {
        console.error(err);
        setFields([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  const handleFieldChange = (index, value) => {
    const updated = [...fields];
    updated[index].value = value;
    setFields(updated);
  };

  const handleTypeChange = (index, type) => {
    const updated = [...fields];
    updated[index].type = type;
    setFields(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...fields];
    updated[index].value = file;
    setFields(updated);
  };

  const addField = () => setFields([...fields, { key: "", type: "text", value: "" }]);
  
  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleSave = async () => {
    if (!pageName) {
      alert("Please select a page first");
      return;
    }

    try {
      setSaving(true);
      const data = { content: {} };

      fields.forEach((f) => {
        if (f.type === "image" && f.value instanceof File) {
          data.content[f.key] = { type: "image", value: f.value };
        } else {
          data.content[f.key] = { type: f.type, value: f.value };
        }
      });

      const formData = new FormData();
      formData.append("content", JSON.stringify(data.content));

      fields.forEach((f) => {
        if (f.type === "image" && f.value instanceof File) {
          formData.append(f.key, f.value);
        }
      });

      await API.post(`/pages/page/${pageName}/update/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Page content updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update page content");
    } finally {
      setSaving(false);
    }
  };

  const getPageColor = () => {
    const page = PAGE_OPTIONS.find(p => p.value === pageName);
    return page ? page.color : "#3b82f6";
  };

  return (
    <div className="page-editor-container">
      {/* Header */}
      <div className="editor-header">
        <div className="header-content">
          <h1>Quick Kerala Holidays</h1>
          <p>Content Management System</p>
        </div>
        <div className="header-decoration">
          <div className="decoration-item">🌴</div>
          <div className="decoration-item">🏞️</div>
          <div className="decoration-item">🚤</div>
        </div>
      </div>

      <div className="editor-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>📄 Page Selection</h3>
            <div className="page-options">
              {PAGE_OPTIONS.map((page) => (
                <button
                  key={page.value}
                  className={`page-option ${pageName === page.value ? "active" : ""}`}
                  onClick={() => setPageName(page.value)}
                  style={{
                    borderLeftColor: page.color,
                    background: pageName === page.value ? `${page.color}15` : "transparent"
                  }}
                >
                  <span className="page-icon">{page.label.split(" ")[0]}</span>
                  <span className="page-label">{page.label.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>⚡ Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn" onClick={addField}>
                <span>➕</span>
                Add Field
              </button>
              <button 
                className="action-btn primary" 
                onClick={handleSave} 
                disabled={saving || !pageName}
              >
                <span>{saving ? "⏳" : "💾"}</span>
                {saving ? "Saving..." : "Save Page"}
              </button>
            </div>
          </div>

          {pageName && (
            <div className="sidebar-section">
              <h3>📊 Page Info</h3>
              <div className="page-info">
                <div className="info-item">
                  <span>Selected:</span>
                  <strong>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</strong>
                </div>
                <div className="info-item">
                  <span>Fields:</span>
                  <strong>{fields.length}</strong>
                </div>
                <div className="info-item">
                  <span>Status:</span>
                  <span className={`status ${fields.length > 0 ? "active" : "inactive"}`}>
                    {fields.length > 0 ? "📝 Configured" : "⚪ Empty"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {!pageName ? (
            <div className="welcome-screen">
              <div className="welcome-icon">🏝️</div>
              <h2>Welcome to Quick Kerala CMS</h2>
              <p>Select a page from the sidebar to start editing content</p>
              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h4>Easy Editing</h4>
                  <p>Simple and intuitive content management</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🖼️</div>
                  <h4>Media Support</h4>
                  <p>Upload images and manage media files</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h4>Quick Updates</h4>
                  <p>Real-time preview and instant saves</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-area">
              {/* Page Header */}
              <div className="page-header" style={{ borderLeftColor: getPageColor() }}>
                <div className="page-title">
                  <h2>{pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h2>
                  <p>Manage your {pageName} page content and media</p>
                </div>
                <div className="page-stats">
                  <div className="stat">
                    <span className="stat-number">{fields.length}</span>
                    <span className="stat-label">Fields</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {fields.filter(f => f.type === 'image').length}
                    </span>
                    <span className="stat-label">Images</span>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading {pageName} content...</p>
                </div>
              ) : (
                <>
                  {/* Content Fields */}
                  <div className="fields-container">
                    {fields.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">📄</div>
                        <h3>No Content Fields</h3>
                        <p>Start by adding your first content field</p>
                        <button className="btn-primary" onClick={addField}>
                          ➕ Add First Field
                        </button>
                      </div>
                    ) : (
                      fields.map((field, idx) => (
                        <div className="field-card" key={idx}>
                          <div className="field-header">
                            <div className="field-controls">
                              <input
                                type="text"
                                placeholder="Field key (e.g., hero_title, banner_image)"
                                className="key-input"
                                value={field.key}
                                onChange={(e) => {
                                  const updated = [...fields];
                                  updated[idx].key = e.target.value;
                                  setFields(updated);
                                }}
                              />
                              <select
                                className="type-select"
                                value={field.type}
                                onChange={(e) => handleTypeChange(idx, e.target.value)}
                              >
                                <option value="text">📝 Text</option>
                                <option value="textarea">📄 Textarea</option>
                                <option value="image">🖼️ Image</option>
                              </select>
                              <button 
                                className="delete-btn"
                                onClick={() => removeField(idx)}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>

                          <div className="field-content">
                            {field.type === "text" && (
                              <input
                                type="text"
                                className="text-input"
                                placeholder="Enter text content..."
                                value={field.value}
                                onChange={(e) => handleFieldChange(idx, e.target.value)}
                              />
                            )}
                            {field.type === "textarea" && (
                              <textarea
                                className="textarea-input"
                                placeholder="Enter longer text content..."
                                rows={4}
                                value={field.value}
                                onChange={(e) => handleFieldChange(idx, e.target.value)}
                              />
                            )}
                            {field.type === "image" && (
                              <div className="image-upload">
                                <input
                                  type="file"
                                  className="file-input"
                                  onChange={(e) => handleFileChange(idx, e.target.files[0])}
                                />
                                {field.value && typeof field.value === "string" && (
                                  <div className="image-preview">
                                    <img
                                      src={`${BASE_URL}${field.value}`}
                                      alt={field.key}
                                    />
                                    <span className="preview-label">Current Image</span>
                                  </div>
                                )}
                                {field.value instanceof File && (
                                  <div className="image-preview">
                                    <img
                                      src={URL.createObjectURL(field.value)}
                                      alt={field.key}
                                    />
                                    <span className="preview-label">New Image</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="btn-secondary" onClick={addField}>
                      ➕ Add New Field
                    </button>
                    <button 
                      className="btn-primary" 
                      onClick={handleSave} 
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          💾 Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-editor-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .editor-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-content p {
          margin: 4px 0 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .header-decoration {
          display: flex;
          gap: 10px;
        }

        .decoration-item {
          font-size: 24px;
          opacity: 0.7;
        }

        .editor-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          height: calc(100vh - 80px);
        }

        .sidebar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-right: 1px solid #e2e8f0;
          overflow-y: auto;
        }

        .sidebar-section {
          margin-bottom: 30px;
        }

        .sidebar-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .page-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .page-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-left: 4px solid;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }

        .page-option:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .page-option.active {
          background: #f8fafc;
          border-color: #3b82f6;
        }

        .page-icon {
          font-size: 18px;
        }

        .page-label {
          font-weight: 500;
          color: #374151;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .action-btn:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .action-btn.primary {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .action-btn.primary:hover {
          background: #2563eb;
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .page-info {
          background: #f8fafc;
          border-radius: 8px;
          padding: 16px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .status.active {
          color: #10b981;
          font-weight: 500;
        }

        .status.inactive {
          color: #64748b;
        }

        .main-content {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          overflow-y: auto;
        }

        .welcome-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 40px;
        }

        .welcome-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .welcome-screen h2 {
          font-size: 32px;
          margin-bottom: 12px;
          color: #1a1a1a;
        }

        .welcome-screen p {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 40px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 600px;
        }

        .feature-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .feature-card h4 {
          margin: 0 0 8px 0;
          color: #1a1a1a;
        }

        .feature-card p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .content-area {
          padding: 30px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-left: 20px;
          border-left: 4px solid;
        }

        .page-title h2 {
          margin: 0 0 4px 0;
          color: #1a1a1a;
        }

        .page-title p {
          margin: 0;
          color: #64748b;
        }

        .page-stats {
          display: flex;
          gap: 20px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #3b82f6;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-left: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .fields-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border: 2px dashed #e2e8f0;
          border-radius: 12px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .empty-state p {
          margin: 0 0 20px 0;
          color: #64748b;
        }

        .field-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .field-header {
          background: #f8fafc;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .field-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .key-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .type-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          font-size: 14px;
          min-width: 120px;
        }

        .delete-btn {
          padding: 8px 12px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .field-content {
          padding: 20px;
        }

        .text-input, .textarea-input, .file-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .textarea-input {
          resize: vertical;
          min-height: 80px;
        }

        .image-upload {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .image-preview {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .image-preview img {
          max-width: 200px;
          max-height: 150px;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
        }

        .preview-label {
          font-size: 12px;
          color: #64748b;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #f8fafc;
          color: #374151;
          border: 1px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f1f5f9;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-left: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}