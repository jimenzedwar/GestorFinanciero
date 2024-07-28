
import './App.css'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AccessForm from './components/AccessForm/AccessForm'
import Home from './components/Reports/Reports'
import NotFound from './components/NotFound/NotFound'
import { client } from './supabase/client'
import Incomes from './components/Incomes/Incomes'
import Expenses from './components/Expenses/Expenses'
import Navbar from './components/Utils/Navbar'
function App() {
  const navigate = useNavigate()

useEffect(() => {
client.auth.onAuthStateChange((session) => {
  if(!session) {
    navigate('/login')
  }
}) 
}, [])

const isActiveLogin = location.pathname === "/login"
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/incomes' element={<Incomes/>}/>
        <Route path='/expenses' element={<Expenses/>}/>
        <Route path='/login' element={<AccessForm/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <div className={`${isActiveLogin ? "hidden" :'block'}`}>
      <Navbar/>
      </div>
      </div>
  )
}

export default App
