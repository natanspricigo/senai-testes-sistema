import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Professores } from './pages/Professores'
import { Carrinhos } from './pages/Carrinhos'
import { Reservas } from './pages/Reservas'
import { DetalhesReserva } from './pages/DetalhesReserva'
import { ApiDocs } from './pages/ApiDocs'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/carrinhos" element={<Carrinhos />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas/:id" element={<DetalhesReserva />} />
          <Route path="/api-docs" element={<ApiDocs />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
