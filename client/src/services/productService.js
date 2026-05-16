import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY

// Admin headers helper
const adminHeaders = {
  'x-admin-key': ADMIN_KEY,
}

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`)
  return response.data
}

export const getProductBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/products/slug/${slug}`)
  return response.data
}

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: adminHeaders,
  })
  return response.data
}

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: adminHeaders,
  })
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    headers: adminHeaders,
  })
  return response.data
}