
import './App.css'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AccessForm from './components/AccessForm/AccessForm'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import { client } from './supabase/client'
function App() {
  const navigate = useNavigate()

useEffect(() => {
client.auth.onAuthStateChange((event, session) => {
  if(!session) {
    navigate('/login')
  }
}) 
}, [])
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/income' element={<Home/>}/> //TODO CHANGE THE COMPONENT
        <Route path='/expenses' element={<Home/>}/> //TODO CHANGE THE COMPONENT
        <Route path='/login' element={<AccessForm/>}/>
        <Route path='*' element={<NotFound/>}/> //TODO MAKE A PAGE 404
      </Routes>
      </div>
  )
}

export default App
