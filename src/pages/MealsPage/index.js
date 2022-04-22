import React, { useState, useEffect } from 'react'
import LineLoader from '../../components/LineLoader'

import api from '../../services/api'
import './style.css'

export default function MealsPage() {
  // Loading & Error
  const [loading, setLoading] = useState(true)

  // Form Fields
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [energy, setEnergy] = useState('')
  const [carbohydrates, setCarbohydrates] = useState('')
  const [proteins, setProteins] = useState('')
  const [lipids, setLipids] = useState('')

  // Data
  const [meals, setMeals] = useState([])

  // Effect
  useEffect(() => {
    setLoading(true)

    api
      .getMeals()
      .then((response) => {
        setMeals(response)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Meal
    const meal = {
      id,
      title,
      description,
      energy,
      carbohydrates,
      proteins,
      lipids
    }

    // Post
    async function postMeal() {
      const response = await api.postMeal(meal)

      if (response) {
        meal.id = response.id
        meal.visible = true
        meal.created_at = new Date().toISOString().slice(0, 10)

        setMeals([meal, ...meals])
      }
    }

    // Put
    async function putMeal() {
      const response = await api.putMeal(meal, meal.id)

      if (response) {
        const index = meals.findIndex((m) => m.id === meal.id)
        const meals_ = [...meals]

        meals_[index].title = title
        meals_[index].description = description
        meals_[index].energy = energy
        meals_[index].carbohydrates = carbohydrates
        meals_[index].proteins = proteins
        meals_[index].lipids = lipids

        setMeals(meals_)
      }
    }

    if (id) {
      putMeal()
    } else {
      postMeal()
    }

    handleReset(e)
  }

  const handleReset = () => {
    setId(null)
    setTitle('')
    setDescription('')
    setEnergy('')
    setCarbohydrates('')
    setProteins('')
    setLipids('')
  }

  const onLoadMeal = (meal) => {
    setId(meal.id)
    setTitle(meal.title)
    setDescription(meal.description)
    setEnergy(meal.energy ?? 0)
    setCarbohydrates(meal.carbohydrates ?? 0)
    setProteins(meal.proteins ?? 0)
    setLipids(meal.lipids ?? 0)
  }

  const onRemoveMeal = (meal) => {
    // Delete
    async function deleteMeal() {
      const response = await api.deleteMeal(meal.id)
      if (response) {
        setMeals(meals.filter((m) => m.id !== meal.id))
      }
    }

    if (window.confirm('Você realmente quer remover?')) {
      deleteMeal()
    }
  }

  const toggleVisible = (id) => {
    const index = meals.findIndex((m) => m.id === id)

    // Put
    async function putMeal(index) {
      const meals_ = [...meals]
      meals_[index].visible = !meals_[index].visible

      const response = await api.putMeal(meals_[index], id)

      if (response) {
        setMeals(meals_)
      }
    }

    putMeal(index)
  }

  return (
    <div id="meal">
      <header className="meal__header">
        <h1>Refeições</h1>
      </header>

      <div className="meal__body">
        <div className="meal__form">
          <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
            <h3>Formulário</h3>

            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minLength={3}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                required
              />
            </div>

            <div className="inline-group">
              <div className="form-group">
                <label htmlFor="energy">Energia (Kcal)</label>
                <input
                  name="energy"
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  min={0}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="carbohydrates">Carbohidratos (g)</label>
                <input
                  name="carbohydrates"
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                  min={0}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="proteins">Proteína (g)</label>
                <input
                  name="proteins"
                  value={proteins}
                  onChange={(e) => setProteins(e.target.value)}
                  min={0}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lipids">Lipídios (g)</label>
                <input
                  name="lipids"
                  value={lipids}
                  onChange={(e) => setLipids(e.target.value)}
                  min={0}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="inline-btn-group">
              <button type="submit" className="btn btn-primary">
                {!!id ? 'Atualizar' : 'Enviar'}
              </button>
              <button type="reset" className="btn">
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <table className="meal__table">
          <thead>
            <tr className="">
              <th></th>
              <th>Refeições</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="loader">
                <td colSpan={1000}>
                  <LineLoader />
                </td>
              </tr>
            ) : (
              ''
            )}

            {meals.map((meal) => (
              <tr key={meal.id} className={meal.id === id ? 'active' : ''}>
                <td
                  className="clickable"
                  onClick={() => toggleVisible(meal.id)}
                >
                  {meal.visible ? (
                    <i className="bx bx-checkbox-checked"></i>
                  ) : (
                    <i className="bx bx-checkbox"></i>
                  )}
                </td>
                <td className="description">
                  <strong>{meal.title}</strong>
                  <p>{meal.description}</p>
                </td>
                <td className="clickable" onClick={() => onLoadMeal(meal)}>
                  <i className="bx bx-edit-alt"></i>
                </td>
                <td className="clickable" onClick={() => onRemoveMeal(meal)}>
                  <i className="bx bxs-eraser"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
