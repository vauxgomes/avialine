import React, { useState } from 'react'
import api from '../../services/api'

import './style.css'

export default function LoginPage({ handleLogin }) {
  //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')

  //
  const onSubmit = (e) => {
    e.preventDefault()
    setAlert(null)

    api
      .login(username, password)
      .then((response) => {
        if (response.success) {
          api.setToken(response.token)
          handleLogin(response.token)
        } else {
          setAlert(response.message)
        }
      })
      .catch((err) => {
        setAlert(err.response.data.message)
      })
  }

  return (
    <div id="login">
      {alert ? <div className="alert alert-danger">{alert}</div> : ''}
      <div className="login__card">
        {/* Header */}
        <div className="login__header">
          <i className="bx bx-key"></i>
          <h3>Login</h3>
        </div>

        <p data-campus="campus Jaguaribe">
          Bem vindo(a) ao Jandaya, o gerenciador de cardápios do
        </p>

        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              className="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label>
            <input type="checkbox" id="remember" /> Lembrar de mim
          </label>

          <div>
            <button className="btn btn-primary" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
