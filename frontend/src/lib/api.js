import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tourismAPI = {
  // Destinations
  getDestinations: () => api.get('/destinations/'),
  getDestination: (id) => api.get(`/destinations/${id}/`),
  
  // Packages
  getPackages: () => api.get('/packages/'),
  getPackage: (id) => api.get(`/packages/${id}/`),
  
  // Booking
  createBooking: (data) => api.post('/bookings/', data),
  getBookings: () => api.get('/bookings/'),
  
  // Contact
  createContact: (data) => api.post('/contacts/', data),
};

export default api;