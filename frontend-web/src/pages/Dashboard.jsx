import React, { useState, useEffect } from 'react'
import { Card } from '../components/Card'
import { reservaService, professorService, carrinhoService } from '../services/api'
import './Dashboard.css'

export function Dashboard() {
  const [dados, setDados] = useState({
    totalCarrinhos: 0,
    carrinhosAtivos: 0,
    reservasAgendadas: 0,
    reservasHoje: 0
  })
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [reservas, carrinhos] = await Promise.all([
        reservaService.listar(),
        carrinhoService.listar()
      ])

      const hoje = new Date().toISOString().split('T')[0]
      const reservasHoje = reservas.data.filter(r => r.dataUso === hoje && r.status === 'AGENDADA').length
      const carrinhosAtivos = carrinhos.data.filter(c => c.ativo).length
      const reservasAgendadas = reservas.data.filter(r => r.status === 'AGENDADA').length

      setDados({
        totalCarrinhos: carrinhos.data.length,
        carrinhosAtivos,
        reservasAgendadas,
        reservasHoje
      })
    } catch (err) {
      setErro('Erro ao carregar dados')
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }

  if (carregando) return <div className="loading">Carregando...</div>

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {erro && <div className="error">{erro}</div>}
      
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-number">{dados.totalCarrinhos}</div>
          <div className="stat-label">Carrinhos</div>
        </Card>
        
        <Card className="stat-card">
          <div className="stat-number">{dados.carrinhosAtivos}</div>
          <div className="stat-label">Carrinhos Ativos</div>
        </Card>
        
        <Card className="stat-card">
          <div className="stat-number">{dados.reservasAgendadas}</div>
          <div className="stat-label">Reservas Agendadas</div>
        </Card>
        
        <Card className="stat-card">
          <div className="stat-number">{dados.reservasHoje}</div>
          <div className="stat-label">Reservas Hoje</div>
        </Card>
      </div>
    </div>
  )
}
