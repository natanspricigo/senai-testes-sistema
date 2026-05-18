import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">📚 Carrinhos</Link>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/professores">Professores</Link></li>
          <li><Link to="/carrinhos">Carrinhos</Link></li>
          <li><Link to="/reservas">Reservas</Link></li>
        </ul>
      </nav>
    </header>
  )
}
