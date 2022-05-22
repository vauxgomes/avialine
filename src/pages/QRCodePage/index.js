import { QRCodeCanvas } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Routes, Route, useParams } from 'react-router-dom'

import './style.css'

const { REACT_APP_MOBILE_PREFIX: PREFIX } = process.env

export default function QRCodeShower() {
  const [value, setValue] = useState(null)
  const [description, setDescription] = useState(null)
  const [date, setDate] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    api.getSchedule(id).then((schedule) => {
      if (schedule) {
        setValue(schedule.id.toString())
        setDescription(schedule.description)
        setDate(schedule.date)
      } else {
        alert('Código inválido')
      }
    })
  }, [])

  return (
    <div id="qrcode">
      <div className="card">
        <div className="logo">
          <i className="bx bxs-bolt-circle"></i>
          <span>Jandaya</span>
        </div>

        {value && date ? (
          <>
            <QRCodeCanvas value={value ? value : 'Curioso'} size={400} />
            <dl>
              <dt>Data</dt>
              <dd>{date.slice(0, 10)}</dd>
            </dl>

            <dl>
              <dt>Refeição</dt>
              <dd>{description}</dd>
            </dl>
          </>
        ) : (
          <h2>
            Nenhuma refeição agendada para este horário!{' '}
            <i className="bx bx-sad"></i>
          </h2>
        )}
      </div>
    </div>
  )
}
