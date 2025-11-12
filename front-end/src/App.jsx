import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './user/Auth/Login'
import Register from './user/Auth/register'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
