import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EventProvider = createContext()

const ContextApi = (props) => {
    const [user, setUser] = useState(null)
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [budgets, setBudgets] = useState([])
    const [payments, setPayments] = useState([])
    const [selectedBudget, setSelectedBudget] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [navigate])
  return (
    <EventProvider.Provider value={{user, setUser, events, setEvents, budgets, setBudgets, payments, setPayments, selectedEvent, setSelectedEvent, selectedBudget, setSelectedBudget}}>
      {props.children}
    </EventProvider.Provider>
  )
}

export const EventState = () => {
    return useContext(EventProvider)
}

export default ContextApi