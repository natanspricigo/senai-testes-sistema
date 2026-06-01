import React, { useState, useEffect } from 'react'
import { professorService, getApiErrorMessage } from '../services/api'
import { Modal } from '../components/Modal'
import { Card } from '../components/Card'
import './Professores.css'

export function Professores() {
  const [professores, setProfessores] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formData, setFormData] = useState({ nome: '', email: '' })

  useEffect(() => {
     document.title = 'Professores';
     carregarProfessores()
  }, [])

  const carregarProfessores = async () => {
    try {
      const res = await professorService.listar()
      setProfessores(res.data)
      setErro(null)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao carregar professores'))
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }

  const abrirModal = (professor = null) => {
    if (professor) {
      setFormData({ nome: professor.nome, email: professor.email })
      setEditando(professor.id)
    } else {
      setFormData({ nome: '', email: '' })
      setEditando(null)
    }
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setEditando(null)
    setFormData({ nome: '', email: '' })
  }

  const salvar = async () => {
    try {
      if (editando) {
        await professorService.atualizar(editando, formData)
      } else {
        await professorService.criar(formData)
      }
      await carregarProfessores()
      fecharModal()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao salvar professor'))
    }
  }

  const inativar = async (id) => {
    try {
      await professorService.ativar(id)
      await carregarProfessores()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao inativar professor'))
    }
  }

  const ativar = async (id) => {
    try {
      await professorService.ativar(id)
      await carregarProfessores()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao ativar professor'))
    }
  }

  if (carregando) return <div className="loading">Carregando...</div>

  return (
    <div className="professores">
      <h1>Professores</h1>
      {erro && <div className="error">{erro}</div>}
      
      <button className="btn btn-primary" onClick={() => abrirModal()}>+ Novo Professor</button>

      <div className="lista">
        {professores.map(prof => (
          <Card key={prof.id} className="item">
            <div className="item-header">
              <h3>{prof.nome}</h3>
              <span className={`badge ${prof.ativo ? 'ativo' : 'inativo'}`}>
                {prof.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="email">{prof.email}</p>
            <div className="item-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => abrirModal(prof)}>Editar</button>
              {prof.ativo ? (
                <button className="btn btn-sm btn-danger" onClick={() => inativar(prof.id)}>Inativar</button>
              ) : (
                <button className="btn btn-sm btn-success" onClick={() => ativar(prof.id)}>Ativar</button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={modalAberto}
        title={editando ? 'Editar Professor' : 'Novo Professor'}
        onClose={fecharModal}
        onConfirm={salvar}
        confirmText={editando ? 'Atualizar' : 'Criar'}
      >
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  )
}
