import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './user/Auth/Login'
import Register from './user/Auth/register'
import Header from './user/Component/header'
import Home from './user/pages/Home'
import Scrolltotop from './user/Component/Scrolltotop'

function App() {

  return (
    <>
    <Scrolltotop/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/WholesaleHub" element={<Header />}> 
          <Route path="Home" element={<Home/>} />
          <Route path="kaka" element={<h1>hello</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
