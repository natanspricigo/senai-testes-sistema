import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { reservaService, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import './DetalhesReserva.css'

export function DetalhesReserva() {
  const { id } = useParams()
  const [reserva, setReserva] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
     document.title = 'Detalhes da Reserva';
     carregarReserva()
  }, [id])

  const carregarReserva = async () => {
    try {
      const res = await reservaService.obter(id)
      setReserva(res.data)
      setErro(null)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao carregar reserva'))
    } finally {
      setCarregando(false)
    }
  }

  if (carregando) return <div className="loading">Carregando...</div>
  if (!reserva) return <div className="error">{erro || 'Reserva nao encontrada'}</div>

  return (
    <div className="detalhes-reserva">
      <h1>Detalhes da Reserva #{reserva.id}</h1>
      {erro && <div className="error">{erro}</div>}

      <div className="detalhes-grid">
        <Card>
          <h2>Informações Gerais</h2>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status status-${reserva.status.toLowerCase()}`}>
              {reserva.status}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Data de Uso:</span>
            <span>{new Date(reserva.dataUso).toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <span className="label">Turma:</span>
            <span>{reserva.turma}</span>
          </div>
        </Card>

        <Card>
          <h2>Professor</h2>
          <div className="info-row">
            <span className="label">Nome:</span>
            <span>{reserva.professor.nome}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span>{reserva.professor.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`badge ${reserva.professor.ativo ? 'ativo' : 'inativo'}`}>
              {reserva.professor.ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </Card>

        <Card>
          <h2>Carrinho</h2>
          <div className="info-row">
            <span className="label">Número:</span>
            <span>{reserva.carrinho.numero}</span>
          </div>
          <div className="info-row">
            <span className="label">Descrição:</span>
            <span>{reserva.carrinho.descricao}</span>
          </div>
          <div className="info-row">
            <span className="label">Notebooks:</span>
            <span>{reserva.carrinho.quantidadeNotebooks}</span>
          </div>
          <div className="info-row">
            <span className="label">Localização:</span>
            <span>{reserva.carrinho.localizacao}</span>
          </div>
        </Card>

        <Card>
          <h2>Horários</h2>
          <div className="info-row">
            <span className="label">Início:</span>
            <span>{reserva.horaInicio}</span>
          </div>
          <div className="info-row">
            <span className="label">Fim:</span>
            <span>{reserva.horaFim}</span>
          </div>
        </Card>
      </div>

      {reserva.observacao && (
        <Card className="observacao-card">
          <h2>Observação</h2>
          <p>{reserva.observacao}</p>
        </Card>
      )}
    </div>
  )
}
