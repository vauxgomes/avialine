import React from 'react'
import CalendarDay from '../CalendarDay'
import './style.css'

export default function CalendarWeek({ week, meals, handlers }) {
  return (
    <div className="week">
      {week.map((day, key) => {
        return (
          <span
            className={`day__number day-${day.date.getDay()} ${
              day.isToday ? 'today' : ''
            }`}
            key={`day-number-${key}`}
          >
            {day.date.getDate()}
          </span>
        )
      })}

      {week.map((day, key) => (
        <CalendarDay
          key={`day-${key}`}
          day={day}
          meals={meals}
          handlers={handlers}
        />
      ))}
    </div>
  )
}
