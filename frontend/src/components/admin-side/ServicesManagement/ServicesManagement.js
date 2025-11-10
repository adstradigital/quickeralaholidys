"use client";

import { useEffect, useState } from "react";
import { 
  FaEdit, FaTrash, FaPlus, FaImage, FaTags, FaList, 
  FaSave, FaTimes, FaKey, FaSearch, 
  FaFilter, FaEye, FaStar, FaMapMarkerAlt, FaFolder,
  FaBox, FaLayerGroup, FaUmbrellaBeach, FaWater,
  FaTree, FaMountain, FaHotel, FaDollarSign  // ← Replaced FaValue with FaDollarSign
} from "react-icons/fa";
import API from "../../../api/axios"

export default function ServicesManagement({ activePage }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("services");
  
  const [serviceFormData, setServiceFormData] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    image: null,
    images: [],
    custom_fields: [],
  });

  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState({ main: null, others: [] });
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000";

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           service.category_data?.id?.toString() === selectedCategory ||
                           service.category?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch services & categories
  useEffect(() => {
    if (activePage === "services") {
      fetchServices();
      fetchCategories();
    }
  }, [activePage]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tourism/services/");
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/tourism/categories/");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  // Service Form handling
  const handleServiceFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setServiceFormData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview((prev) => ({ ...prev, main: URL.createObjectURL(files[0]) }));
    } else {
      setServiceFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomFieldChange = (index, key, value) => {
    const updated = [...serviceFormData.custom_fields];
    updated[index][key] = value;
    setServiceFormData((prev) => ({ ...prev, custom_fields: updated }));
  };

  const addCustomField = () => {
    setServiceFormData((prev) => ({
      ...prev,
      custom_fields: [...prev.custom_fields, { key: "", value: "" }],
    }));
  };

  const removeCustomField = (index) => {
    const updated = [...serviceFormData.custom_fields];
    updated.splice(index, 1);
    setServiceFormData((prev) => ({ ...prev, custom_fields: updated }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", serviceFormData.title);
    data.append("description", serviceFormData.description);
    data.append("category", serviceFormData.category);

    if (serviceFormData.image) data.append("image", serviceFormData.image);
    if (serviceFormData.images.length > 0) {
      serviceFormData.images.forEach((file) => data.append("images", file));
    }
    if (serviceFormData.custom_fields.length > 0)
      data.append("custom_fields", JSON.stringify(serviceFormData.custom_fields));

    try {
      let response;
      if (serviceFormData.id) {
        response = await API.patch(`/tourism/services/update/${serviceFormData.id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("/tourism/services/create/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchServices();
        resetServiceForm();
        alert(serviceFormData.id ? "Tour Package updated successfully!" : "Tour Package created successfully!");
      }
    } catch (error) {
      console.error("Error submitting service:", error.response?.data || error.message);
      alert("Error saving package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceEdit = (service) => {
    let fields = [];

    if (service.custom_fields) {
      if (Array.isArray(service.custom_fields)) fields = service.custom_fields;
      else if (typeof service.custom_fields === "object")
        fields = Object.entries(service.custom_fields).map(([key, value]) => ({ key, value }));
    }

    setServiceFormData({
      id: service.id,
      title: service.title,
      description: service.description,
      category: service.category_data?.id || service.category,
      image: null,
      images: [],
      custom_fields: fields,
    });

    setImagePreview({
      main: service.image ? `${BASE_URL}${service.image}` : null,
      others: service.images || [],
    });

    setShowServiceForm(true);
  };

  const resetServiceForm = () => {
    setShowServiceForm(false);
    setServiceFormData({
      id: null,
      title: "",
      description: "",
      category: "",
      image: null,
      images: [],
      custom_fields: [],
    });
    setImagePreview({ main: null, others: [] });
  };

  const handleServiceDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tour package?")) return;
    try {
      setLoading(true);
      await API.delete(`/tourism/services/delete/${id}/`);
      fetchServices();
      alert("Tour Package deleted successfully!");
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Error deleting package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Category Form handling
  const handleCategoryFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setCategoryFormData((prev) => ({ ...prev, image: files[0] }));
      setCategoryImagePreview(URL.createObjectURL(files[0]));
    } else {
      setCategoryFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", categoryFormData.name);
    data.append("description", categoryFormData.description);
    if (categoryFormData.image) data.append("image", categoryFormData.image);

    try {
      let response;
      if (categoryFormData.id) {
        response = await API.patch(`/tourism/categories/update/${categoryFormData.id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("/tourism/categories/create/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchCategories();
        resetCategoryForm();
        alert(categoryFormData.id ? "Category updated successfully!" : "Category created successfully!");
      }
    } catch (error) {
      console.error("Error submitting category:", error.response?.data || error.message);
      alert("Error saving category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryEdit = (category) => {
    setCategoryFormData({
      id: category.id,
      name: category.name,
      description: category.description || "",
      image: null,
    });

    setCategoryImagePreview(category.image ? `${BASE_URL}${category.image}` : null);
    setShowCategoryForm(true);
  };

  const resetCategoryForm = () => {
    setShowCategoryForm(false);
    setCategoryFormData({
      id: null,
      name: "",
      description: "",
      image: null,
    });
    setCategoryImagePreview(null);
  };

  const handleCategoryDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category? Tour packages in this category will be affected.")) return;
    try {
      setLoading(true);
      await API.delete(`/tourism/categories/delete/${id}/`);
      fetchCategories();
      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Error deleting category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Kerala tourism icons for categories
  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('houseboat') || name.includes('backwater')) return '🛶';
    if (name.includes('beach')) return '🏖️';
    if (name.includes('hill') || name.includes('mountain')) return '⛰️';
    if (name.includes('wildlife') || name.includes('animal')) return '🐘';
    if (name.includes('ayurveda') || name.includes('spa')) return '💆';
    if (name.includes('culture') || name.includes('heritage')) return '🏛️';
    if (name.includes('adventure')) return '🚵';
    if (name.includes('hotel') || name.includes('resort')) return '🏨';
    return '🌴';
  };

  if (activePage !== "services") return null;

  return (
    <div className="services-management">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Kerala Holiday Packages</h1>
          <p className="page-description">
            Manage your tour packages and categories for God's Own Country
          </p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <div className="stat-number">{services.length}</div>
            <div className="stat-label">Tour Packages</div>
          </div>
          <div className="stat">
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-number">{filteredServices.length}</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <FaUmbrellaBeach />
          Tour Packages
        </button>
        <button 
          className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          <FaLayerGroup />
          Package Categories
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === "services" && (
        <>
          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="add-btn" onClick={() => setShowServiceForm(true)}>
              <FaPlus />
              Add New Package
            </button>
          </div>

          {/* Services Grid */}
          <div className="services-grid-container">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Loading Kerala Packages...</p>
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="services-grid">
                {filteredServices.map((service) => (
                  <div className="service-card" key={service.id}>
                    <div className="service-image">
                      {service.image ? (
                        <img
                          src={`${BASE_URL}${service.image}`}
                          alt={service.title}
                          className="service-img"
                        />
                      ) : (
                        <div className="no-image">
                          <FaImage className="no-image-icon" />
                          <span>No Image</span>
                        </div>
                      )}
                      <div className="service-badge">
                        {getCategoryIcon(service.category_data?.name)} {service.category_data?.name || "Package"}
                      </div>
                      <div className="service-overlay">
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleServiceEdit(service)}
                            title="Edit Package"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleServiceDelete(service.id)}
                            title="Delete Package"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="service-content">
                      <h4 className="service-title">{service.title}</h4>
                      <p className="service-description">
                        {service.description?.length > 120 
                          ? `${service.description.substring(0, 120)}...` 
                          : service.description || "Explore the beauty of Kerala"
                        }
                      </p>
                      
                      <div className="service-meta">
                        <span className="category-tag">
                          {service.category_data?.name || "Kerala Tour"}
                        </span>
                        {service.custom_fields && service.custom_fields.length > 0 && (
                          <span className="fields-badge">
                            {service.custom_fields.length} details
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration">
                  <div className="empty-icon">🏝️</div>
                </div>
                <h3>No Packages Found</h3>
                <p>Create amazing Kerala holiday experiences for your customers</p>
                <button className="add-btn primary" onClick={() => setShowServiceForm(true)}>
                  <FaPlus />
                  Create First Package
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <>
          <div className="categories-header">
            <button className="add-btn" onClick={() => setShowCategoryForm(true)}>
              <FaPlus />
              Add New Category
            </button>
          </div>

          <div className="categories-grid-container">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Loading categories...</p>
              </div>
            ) : categories.length > 0 ? (
              <div className="categories-grid">
                {categories.map((category) => (
                  <div className="category-card" key={category.id}>
                    <div className="category-image">
                      {category.image ? (
                        <img
                          src={`${BASE_URL}${category.image}`}
                          alt={category.name}
                          className="category-img"
                        />
                      ) : (
                        <div className="no-image">
                          <div className="category-icon-large">
                            {getCategoryIcon(category.name)}
                          </div>
                          <span>No Image</span>
                        </div>
                      )}
                      <div className="category-overlay">
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleCategoryEdit(category)}
                            title="Edit Category"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleCategoryDelete(category.id)}
                            title="Delete Category"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="category-content">
                      <div className="category-header">
                        <div className="category-icon">
                          {getCategoryIcon(category.name)}
                        </div>
                        <h4 className="category-name">{category.name}</h4>
                      </div>
                      <p className="category-description">
                        {category.description || "Kerala tourism experiences"}
                      </p>
                      <div className="category-stats">
                        <span className="services-count">
                          {category.services_count || 0} packages
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration">
                  <div className="empty-icon">📂</div>
                </div>
                <h3>No Categories Found</h3>
                <p>Organize your Kerala packages into categories</p>
                <button className="add-btn primary" onClick={() => setShowCategoryForm(true)}>
                  <FaPlus />
                  Create First Category
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="modal-header">
              <div className="modal-title-section">
                <h3>{serviceFormData.id ? "Edit Package" : "Create Kerala Package"}</h3>
                <p>{serviceFormData.id ? "Update your package details" : "Design an amazing Kerala holiday experience"}</p>
              </div>
              <button className="close-btn" onClick={resetServiceForm}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="service-form">
              <div className="form-grid">
                {/* Basic Information */}
                <div className="form-section">
                  <h4 className="section-title">
                    <div className="section-title-icon">
                      <FaList />
                    </div>
                    Package Details
                  </h4>
                  
                  <div className="form-group">
                    <label className="form-label">Package Title *</label>
                    <input
                      type="text"
                      name="title"
                      className="form-input"
                      value={serviceFormData.title}
                      onChange={handleServiceFormChange}
                      placeholder="e.g., Backwater Houseboat Experience"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      className="form-textarea"
                      value={serviceFormData.description}
                      onChange={handleServiceFormChange}
                      rows={4}
                      placeholder="Describe this amazing Kerala experience..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={serviceFormData.category}
                      onChange={handleServiceFormChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Media Section */}
                <div className="form-section">
                  <h4 className="section-title">
                    <div className="section-title-icon">
                      <FaImage />
                    </div>
                    Package Images
                  </h4>

                  <div className="form-group">
                    <label className="form-label">Featured Image</label>
                    <div 
                      className="image-upload-area"
                      onClick={() => document.getElementById('main-image-input').click()}
                    >
                      <input
                        id="main-image-input"
                        type="file"
                        name="image"
                        className="file-input"
                        onChange={handleServiceFormChange}
                        accept="image/*"
                      />
                      {imagePreview.main ? (
                        <div className="image-preview">
                          <img src={imagePreview.main} alt="Main Preview" />
                          <div className="image-overlay">
                            <FaImage />
                            <span>Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <FaImage className="upload-icon" />
                          <span>Upload package image</span>
                          <small>Showcase Kerala's beauty</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="form-section full-width">
                  <h4 className="section-title">
                    <div className="section-title-icon">
                      <FaTags />
                    </div>
                    Package Details
                  </h4>

                  <div className="custom-fields-container">
                    {serviceFormData.custom_fields.map((field, idx) => (
                      <div className="custom-field-row" key={idx}>
                        <div className="field-input-group">
                          <div className="input-with-icon">
                            <FaKey className="input-icon" />
                            <input
                              type="text"
                              placeholder="Detail (e.g., Duration, Price, Inclusions)"
                              className="form-input"
                              value={field.key}
                              onChange={(e) => handleCustomFieldChange(idx, "key", e.target.value)}
                            />
                          </div>
                          <div className="input-with-icon">
                            <FaValue className="input-icon" />
                            <input
                              type="text"
                              placeholder="Value (e.g., 3 Days, ₹15,000, Breakfast)"
                              className="form-input"
                              value={field.value}
                              onChange={(e) => handleCustomFieldChange(idx, "value", e.target.value)}
                            />
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="remove-field-btn"
                          onClick={() => removeCustomField(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      className="add-field-btn"
                      onClick={addCustomField}
                    >
                      <FaPlus />
                      Add Package Detail
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetServiceForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      {serviceFormData.id ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {serviceFormData.id ? "Update Package" : "Create Package"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="modal-header">
              <div className="modal-title-section">
                <h3>{categoryFormData.id ? "Edit Category" : "Create Category"}</h3>
                <p>{categoryFormData.id ? "Update category details" : "Add a new package category"}</p>
              </div>
              <button className="close-btn" onClick={resetCategoryForm}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="category-form">
              <div className="form-section full-width">
                <h4 className="section-title">
                  <div className="section-title-icon">
                    <FaLayerGroup />
                  </div>
                  Category Information
                </h4>
                
                <div className="form-group">
                  <label className="form-label">Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={categoryFormData.name}
                    onChange={handleCategoryFormChange}
                    placeholder="e.g., Houseboat Tours, Beach Holidays"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={categoryFormData.description}
                    onChange={handleCategoryFormChange}
                    rows={3}
                    placeholder="Describe this category of Kerala experiences..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category Image</label>
                  <div 
                    className="image-upload-area"
                    onClick={() => document.getElementById('category-image-input').click()}
                  >
                    <input
                      id="category-image-input"
                      type="file"
                      name="image"
                      className="file-input"
                      onChange={handleCategoryFormChange}
                      accept="image/*"
                    />
                    {categoryImagePreview ? (
                      <div className="image-preview">
                        <img src={categoryImagePreview} alt="Category Preview" />
                        <div className="image-overlay">
                          <FaImage />
                          <span>Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <FaImage className="upload-icon" />
                        <span>Upload category image</span>
                        <small>Representative of Kerala tourism</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetCategoryForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      {categoryFormData.id ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {categoryFormData.id ? "Update Category" : "Create Category"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .services-management {
          padding: 2rem;
          background: linear-gradient(135deg, #f8fdfb 0%, #f0f9f6 100%);
          min-height: 100vh;
          position: relative;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Kerala Theme Colors */
        :root {
          --kerala-primary: #0a5047;
          --kerala-secondary: #1a7a6d;
          --kerala-accent: #34a793;
          --kerala-gold: #d4af37;
          --kerala-orange: #ff9a3c;
          --kerala-light: #f0f9f6;
          --kerala-white: #ffffff;
          --kerala-text: #2d3748;
          --kerala-text-light: #718096;
        }

        /* Header Styles */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          background: var(--kerala-white);
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(10, 80, 71, 0.08);
          border: 1px solid rgba(10, 80, 71, 0.08);
          position: relative;
          overflow: hidden;
        }

        .page-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--kerala-primary), var(--kerala-accent));
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 2.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.75rem 0;
          line-height: 1.2;
        }

        .page-description {
          color: var(--kerala-text-light);
          margin: 0;
          font-size: 1.15rem;
          max-width: 500px;
          line-height: 1.6;
          font-weight: 500;
        }

        .header-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat {
          text-align: center;
          padding: 1.75rem 1.25rem;
          background: linear-gradient(135deg, var(--kerala-white) 0%, var(--kerala-light) 100%);
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(10, 80, 71, 0.1);
          min-width: 140px;
          transition: all 0.3s ease;
          border: 1px solid rgba(10, 80, 71, 0.1);
          position: relative;
        }

        .stat::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--kerala-accent), var(--kerala-orange));
          border-radius: 20px 20px 0 0;
        }

        .stat:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(10, 80, 71, 0.15);
        }

        .stat-number {
          font-size: 2.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stat-label {
          color: var(--kerala-text-light);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Kerala Decoration */
        .kerala-decoration {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          gap: 0.75rem;
          opacity: 0.4;
          z-index: 1;
        }

        .decoration-item {
          font-size: 1.75rem;
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .decoration-item:nth-child(2) { animation-delay: 0.7s; }
        .decoration-item:nth-child(3) { animation-delay: 1.4s; }
        .decoration-item:nth-child(4) { animation-delay: 2.1s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          background: var(--kerala-white);
          padding: 1.25rem;
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(10, 80, 71, 0.08);
          border: 1px solid rgba(10, 80, 71, 0.08);
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2rem;
          border: none;
          border-radius: 16px;
          background: transparent;
          color: var(--kerala-text-light);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .tab-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }

        .tab-btn:hover::before {
          left: 100%;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          color: var(--kerala-white);
          box-shadow: 0 8px 25px rgba(10, 80, 71, 0.3);
          transform: translateY(-2px);
        }

        .tab-btn:hover:not(.active) {
          background: var(--kerala-light);
          color: var(--kerala-primary);
          transform: translateY(-2px);
        }

        /* Search and Filter Bar */
        .search-filter-bar {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 2.5rem;
          background: var(--kerala-white);
          padding: 1.75rem;
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(10, 80, 71, 0.08);
          border: 1px solid rgba(10, 80, 71, 0.08);
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 450px;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--kerala-accent);
          font-size: 1.1rem;
        }

        .search-input {
          width: 100%;
          padding: 1.25rem 1.25rem 1.25rem 3.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: var(--kerala-light);
          font-weight: 500;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--kerala-accent);
          background: var(--kerala-white);
          box-shadow: 0 0 0 4px rgba(52, 167, 147, 0.1);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--kerala-light);
          padding: 1rem 1.25rem;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .filter-group:focus-within {
          border-color: var(--kerala-accent);
          box-shadow: 0 0 0 3px rgba(52, 167, 147, 0.1);
        }

        .filter-icon {
          color: var(--kerala-accent);
          font-size: 1.1rem;
        }

        .category-filter {
          border: none;
          background: none;
          font-size: 0.95rem;
          color: var(--kerala-text);
          cursor: pointer;
          outline: none;
          font-weight: 500;
          min-width: 150px;
        }

        .add-btn {
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          color: var(--kerala-white);
          border: none;
          padding: 1.25rem 2.25rem;
          border-radius: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(10, 80, 71, 0.3);
          white-space: nowrap;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .add-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .add-btn:hover::before {
          left: 100%;
        }

        .add-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(10, 80, 71, 0.4);
        }

        .add-btn.primary {
          background: linear-gradient(135deg, var(--kerala-orange) 0%, #ff6b6b 100%);
          box-shadow: 0 8px 25px rgba(255, 154, 60, 0.3);
        }

        .add-btn.primary:hover {
          box-shadow: 0 12px 35px rgba(255, 154, 60, 0.4);
        }

        .categories-header {
          margin-bottom: 2rem;
        }

        /* Services Grid */
        .services-grid, .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2.5rem;
        }

        .service-card, .category-card {
          background: var(--kerala-white);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(10, 80, 71, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(10, 80, 71, 0.08);
          position: relative;
        }

        .service-card::before, .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--kerala-accent), var(--kerala-orange));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .service-card:hover::before, .category-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover, .category-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 60px rgba(10, 80, 71, 0.15);
        }

        .service-image, .category-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .service-img, .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .service-card:hover .service-img,
        .category-card:hover .category-img {
          transform: scale(1.15);
        }

        .service-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: linear-gradient(135deg, var(--kerala-orange) 0%, #ff6b6b 100%);
          color: var(--kerala-white);
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(255, 154, 60, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .no-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--kerala-light) 0%, #e6f7ed 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--kerala-accent);
          gap: 1.25rem;
        }

        .no-image-icon {
          font-size: 3rem;
          opacity: 0.6;
        }

        .category-icon-large {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .service-overlay, .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(10, 80, 71, 0.95) 0%, rgba(26, 122, 109, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .service-card:hover .service-overlay,
        .category-card:hover .category-overlay {
          opacity: 1;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          padding: 1rem;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--kerala-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
        }

        .action-btn:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .edit-btn:hover { 
          background: var(--kerala-secondary); 
          color: white; 
        }
        .delete-btn:hover { 
          background: #ef4444; 
          color: white; 
        }

        .service-content, .category-content {
          padding: 2rem;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .category-icon {
          font-size: 1.75rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .service-title, .category-name {
          color: var(--kerala-primary);
          margin: 0 0 1.25rem 0;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .service-description, .category-description {
          color: var(--kerala-text-light);
          margin: 0 0 1.5rem 0;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .service-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-tag, .services-count {
          background: rgba(52, 167, 147, 0.1);
          color: var(--kerala-secondary);
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(52, 167, 147, 0.2);
        }

        .fields-badge {
          background: rgba(123, 31, 162, 0.1);
          color: #7b1fa2;
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(123, 31, 162, 0.2);
        }

        /* Form Modal Styles */
        .form-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 80, 71, 0.9);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .form-modal {
          background: var(--kerala-white);
          border-radius: 28px;
          width: 100%;
          max-width: 850px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 40px 80px rgba(10, 80, 71, 0.4);
          border: 1px solid rgba(10, 80, 71, 0.2);
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 2.5rem 2.5rem 1.5rem;
          border-bottom: 1px solid rgba(10, 80, 71, 0.1);
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          color: white;
          border-radius: 28px 28px 0 0;
          position: relative;
          overflow: hidden;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .modal-title-section h3 {
          color: white;
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          font-weight: 700;
          position: relative;
        }

        .modal-title-section p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 1rem;
          position: relative;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          font-size: 1.3rem;
          color: white;
          cursor: pointer;
          padding: 0.85rem;
          border-radius: 14px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .service-form, .category-form {
          padding: 0 2.5rem 2.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .form-section {
          background: var(--kerala-light);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid rgba(10, 80, 71, 0.1);
          position: relative;
        }

        .form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--kerala-accent), var(--kerala-orange));
          border-radius: 20px 20px 0 0;
        }

        .form-section.full-width {
          grid-column: 1 / -1;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--kerala-primary);
          margin: 0 0 1.75rem 0;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .section-title-icon {
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          color: white;
          padding: 0.85rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(10, 80, 71, 0.2);
        }

        .form-group {
          margin-bottom: 1.75rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: var(--kerala-primary);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 1.25rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: var(--kerala-white);
          font-weight: 500;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--kerala-accent);
          background: var(--kerala-white);
          box-shadow: 0 0 0 4px rgba(52, 167, 147, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .image-upload-area {
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--kerala-white);
          position: relative;
          overflow: hidden;
        }

        .image-upload-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent, rgba(52, 167, 147, 0.02), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-upload-area:hover::before {
          opacity: 1;
        }

        .image-upload-area:hover {
          border-color: var(--kerala-accent);
          background: var(--kerala-light);
          transform: translateY(-2px);
        }

        .file-input {
          display: none;
        }

        .image-preview {
          position: relative;
          width: 100%;
          max-width: 220px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .image-preview img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 80, 71, 0.8);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .image-preview:hover .image-overlay {
          opacity: 1;
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--kerala-accent);
        }

        .upload-icon {
          font-size: 2.5rem;
          color: #cbd5e1;
        }

        .custom-fields-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .custom-field-row {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .field-input-group {
          display: flex;
          gap: 1.25rem;
          flex: 1;
        }

        .input-with-icon {
          position: relative;
          flex: 1;
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--kerala-accent);
          font-size: 1.1rem;
        }

        .input-with-icon .form-input {
          padding-left: 3rem;
        }

        .remove-field-btn {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-field-btn:hover {
          background: #dc2626;
          color: white;
          transform: scale(1.1);
        }

        .add-field-btn {
          background: var(--kerala-light);
          color: var(--kerala-accent);
          border: 2px dashed #cbd5e1;
          padding: 1rem 1.75rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          align-self: flex-start;
          font-weight: 600;
        }

        .add-field-btn:hover {
          background: var(--kerala-white);
          border-color: var(--kerala-primary);
          color: var(--kerala-primary);
          transform: translateY(-2px);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1.25rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(10, 80, 71, 0.1);
        }

        .cancel-btn {
          background: #64748b;
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #475569;
          transform: translateY(-2px);
        }

        .submit-btn {
          background: linear-gradient(135deg, var(--kerala-primary) 0%, var(--kerala-secondary) 100%);
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(10, 80, 71, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Loading and Empty States */
        .loading-state, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 3rem;
          background: var(--kerala-white);
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(10, 80, 71, 0.1);
          text-align: center;
          border: 1px solid rgba(10, 80, 71, 0.1);
          position: relative;
          overflow: hidden;
        }

        .loading-state::before, .empty-state::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--kerala-accent), var(--kerala-orange));
        }

        .spinner-large {
          width: 70px;
          height: 70px;
          border: 4px solid var(--kerala-light);
          border-top: 4px solid var(--kerala-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 2rem;
        }

        .empty-illustration {
          margin-bottom: 2rem;
        }

        .empty-icon {
          font-size: 5rem;
          opacity: 0.5;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.1));
        }

        .empty-state h3 {
          color: var(--kerala-primary);
          margin-bottom: 1.25rem;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .empty-state p {
          color: var(--kerala-text-light);
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 400px;
        }

        .spinner {
          width: 22px;
          height: 22px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .services-grid, .categories-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .services-management {
            padding: 1.5rem;
          }

          .page-header {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
            padding: 2rem;
          }

          .header-stats {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }

          .stat {
            min-width: 120px;
            flex: 1;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .search-filter-bar {
            flex-direction: column;
            gap: 1.25rem;
          }

          .search-box {
            max-width: 100%;
          }

          .form-modal-overlay {
            padding: 1rem;
          }

          .form-modal {
            max-height: 95vh;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .services-grid, .categories-grid {
            grid-template-columns: 1fr;
          }

          .field-input-group {
            flex-direction: column;
          }

          .form-actions {
            flex-direction: column;
          }

          .page-title {
            font-size: 2.25rem;
          }

          .kerala-decoration {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .services-management {
            padding: 1rem;
          }

          .page-header {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .stat {
            min-width: 100px;
            padding: 1.25rem 0.75rem;
          }

          .stat-number {
            font-size: 2.25rem;
          }

          .service-card, .category-card {
            margin: 0 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}