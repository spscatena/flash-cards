import axios from 'axios';

const baseUrl = 'http://localhost:3000'

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

// export const createSubject = async (data) => {
//   const resp = await api.post('/subjects', { subject: data })
//   return resp.data
// }

// export const readAllSubjects = async () => {
//   const resp = await api.get('/subjects')
//   return resp.data
// }

// export const updateSubjects = async (id, data) => {
//   const resp = await api.put(`/subjects/${id}`, { teacher: data })
//   return resp.data
// }

// export const destroySubjects = async (id) => {
//   const resp = await api.delete(`/subjects/${id}`)
//   return resp.data
// }


// // -------------Cards---------------------


// export const createCard = async (data) => {
//   const resp = await api.post('/cards', { subject: data })
//   return resp.data
// }

// export const readAllSubjects = async () => {
//   const resp = await api.get('/cards')
//   return resp.data
// }

// export const updateSubjects = async (id, data) => {
//   const resp = await api.put(`/cards/${id}`, { teacher: data })
//   return resp.data
// }

// export const destroySubjects = async (id) => {
//   const resp = await api.delete(`/cards/${id}`)
//   return resp.data
// }