import React, { useEffect, useState } from 'react'

import './style.css'

export default function MealSelector({
  schedule,
  visible = false,
  onClose,
  meals = [],
  onRemove
}) {
  const [value, setValue] = useState(schedule ? schedule.meal_id : '')

  return (
    <div className={`schedule-editor ${visible ? 'show' : ''}`}>
      <div className="editor__container">
        <header className="editor__header">
          <h3>Editor</h3>
          <button className="toggler" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </header>

        <div className="editor__body">
          <form>
            <div className="form-group">
              <label htmlFor="meal">Refeição</label>
              <select
                name="meal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <option value={-1}>Escolha</option>

                {meals.map((meal, key) => (
                  <option value={meal.id} key={key}>
                    {meal.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="editor__footer">
          <button className="btn btn-primary">
            <i className="bx bx-save"></i> Salvar
          </button>
          <button className="btn btn-warning">
            <i className="bx bx-trash"></i> Remover
          </button>
          <button className="btn">
            <i className="bx bx-qr"></i> QR Code
          </button>
        </div>
      </div>
    </div>
  )
}
