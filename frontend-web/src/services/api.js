import axios from 'axios'

const configuredApiUrl = import.meta.env.VITE_API_URL
const isDev = import.meta.env.DEV

const API_BASE_URL = configuredApiUrl || (isDev ? 'http://localhost:8080/api' : null)

console.log('[API] Base URL:', API_BASE_URL)

const apiNotConfiguredMessage = 'API nao configurada. Defina VITE_API_URL no Vercel com a URL publica do backend, por exemplo: https://seu-backend.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
})

api.interceptors.request.use((config) => {
  if (!API_BASE_URL) {
    return Promise.reject(new Error(apiNotConfiguredMessage))
  }

  return config
})

export function getApiErrorMessage(error, fallback = 'Erro ao comunicar com a API') {
  if (error?.response?.data?.mensagem) return error.response.data.mensagem
  if (error?.code === 'ECONNABORTED') return 'Tempo limite excedido ao conectar na API. Verifique se o backend esta online e se VITE_API_URL aponta para a URL correta.'
  if (error?.message) return error.message
  return fallback
}

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
