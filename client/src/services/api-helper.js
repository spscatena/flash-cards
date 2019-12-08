import axios from 'axios';

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://flash-cards-api-ss.herokuapp.com/'

// https://flash-cards-api-ss.herokuapp.com/subjects
// https://flash-cards-api-ss.herokuapp.com/

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  console.log(loginData)
  const resp = await api.post('/auth/login', loginData)
  console.log(resp)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

// // -------------Subjects---------------------

export const createSubject = async (data) => {
  const resp = await api.post('/subjects', data)
  return resp.data
}

export const readAllSubjects = async (id) => {
  const resp = await api.get(`/subjects`)
  return resp.data
}

export const getSubject = async (id) => {
  const resp = await api.get(`/subjects/${id}`)
  return resp.data
}

export const putSubject = async (id, data) => {
  const resp = await api.put(`/subjects/${id}`, data)
  return resp.data
}

export const destroySubject = async (id) => {
  const resp = await api.delete(`/subjects/${id}`)
  return resp.data
}


// -------------Cards---------------------


export const createCard = async (subjectId, data) => {
  // debugger;
  const resp = await api.post(`subjects/${subjectId}/cards`, data)
  return resp.data
}

export const readAllCards = async (id) => {
  const resp = await api.get(`subjects/${id}/cards`)
  return resp.data
}

export const updateCard = async (subjectId, cardId, data) => {
  const resp = await api.put(`subjects/${subjectId}/cards/${cardId}`, data)
  return resp.data
}

export const destroyCard = async (subjectId, cardId) => {
  const resp = await api.delete(`subjects/${subjectId}/cards/${cardId}`)
  return resp.data
}