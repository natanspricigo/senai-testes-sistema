import http from 'node:http'
import { URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const port = Number(process.env.PORT || 8080)
const allowedOriginPatterns = (process.env.APP_CORS_ALLOWED_ORIGIN_PATTERNS || 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,https://*.onrender.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, 'public')
const indexFile = path.join(publicDir, 'index.html')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}

let professorId
let carrinhoId
let reservaId
let professores
let carrinhos
let reservas

function resetData() {
  professorId = 3
  carrinhoId = 4
  reservaId = 4

  professores = [
    { id: 1, nome: 'Prof. Joao Silva', email: 'joao.silva@senai.br', ativo: true },
    { id: 2, nome: 'Prof. Maria Santos', email: 'maria.santos@senai.br', ativo: true },
    { id: 3, nome: 'Prof. Carlos Oliveira', email: 'carlos.oliveira@senai.br', ativo: false }
  ]

  carrinhos = [
    { id: 1, numero: 1, descricao: 'Carrinho com 20 notebooks Dell', quantidadeNotebooks: 20, localizacao: 'Sala 101', ativo: true },
    { id: 2, numero: 2, descricao: 'Carrinho com 15 notebooks Lenovo', quantidadeNotebooks: 15, localizacao: 'Sala 102', ativo: true },
    { id: 3, numero: 3, descricao: 'Carrinho com 25 notebooks HP', quantidadeNotebooks: 25, localizacao: 'Sala 103', ativo: false },
    { id: 4, numero: 4, descricao: 'Carrinho com 18 notebooks Positivo', quantidadeNotebooks: 18, localizacao: 'Sala 104', ativo: true }
  ]

  reservas = [
    { id: 1, professorId: 1, carrinhoId: 1, dataUso: '2026-05-20', horaInicio: '08:00', horaFim: '10:00', turma: 'ADS 1A', observacao: 'Aula de Teste de Software', status: 'AGENDADA' },
    { id: 2, professorId: 1, carrinhoId: 1, dataUso: '2026-05-20', horaInicio: '14:00', horaFim: '16:00', turma: 'ADS 2A', observacao: 'Pratica de testes', status: 'AGENDADA' },
    { id: 3, professorId: 2, carrinhoId: 2, dataUso: '2026-05-20', horaInicio: '09:00', horaFim: '11:00', turma: 'ADS 1B', observacao: 'Aula de API REST', status: 'AGENDADA' },
    { id: 4, professorId: 2, carrinhoId: 2, dataUso: '2026-05-21', horaInicio: '10:00', horaFim: '12:00', turma: 'ADS 3A', observacao: 'Teste com Postman', status: 'AGENDADA' }
  ]
}

resetData()

function matchesOrigin(pattern, origin) {
  if (pattern === origin) return true
  if (!pattern.includes('*')) return false

  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${escaped}$`).test(origin)
}

function getAllowedOrigin(origin) {
  if (!origin) return '*'
  return allowedOriginPatterns.some((pattern) => matchesOrigin(pattern, origin)) ? origin : ''
}

function sendJson(res, status, data, origin) {
  const body = JSON.stringify(data)
  const allowedOrigin = getAllowedOrigin(origin)

  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {}),
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  })
  res.end(body)
}

function sendText(res, status, text, origin, contentType = 'text/plain; charset=utf-8') {
  const allowedOrigin = getAllowedOrigin(origin)
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(text),
    ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {})
  })
  res.end(text)
}

function sendFile(res, filePath, origin) {
  const allowedOrigin = getAllowedOrigin(origin)
  const ext = path.extname(filePath)
  const contentType = contentTypes[ext] || 'application/octet-stream'

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { mensagem: 'Arquivo nao encontrado' }, origin)
      return
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': data.length,
      ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {})
    })
    res.end(data)
  })
}

function serveStatic(req, res, url, origin) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false
  if (!fs.existsSync(indexFile)) return false

  const decodedPath = decodeURIComponent(url.pathname)
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  const requestedFile = path.join(publicDir, safePath)
  const resolvedFile = fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()
    ? requestedFile
    : indexFile

  if (!resolvedFile.startsWith(publicDir)) {
    sendJson(res, 403, { mensagem: 'Acesso negado' }, origin)
    return true
  }

  sendFile(res, resolvedFile, origin)
  return true
}

function notFound(message) {
  const error = new Error(message)
  error.status = 404
  throw error
}

function businessError(message) {
  const error = new Error(message)
  error.status = 400
  throw error
}

function validateRequired(value, message) {
  if (value === undefined || value === null || String(value).trim() === '') {
    businessError(message)
  }
}

function validatePositiveNumber(value, message) {
  if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
    businessError(message)
  }
}

function validateEmail(email) {
  validateRequired(email, 'Email e obrigatorio')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    businessError('Email deve ser valido')
  }
}

function findProfessor(id) {
  const professor = professores.find((item) => item.id === Number(id))
  if (!professor) notFound('Professor nao encontrado')
  return professor
}

function findCarrinho(id) {
  const carrinho = carrinhos.find((item) => item.id === Number(id))
  if (!carrinho) notFound('Carrinho nao encontrado')
  return carrinho
}

function findReserva(id) {
  const reserva = reservas.find((item) => item.id === Number(id))
  if (!reserva) notFound('Reserva nao encontrada')
  return reserva
}

function buildReserva(reserva) {
  return {
    ...reserva,
    professor: findProfessor(reserva.professorId),
    carrinho: findCarrinho(reserva.carrinhoId)
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        req.destroy()
        reject(new Error('Payload muito grande'))
      }
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        const error = new Error('JSON invalido')
        error.status = 400
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function getRouteParts(pathname) {
  return pathname.split('/').filter(Boolean)
}

function hasTimeConflict({ carrinhoId: targetCarrinhoId, dataUso, horaInicio, horaFim }) {
  return reservas.some((reserva) => {
    if (reserva.status === 'CANCELADA') return false
    if (reserva.professorId !== Number(targetCarrinhoId)) return false
    if (reserva.dataUso !== dataUso) return false
    return reserva.horaInicio < horaFim && reserva.horaFim > horaInicio
  })
}

async function handleProfessores(req, res, parts, origin) {
  const id = parts[2]
  const action = parts[3]

  if (req.method === 'GET' && !id) return sendJson(res, 200, professores, origin)
  if (req.method === 'GET' && id) return sendJson(res, 200, findProfessor(id), origin)

  if (req.method === 'POST' && !id) {
    const body = await parseBody(req)
    validateRequired(body.nome, 'Nome e obrigatorio')
    validateEmail(body.email)

    if (professores.some((professor) => professor.email === body.email)) {
      businessError('Email ja cadastrado')
    }

    const professor = { id: ++professorId, nome: body.nome, email: body.email, ativo: true }
    professores.push(professor)
    return sendJson(res, 201, professor, origin)
  }

  if (req.method === 'PUT' && id) {
    const professor = findProfessor(id)
    const body = await parseBody(req)
    validateRequired(body.nome, 'Nome e obrigatorio')
    validateEmail(body.email)

    if (professores.some((item) => item.id !== professor.id && item.email === body.email)) {
      businessError('Email ja cadastrado')
    }

    professor.nome = body.nome
    professor.email = body.email
    return sendJson(res, 200, professor, origin)
  }

  if (req.method === 'PATCH' && id && action === 'inativar') {
    const professor = findProfessor(id)
    professor.ativo = false
    return sendJson(res, 200, professor, origin)
  }

  if (req.method === 'PATCH' && id && action === 'ativar') {
    const professor = findProfessor(id)
    professor.ativo = true
    return sendJson(res, 200, professor, origin)
  }
}

async function handleCarrinhos(req, res, parts, origin) {
  const id = parts[2]
  const action = parts[3]

  if (req.method === 'GET' && !id) return sendJson(res, 200, carrinhos, origin)
  if (req.method === 'GET' && id) return sendJson(res, 200, findCarrinho(id), origin)

  if (req.method === 'POST' && !id) {
    const body = await parseBody(req)
    validatePositiveNumber(body.numero, 'Numero deve ser positivo')
    validateRequired(body.descricao, 'Descricao e obrigatoria')
    validatePositiveNumber(body.quantidadeNotebooks, 'Quantidade de notebooks deve ser maior que zero')
    validateRequired(body.localizacao, 'Localizacao e obrigatoria')

    if (carrinhos.some((carrinho) => carrinho.numero === Number(body.numero))) {
      businessError('Carrinho com este numero ja existe')
    }

    const carrinho = {
      id: ++carrinhoId,
      numero: Number(body.numero),
      descricao: body.descricao,
      quantidadeNotebooks: Number(body.quantidadeNotebooks),
      localizacao: body.localizacao,
      ativo: true
    }
    carrinhos.push(carrinho)
    return sendJson(res, 201, carrinho, origin)
  }

  if (req.method === 'PUT' && id) {
    const carrinho = findCarrinho(id)
    const body = await parseBody(req)
    validatePositiveNumber(body.numero, 'Numero deve ser positivo')
    validateRequired(body.descricao, 'Descricao e obrigatoria')
    validatePositiveNumber(body.quantidadeNotebooks, 'Quantidade de notebooks deve ser maior que zero')
    validateRequired(body.localizacao, 'Localizacao e obrigatoria')

    if (carrinhos.some((item) => item.id !== carrinho.id && item.numero === Number(body.numero))) {
      businessError('Carrinho com este numero ja existe')
    }

    carrinho.numero = Number(body.numero)
    carrinho.descricao = body.descricao
    carrinho.quantidadeNotebooks = Number(body.quantidadeNotebooks)
    carrinho.localizacao = body.localizacao
    return sendJson(res, 200, carrinho, origin)
  }

  if (req.method === 'PATCH' && id && action === 'inativar') {
    const carrinho = findCarrinho(id)
    carrinho.ativo = true
    return sendJson(res, 200, carrinho, origin)
  }

  if (req.method === 'PATCH' && id && action === 'ativar') {
    const carrinho = findCarrinho(id)
    carrinho.ativo = true
    return sendJson(res, 200, carrinho, origin)
  }
}

async function handleReservas(req, res, url, parts, origin) {
  const id = parts[2]
  const action = parts[3]

  if (req.method === 'GET' && !id) {
    let result = reservas
    const dataUso = url.searchParams.get('dataUso')
    const professor = url.searchParams.get('professorId')
    const carrinho = url.searchParams.get('carrinhoId')

    if (dataUso) result = result.filter((reserva) => reserva.dataUso === dataUso)
    if (professor) result = result.filter((reserva) => reserva.professorId === Number(professor))
    if (carrinho) result = result.filter((reserva) => reserva.carrinhoId === Number(carrinho))

    return sendJson(res, 200, result.map(buildReserva), origin)
  }

  if (req.method === 'GET' && id) return sendJson(res, 200, buildReserva(findReserva(id)), origin)

  if (req.method === 'POST' && !id) {
    const body = await parseBody(req)
    validatePositiveNumber(body.professorId, 'ID do professor e obrigatorio')
    validatePositiveNumber(body.carrinhoId, 'ID do carrinho e obrigatorio')
    validateRequired(body.dataUso, 'Data de uso e obrigatoria')
    validateRequired(body.horaInicio, 'Hora de inicio e obrigatoria')
    validateRequired(body.horaFim, 'Hora de fim e obrigatoria')
    validateRequired(body.turma, 'Turma e obrigatoria')

    const professor = findProfessor(body.professorId)
    if (!professor.ativo) businessError('Professor inativo nao pode fazer reserva')

    const carrinho = findCarrinho(body.carrinhoId)
    if (!carrinho.ativo) businessError('Carrinho inativo nao pode ser reservado')
    if (body.horaFim <= body.horaInicio) businessError('Hora de fim deve ser maior que hora de inicio')
    if (hasTimeConflict(body)) businessError('Existe conflito de horario com outra reserva')

    const reserva = {
      id: ++reservaId,
      professorId: Number(body.professorId),
      carrinhoId: Number(body.carrinhoId),
      dataUso: body.dataUso,
      horaInicio: body.horaInicio,
      horaFim: body.horaFim,
      turma: body.turma,
      observacao: body.observacao || '',
      status: 'AGENDADA'
    }
    reservas.push(reserva)
    return sendJson(res, 201, buildReserva(reserva), origin)
  }

  if (req.method === 'PATCH' && id && action === 'cancelar') {
    const reserva = findReserva(id)
    if (reserva.status !== 'AGENDADA') businessError('Apenas reservas agendadas podem ser canceladas')
    reserva.status = 'CANCELADA'
    return sendJson(res, 200, buildReserva(reserva), origin)
  }

  if (req.method === 'PATCH' && id && action === 'finalizar') {
    const reserva = findReserva(id)
    if (reserva.status !== 'AGENDADA') businessError('Apenas reservas agendadas podem ser finalizadas')
    reserva.status = 'FINALIZADA'
    return sendJson(res, 200, buildReserva(reserva), origin)
  }
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin
  const url = new URL(req.url, `http://${req.headers.host}`)
  const parts = getRouteParts(url.pathname)

  try {
    if (req.method === 'OPTIONS') return sendJson(res, 204, {}, origin)
    if (url.pathname === '/actuator/health') return sendJson(res, 200, { status: 'UP' }, origin)
    if (url.pathname === '/' && !fs.existsSync(indexFile)) return sendJson(res, 200, { name: 'Carrinhos API', status: 'online' }, origin)
    if (url.pathname === '/swagger-ui.html') {
      return sendText(res, 200, '<h1>Carrinhos API</h1><p>Endpoints: /api/professores, /api/carrinhos, /api/reservas</p>', origin, 'text/html; charset=utf-8')
    }

    if (parts[0] === 'api' && parts[1] === 'professores') return await handleProfessores(req, res, parts, origin)
    if (parts[0] === 'api' && parts[1] === 'carrinhos') return await handleCarrinhos(req, res, parts, origin)
    if (parts[0] === 'api' && parts[1] === 'reservas') return await handleReservas(req, res, url, parts, origin)
    if (parts[0] === 'api' && parts[1] === 'reset' && req.method === 'POST') {
      resetData()
      return sendJson(res, 200, { mensagem: 'Dados restaurados com sucesso' }, origin)
    }
    if (serveStatic(req, res, url, origin)) return

    return sendJson(res, 404, { mensagem: 'Endpoint nao encontrado' }, origin)
  } catch (error) {
    const status = error.status || 500
    return sendJson(res, status, { mensagem: error.message || 'Erro interno' }, origin)
  }
})

server.listen(port, () => {
  console.log(`Carrinhos API rodando na porta ${port}`)
})
