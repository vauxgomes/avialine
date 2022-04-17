import { QRCodeCanvas } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import './style.css'

export default function QRCodePage() {
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    let time = 2

    if (hour < Number(process.env.REACT_APP_TIME_LIMIT_MORNING)) {
      time = 0
    } else if (hour < Number(process.env.REACT_APP_TIME_LIMIT_AFTERNOON)) {
      time = 1
    }

    api.getToday(time).then((schedule) => {
      setValue(schedule.id.toString())
      setDescription(schedule.description)
      setDate(schedule.date)
    })
  })

  return (
    <div id="qrcode">
      <div className="card">
        <QRCodeCanvas value={value} size={450} />
        <div className="info">
          <h2 className="date">{date}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
