import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './user/Auth/Login'
import Register from './user/Auth/register'
import Header from './user/Component/header'
import Home from './user/pages/Home'
import Scrolltotop from './user/Component/Scrolltotop'
import Stores from './user/pages/Stores'
import CreateStore from './user/pages/create'

function App() {

  return (
    <>
    <Scrolltotop/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateStore />} />

        
          <Route path="Home" element={<Home/>} />
          <Route path="magasins" element={<Stores/> } />
        
      </Routes>
    </>
  )
}

export default App
