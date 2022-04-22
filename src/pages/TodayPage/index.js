import { QRCodeCanvas } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import './style.css'

const {
  REACT_APP_TIME_LIMIT_MORNING: LIMIT_MORNING,
  REACT_APP_TIME_LIMIT_AFTERNOON: LIMIT_AFTERNOON,
  REACT_APP_TIME_LIMIT_NIGHT: LIMIT_NIGHT
} = process.env

export default function QRCodePage() {
  const [value, setValue] = useState(null)
  const [description, setDescription] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    const date = new Date()
    const hour = date.getHours()
    let time = null

    if (hour < Number(LIMIT_NIGHT)) {
      if (hour >= Number(LIMIT_AFTERNOON)) {
        time = 2
      } else if (hour >= Number(LIMIT_MORNING)) {
        time = 1
      } else {
        time = 0
      }

      api.getToday(date.toISOString().slice(0, 10), time).then((schedule) => {
        if (schedule) {
          setValue(schedule.id.toString())
          setDescription(schedule.description)
          setDate(schedule.date)
        } else {
          console.log(':(')
        }
      })
    }
  })

  return (
    <div id="qrcode">
      <div className="card">
        <div className="logo">
          <i className="bx bxs-bolt-circle"></i>
          <span>Jandaya</span>
        </div>

        <QRCodeCanvas value={value ? value : 'Curioso'} size={400} />

        {value && date ? (
          <>
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
