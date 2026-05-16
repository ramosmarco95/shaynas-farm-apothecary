import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`)
  return response.data
}

export const getProductBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/products/slug/${slug}`)
  return response.data
}