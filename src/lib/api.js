import axios from 'axios'
import { getToken } from '../lib/auth'

export const baseUrl = '/api'
export const registerPath = '/register'
export const loginPath = '/login'
export const checkUserPath = '/checkuser'
export const dreamsPath = '/dreams'
export const commentPath = '/comment'
export const editPath = '/edit'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getAllDreams() {
  return axios.get(`${baseUrl}${dreamsPath}`)
}

export function getSingleDream(dreamsId) {
  return axios.get(`${baseUrl}${dreamsPath}${dreamsId}`)
}

export function createDream(formdata) {
  return axios.post(`${baseUrl}${dreamsPath}`, formdata, headers())
}

export function editDreams(id, formdata) {
  return axios.put(`${baseUrl}${dreamsPath}/${id}`, formdata, headers())
}

export function deleteDream(id) {
  return axios.delete(`${baseUrl}${dreamsPath}/${id}`, headers())
}

// * Authentication Requests
export function registerUser(formdata) {
  return axios.post(`${baseUrl}${registerPath}`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}${loginPath}`, formdata)
}
export function userCheck(formData) {
  return axios.post(`${baseUrl}${registerPath}${checkUserPath}`, formData)
}