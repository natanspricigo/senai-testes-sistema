import axios from 'axios'

// Use VITE_API_URL se definido, senão use localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

console.log('[API] Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
})

// Professores
export const professorService = {
  listar: () => api.get('/professores'),
  obter: (id) => api.get(`/professores/${id}`),
  criar: (data) => api.post('/professores', data),
  atualizar: (id, data) => api.put(`/professores/${id}`, data),
  inativar: (id) => api.patch(`/professores/${id}/inativar`),
  ativar: (id) => api.patch(`/professores/${id}/ativar`)
}

// Carrinhos
export const carrinhoService = {
  listar: () => api.get('/carrinhos'),
  obter: (id) => api.get(`/carrinhos/${id}`),
  criar: (data) => api.post('/carrinhos', data),
  atualizar: (id, data) => api.put(`/carrinhos/${id}`, data),
  inativar: (id) => api.patch(`/carrinhos/${id}/inativar`),
  ativar: (id) => api.patch(`/carrinhos/${id}/ativar`)
}

// Reservas
export const reservaService = {
  listar: () => api.get('/reservas'),
  obter: (id) => api.get(`/reservas/${id}`),
  criar: (data) => api.post('/reservas', data),
  buscarPorData: (dataUso) => api.get(`/reservas?dataUso=${dataUso}`),
  buscarPorProfessor: (professorId) => api.get(`/reservas?professorId=${professorId}`),
  buscarPorCarrinho: (carrinhoId) => api.get(`/reservas?carrinhoId=${carrinhoId}`),
  cancelar: (id) => api.patch(`/reservas/${id}/cancelar`),
  finalizar: (id) => api.patch(`/reservas/${id}/finalizar`)
}

export default api
