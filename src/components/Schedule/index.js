import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

const NAMES = JSON.parse(process.env.REACT_APP_TIME_NAMES)

const TimeTag = ({ time }) => {
  return <span className="time">{NAMES[time]}</span>
}

export default function Schedule({ day, time, meals, handlers }) {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [selectedId, setSelectedId] = useState(
    day.schedules[time] ? day.schedules[time].meal_id : ''
  )

  const handleChange = (e) => {
    if (e.target.value === '') {
      return
    }

    const meal = meals.find((m) => m.id === e.target.value)
    setSelectedId(meal.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedId === '') {
      return
    }

    const meal = meals.find((m) => m.id === selectedId)
    handlers.onSetMeal(day, time, meal)
    setSelecting(false)
  }

  // Render
  if (selecting === true) {
    return (
      <div className="schedule">
        <form className="form selection" onSubmit={handleSubmit}>
          {/* Meals */}
          <div className="form-group">
            <label>Refeição</label>
            <select value={selectedId} onChange={handleChange}>
              <option value="">Selecione</option>
              {meals.map((meal, key) => (
                <option value={meal.id} key={key}>
                  {meal.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button className="btn btn-sm" type="submit">
            <i className="bx bx-save"></i> Salvar
          </button>

          <i
            className="selection__toggler bx bx-x"
            onClick={() => {
              setSelecting(false)
              setShow(false)
            }}
          ></i>
        </form>
      </div>
    )
  } else if (day.schedules[time] === null) {
    return (
      <div
        className="schedule empty"
        onClick={() => (day.isPast ? '' : setSelecting(true))}
      >
        <TimeTag time={time} />
        {day.isPast ? <></> : <i className="card__icon bx bxs-plus-circle"></i>}
      </div>
    )
  } else {
    return (
      <div className="schedule">
        <TimeTag time={time} />
        <span className="title">{day.schedules[time].title}</span>
        <p className="description">{day.schedules[time].description}</p>

        {day.isPast ? (
          ''
        ) : (
          <div className="dropdown" onMouseLeave={() => setShow(false)}>
            <div className="dropdown__toggler" onClick={() => setShow(true)}>
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>

            <ul className={`dropdown__content ${show ? 'show' : ''}`}>
              {/* QR CODE */}
              <li onClick={() => navigate(`today/${day.schedules[time].id}`)}>
                <i className="bx bx-qr"></i>
              </li>

              {/* EDIT */}
              <li
                onClick={() => {
                  setShow(false)
                  setSelecting(true)
                }}
              >
                <i className="bx bx-edit-alt"></i>
              </li>

              {/* DIVIDER */}
              {/* <li className="divider"></li> */}

              {/* REMOVE */}
              <li
                className="remove"
                onClick={() => handlers.onRemoveSchedule(day, time)}
              >
                <i className="bx bx-trash"></i>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}
