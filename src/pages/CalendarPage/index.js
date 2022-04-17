import React, { useState, useEffect } from 'react'
import CalendarWeek from '../../components/CalendarWeek'
import LineLoader from '../../components/LineLoader'

import api from '../../services/api'
import './style.css'

//
export default function CalendarPage() {
  // Loading
  const [loading, setLoading] = useState(true)

  // Loaded Data
  const [meals, setMeals] = useState([])
  const [quantities, setQuantities] = useState([])

  // Data
  const [weeks, setWeeks] = useState([])

  // Fields
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthName, setMonthName] = useState(
    new Date().toLocaleString('pt-BR', { month: 'long' })
  )

  // Togglers
  const [quantitiesToggler, setQuantitiesToggler] = useState(
    JSON.parse(localStorage.getItem('hide-quantities'))
  )

  // Effect
  useEffect(() => {
    setLoading(true)

    // Loading Schedule
    api
      .getSchedules(month, year)
      .then((schedules) => {
        //
        let date = new Date(year, month, 1)
        let groupedSchedules = []

        // Converting dates
        schedules.forEach((s) => {
          s.date = s.date.slice(0, 10)
          s.date = new Date(s.date.split('-').map(Number).join('-'))
        })

        // Grouping Schedules
        while (date.getMonth() === month) {
          // Only weekdays
          if (date.getDay() > 0 && date.getDay() < 6) {
            // Empty Day
            const day = {
              ...isTodayOrPast(date),
              date: new Date(date),
              schedules: [null, null, null]
            }

            // Seaching for schedules on that day
            while (
              schedules.length > 0 &&
              isSameDate(date, schedules[0].date)
            ) {
              // Removed from array
              const [schedule] = schedules.splice(0, 1)
              // Added to day
              day.schedules[schedule.time] = schedule
            }

            groupedSchedules.push(day)
          }

          // Increment
          date.setDate(date.getDate() + 1)
        }

        // Breaking schedules up to weeks
        const weeks = []
        while (groupedSchedules.length > 0) {
          const day = groupedSchedules[0].date.getDay()
          const week = groupedSchedules.splice(0, 6 - day)

          week.forEach((day) => {
            day.week = weeks.length
          })

          weeks.push(week)
        }

        setWeeks(weeks)
        calculateQuantities(weeks)
      })
      .catch((err) => {
        console.log(err)
        setWeeks([])
      })
      .finally(() => {
        setLoading(false)
      })

    // Loading Meals
    if (meals.length === 0) {
      api
        .getMeals(true)
        .then((meals) => setMeals(meals))
        .catch(() => setMeals([]))
    }
  }, [year, month, meals.length])

  // Date Related Function
  const isSameDate = (d1, d2) =>
    d1.getYear() === d2.getYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  const calculateQuantities = (weeks) => {
    let quantities = {}

    weeks
      .flatMap((week) => week)
      .flatMap((day) => day.schedules)
      .filter((schedule) => schedule !== null)
      .forEach((schedule) => {
        if (quantities[schedule.meal_id]) {
          quantities[schedule.meal_id].qty += 1
        } else {
          quantities[schedule.meal_id] = {
            qty: 1,
            title: schedule.title
          }
        }
      })

    quantities = Object.values(quantities)
    quantities.sort((a, b) =>
      a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    )

    setQuantities(quantities)
  }

  const isTodayOrPast = (date) => {
    const today = new Date() // new Date(2022, 3, 5)

    return {
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),

      isPast:
        date.getFullYear() < today.getFullYear() ||
        (date.getFullYear() === today.getFullYear() &&
          date.getMonth() < today.getMonth()) ||
        (date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() < today.getDate())
    }
  }

  const findIndexes = (day, time) => {
    return [
      day.week,
      weeks[day.week].findIndex((d) => isSameDate(d.date, day.date)),
      time
    ]
  }

  // Handlers
  const onSetMeal = (day, time, meal) => {
    const [idxWeek, idxDay, idxTime] = findIndexes(day, time)

    // Schedule
    let schedule = weeks[idxWeek][idxDay].schedules[idxTime]

    setLoading(true)

    // POST
    if (schedule === null) {
      const obj = {
        meal_id: meal.id,
        date: day.date.toISOString().slice(0, 10),
        time: time
      }

      api
        .postSchedule(obj)
        .then((id) => {
          const schedule = {
            ...meal,
            id: id,
            meal_id: meal.id,
            date: day.date,
            time: time
          }

          const weeks_ = [...weeks]
          weeks_[idxWeek][idxDay].schedules[idxTime] = schedule
          setWeeks(weeks_)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setLoading(false))
    } else {
      // PUT
      api
        .putSchedule({ meal_id: meal.id }, schedule.id)
        .then(() => {
          const schedule = {
            ...weeks[idxWeek][idxDay].schedules[idxTime + 1],
            meal_id: meal.id,
            title: meal.title,
            description: meal.description
          }

          const weeks_ = [...weeks]
          weeks_[idxWeek][idxDay].schedules[idxTime] = schedule
          setWeeks(weeks_)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setLoading(false))
    }
  }

  const onRemoveSchedule = (day, time) => {
    const [idxWeek, idxDay, idxTime] = findIndexes(day, time)
    const id = weeks[idxWeek][idxDay].schedules[idxTime].id

    const msg = 'Você realmente quer remover?'
    if (!window.confirm(msg)) return

    console.log(idxWeek, idxDay, idxTime, id)
    console.log(weeks[idxWeek][idxDay].schedules[idxTime])
    console.log(meals[0])

    setLoading(true)
    api
      .deleteSchedule(id)
      .then((response) => {
        const weeks_ = [...weeks]
        weeks_[idxWeek][idxDay].schedules[idxTime] = null
        setWeeks(weeks_)
      })
      .finally(() => setLoading(false))
  }

  // Render
  return (
    <>
      <div id="calendar">
        {/* HEADER */}
        <div className="calendar__header">
          <h1>Calendário {monthName}</h1>

          <nav>
            <input
              type="month"
              value={`${year}-${(month + 1).toString().padStart(2, '0')}`}
              required
              onChange={(e) => {
                const [year, month] = e.target.value.split('-').map(Number)

                setMonthName(
                  new Date(year, month - 1, 1).toLocaleString('pt-BR', {
                    month: 'long'
                  })
                )

                setYear(year)
                setMonth(month - 1)
              }}
            />

            <button
              id="meals-stats-toggler"
              onClick={() => {
                localStorage.setItem(
                  'hide-quantities',
                  JSON.stringify(!quantitiesToggler)
                )
                setQuantitiesToggler(!quantitiesToggler)
              }}
            >
              <i className="bx bx-bar-chart-alt-2"></i>
            </button>
          </nav>
        </div>

        {/* NAMES */}
        <div className="days__names">
          <span>SEG</span>
          <span>TER</span>
          <span>QUA</span>
          <span>QUI</span>
          <span>SEX</span>
        </div>

        {/* BODY */}
        <div className="calendar__body bg-striped">
          {/* LOADER */}
          {loading ? <LineLoader /> : ''}

          {/* WEEKS */}
          {weeks.map((week, key) => (
            <CalendarWeek
              key={`week-${key}`}
              week={week}
              meals={meals}
              handlers={{
                onSetMeal,
                onRemoveSchedule
              }}
            />
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className={`calendar__stats ${quantitiesToggler ? 'toggled' : ''}`}>
        <h3 className="heading">Contagem</h3>

        {quantities.map((meal, key) => (
          <div className="stat" key={`qty-${key}`}>
            <span className="title">{meal.title}</span>
            <span className="qty">{meal.qty}</span>
          </div>
        ))}
      </div>
    </>
  )
}
