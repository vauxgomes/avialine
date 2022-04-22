import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './style.css'

export default function Sidebar({ handleLogout }) {
  const [toggler, setToggler] = useState(
    JSON.parse(localStorage.getItem('hide-sidebar'))
  )

  return (
    <div className={`sidebar ${toggler ? 'toggled' : ''}`}>
      <div
        className="sidebar__header sidebar__toggler"
        onClick={() => {
          localStorage.setItem('hide-sidebar', JSON.stringify(!toggler))
          setToggler(!toggler)
        }}
      >
        <div className="sidebar__logo">
          <i className="bx bxs-bolt-circle"></i>
          <span>Jandaya</span>
        </div>

        <i className="bx bx-menu toggler-icon"></i>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bx bx-calendar"></i>
              <span>Agenda</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/meals"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bx bx-food-menu"></i>
              <span>Cardápios</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bx bx-bar-chart-alt-2"></i>
              <span>Relatórios</span>
            </NavLink>
          </li>

          {/* <li className="divider"></li>

          <li>
            <NavLink to="/today">
              <i className="bx bx-qr"></i>
              <span>QRCode</span>
            </NavLink>
          </li> */}

          <li className="divider"></li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bx bx-user"></i>
              <span>Usuários</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/config"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bx bx-cog"></i>
              <span>Configurações</span>
            </NavLink>
          </li>

          <li className="divider"></li>

          <li>
            <Link to="/" onClick={handleLogout}>
              <i className="bx bx-log-out-circle"></i>
              <span>Sair</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
