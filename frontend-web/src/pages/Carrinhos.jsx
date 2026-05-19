import React, { useState, useEffect } from 'react'
import { carrinhoService, getApiErrorMessage } from '../services/api'
import { Modal } from '../components/Modal'
import { Card } from '../components/Card'
import './Carrinhos.css'

export function Carrinhos() {
  const [carrinhos, setCarrinhos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formData, setFormData] = useState({
    numero: '',
    descricao: '',
    quantidadeNotebooks: '',
    localizacao: ''
  })

  useEffect(() => {
     document.title = 'Carrinhos';
     carregarCarrinhos()
  }, [])

  const carregarCarrinhos = async () => {
    try {
      const res = await carrinhoService.listar()
      setCarrinhos(res.data)
      setErro(null)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao carregar carrinhos'))
    } finally {
      setCarregando(false)
    }
  }

  const abrirModal = (carrinho = null) => {
    if (carrinho) {
      setFormData({
        numero: carrinho.numero,
        descricao: carrinho.descricao,
        quantidadeNotebooks: carrinho.quantidadeNotebooks,
        localizacao: carrinho.localizacao
      })
      setEditando(carrinho.id)
    } else {
      setFormData({ numero: '', descricao: '', quantidadeNotebooks: '', localizacao: '' })
      setEditando(null)
    }
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setEditando(null)
    setFormData({ numero: '', descricao: '', quantidadeNotebooks: '', localizacao: '' })
  }

  const salvar = async () => {
    try {
      const dados = {
        ...formData,
        numero: parseInt(formData.numero),
        quantidadeNotebooks: parseInt(formData.quantidadeNotebooks)
      }
      if (editando) {
        await carrinhoService.atualizar(editando, dados)
      } else {
        await carrinhoService.criar(dados)
      }
      await carregarCarrinhos()
      fecharModal()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao salvar carrinho'))
    }
  }

  const inativar = async (id) => {
    try {
      await carrinhoService.inativar(id)
      await carregarCarrinhos()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao inativar carrinho'))
    }
  }

  const ativar = async (id) => {
    try {
      await carrinhoService.ativar(id)
      await carregarCarrinhos()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Erro ao ativar carrinho'))
    }
  }

  if (carregando) return <div className="loading">Carregando...</div>

  return (
    <div className="carrinhos">
      <h1>Carrinhos</h1>
      {erro && <div className="error">{erro}</div>}
      
      <button className="btn btn-primary" onClick={() => abrirModal()}>+ Novo Carrinho</button>

      <div className="lista">
        {carrinhos.map(carrinho => (
          <Card key={carrinho.id} className="item">
            <div className="item-header">
              <h3>Carrinho {carrinho.numero}</h3>
              <span className={`badge ${carrinho.ativo ? 'ativo' : 'inativo'}`}>
                {carrinho.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="descricao">{carrinho.descricao}</p>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Notebooks:</span>
                <span className="value">{carrinho.quantidadeNotebooks}</span>
              </div>
              <div className="info-item">
                <span className="label">Localização:</span>
                <span className="value">{carrinho.localizacao}</span>
              </div>
            </div>
            <div className="item-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => abrirModal(carrinho)}>Editar</button>
              {carrinho.ativo ? (
                <button className="btn btn-sm btn-danger" onClick={() => inativar(carrinho.id)}>Inativar</button>
              ) : (
                <button className="btn btn-sm btn-success" onClick={() => ativar(carrinho.id)}>Ativar</button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={modalAberto}
        title={editando ? 'Editar Carrinho' : 'Novo Carrinho'}
        onClose={fecharModal}
        onConfirm={salvar}
        confirmText={editando ? 'Atualizar' : 'Criar'}
      >
        <div className="form-group">
          <label>Número</label>
          <input
            type="number"
            value={formData.numero}
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Quantidade de Notebooks</label>
          <input
            type="number"
            value={formData.quantidadeNotebooks}
            onChange={(e) => setFormData({ ...formData, quantidadeNotebooks: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Localização</label>
          <input
            type="text"
            value={formData.localizacao}
            onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  )
}
