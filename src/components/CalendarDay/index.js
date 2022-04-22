import React from 'react'
import Schedule from '../Schedule'

import './style.css'

export default function CalendarDay({ day, meals, handlers }) {
  /** UTILS */

  const buildClassName = (time) => {
    let className = `day__card day-${day.date.getDay()} `
    className += `${day.isPast ? 'past' : ''} time-${time}`

    return className
  }

  return (
    <>
      {day.schedules &&
        day.schedules.map((schedule, time) => {
          return (
            <div
              className={buildClassName(time)}
              key={`${day.date.getTime()}-${time}`}
            >
              <Schedule
                day={day}
                time={time}
                meals={meals}
                handlers={handlers}
              />
            </div>
          )
        })}
    </>
  )
}
