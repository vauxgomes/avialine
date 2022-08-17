import React, { useState } from 'react'
import api from '../../services/api'

import './style.css'

const NAMES = JSON.parse(process.env.REACT_APP_TIME_NAMES)

export default function OrdersPage() {
  const [enrollmentCode, setCode] = useState(123)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleOnSubmit = e => {
    e.preventDefault()

    api
      .postOrderOnBehalfOf(enrollmentCode, time, date)
      .then(response => {
        if (response.success) {
          alert('Adicionado com sucesso')
        } else {
          alert(response.message)
        }
      })
      .catch(e => {
        alert(
          e.response.data.message ||
            'Erro na requisição, procure o administrador do sistema.'
        )
      })
  }

  return (
    <div id="orders">
      <header className="orders__header">
        <h1>Tickets avulsos</h1>
      </header>

      <div className="orders__body bg-striped">
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="date">Data</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              placeholder="Matrícula do Estudante"
            />
          </div>

          <div className="form-group">
            <label htmlFor="meal">Refeição</label>
            <select
              name="meal"
              onChange={e => setTime(e.target.value)}
              required
            >
              {NAMES.map((mealName, index) => (
                <option value={index} key={index}>
                  {mealName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="code">Matrícula</label>
            <input
              type="text"
              name="code"
              value={enrollmentCode}
              onChange={e => setCode(e.target.value)}
              required
              placeholder="Matrícula do Estudante"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
