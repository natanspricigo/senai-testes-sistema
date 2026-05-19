import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reservaService, professorService, carrinhoService, getApiErrorMessage } from '../services/api'
import { Modal } from '../components/Modal'
import { Card } from '../components/Card'
import './Reservas.css'

export function Reservas() {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState([])
  const [professores, setProfessores] = useState([])
  const [carrinhos, setCarrinhos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [valorFiltro, setValorFiltro] = useState('')
  const [formData, setFormData] = useState({
    professorId: '',
    carrinhoId: '',
    dataUso: '',
    horaInicio: '',
    horaFim: '',
    turma: '',
    observacao: ''
  })

  useEffect(() => {
     document.title = 'Reservas';
     carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [reservasRes, professoresRes, carrinhosRes] = await Promise.all([
        reservaService.listar(),
        professorService.listar(),
        carrinhoService.listar()
      ])
      setReservas(reservasRes.data)
      setProfessores(professoresRes.data)
      setCarrinhos(carrinhosRes.data)
      setErro(null)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao carregar dados'))
    } finally {
      setCarregando(false)
    }
  }

  const aplicarFiltro = async () => {
    try {
      let res
      if (filtro === 'data') {
        res = await reservaService.buscarPorData(valorFiltro)
      } else if (filtro === 'professor') {
        res = await reservaService.buscarPorProfessor(valorFiltro)
      } else if (filtro === 'carrinho') {
        res = await reservaService.buscarPorCarrinho(valorFiltro)
      }
      setReservas(res.data)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao filtrar reservas'))
    }
  }

  const limparFiltro = async () => {
    setFiltro('')
    setValorFiltro('')
    await carregarDados()
  }

  const abrirModal = () => {
    setFormData({
      professorId: '',
      carrinhoId: '',
      dataUso: '',
      horaInicio: '',
      horaFim: '',
      turma: '',
      observacao: ''
    })
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
  }

  const salvar = async () => {
    try {
      await reservaService.criar(formData)
      await carregarDados()
      fecharModal()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao criar reserva'))
    }
  }

  const cancelar = async (id) => {
    try {
      await reservaService.cancelar(id)
      await carregarDados()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao cancelar reserva'))
    }
  }

  const finalizar = async (id) => {
    try {
      await reservaService.finalizar(id)
      await carregarDados()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao finalizar reserva'))
    }
  }

  if (carregando) return <div className="loading">Carregando...</div>

  return (
    <div className="reservas">
      <h1>Reservas</h1>
      {erro && <div className="error">{erro}</div>}
      
      <div className="actions-bar">
        <button className="btn btn-primary" onClick={abrirModal}>+ Nova Reserva</button>
        
        <div className="filtro">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="data">Por Data</option>
            <option value="professor">Por Professor</option>
            <option value="carrinho">Por Carrinho</option>
          </select>
          
          {filtro === 'data' && (
            <input
              type="date"
              value={valorFiltro}
              onChange={(e) => setValorFiltro(e.target.value)}
            />
          )}
          {filtro === 'professor' && (
            <select value={valorFiltro} onChange={(e) => setValorFiltro(e.target.value)}>
              <option value="">Selecione um professor</option>
              {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          )}
          {filtro === 'carrinho' && (
            <select value={valorFiltro} onChange={(e) => setValorFiltro(e.target.value)}>
              <option value="">Selecione um carrinho</option>
              {carrinhos.map(c => <option key={c.id} value={c.id}>Carrinho {c.numero}</option>)}
            </select>
          )}
          
          {valorFiltro && <button className="btn btn-sm btn-secondary" onClick={aplicarFiltro}>Filtrar</button>}
          {filtro && <button className="btn btn-sm btn-secondary" onClick={limparFiltro}>Limpar</button>}
        </div>
      </div>

      <div className="lista">
        {reservas.length === 0 ? (
          <Card><p className="empty-message">Nenhuma reserva encontrada</p></Card>
        ) : (
          reservas.map(reserva => (
            <Card key={reserva.id} className="item">
              <div className="item-header">
                <div>
                  <h3>Carrinho {reserva.carrinho.numero}</h3>
                  <p className="professor">{reserva.professor.nome}</p>
                </div>
                <span className={`status status-${reserva.status.toLowerCase()}`}>
                  {reserva.status}
                </span>
              </div>
              
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Data:</span>
                  <span>{new Date(reserva.dataUso).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Horário:</span>
                  <span>{reserva.horaInicio} - {reserva.horaFim}</span>
                </div>
                <div className="info-item">
                  <span className="label">Turma:</span>
                  <span>{reserva.turma}</span>
                </div>
              </div>
              
              <div className="item-actions">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => navigate(`/reservas/${reserva.id}`)}
                >
                  Detalhes
                </button>
                {reserva.status === 'AGENDADA' && (
                  <>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => finalizar(reserva.id)}
                    >
                      Finalizar
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => cancelar(reserva.id)}
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={modalAberto}
        title="Nova Reserva"
        onClose={fecharModal}
        onConfirm={salvar}
        confirmText="Criar"
      >
        <div className="form-group">
          <label>Professor*</label>
          <select
            value={formData.professorId}
            onChange={(e) => setFormData({ ...formData, professorId: e.target.value })}
          >
            <option value="">Selecione um professor</option>
            {professores.filter(p => p.ativo).map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Carrinho*</label>
          <select
            value={formData.carrinhoId}
            onChange={(e) => setFormData({ ...formData, carrinhoId: e.target.value })}
          >
            <option value="">Selecione um carrinho</option>
            {carrinhos.filter(c => c.ativo).map(c => (
              <option key={c.id} value={c.id}>
                Carrinho {c.numero} - {c.descricao}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Data de Uso*</label>
          <input
            type="date"
            value={formData.dataUso}
            onChange={(e) => setFormData({ ...formData, dataUso: e.target.value })}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Hora Início*</label>
            <input
              type="time"
              value={formData.horaInicio}
              onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Hora Fim*</label>
            <input
              type="time"
              value={formData.horaFim}
              onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Turma*</label>
          <input
            type="text"
            placeholder="Ex: ADS 1A"
            value={formData.turma}
            onChange={(e) => setFormData({ ...formData, turma: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label>Observação</label>
          <textarea
            value={formData.observacao}
            onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
            rows={4}
          />
        </div>
      </Modal>
    </div>
  )
}
