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
import CreateProduct from './user/pages/CreateProduct'
import StoreDetails from './user/pages/StoreDetails'
import Orders from './user/pages/orders'

function App() {

  return (
    <>
    <Scrolltotop/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateStore />} />
        <Route path='/productcreate' element={<CreateProduct />} />
        <Route path="/WholesaleHub/magasin/:id" element={<StoreDetails/>} />
        <Route path="/WholesaleHub/mescommandes" element={<Orders/>} />
        <Route path="/WholesaleHub" element={<Header />}> 
          <Route path="Home" element={<Home/>} />
          <Route path="magasins" element={<Stores/>} />
          <Route path="store/:id/produit/:id" element={<h1>Dashboard Organisateur</h1>} />
          <Route path="ordres" element={<h1>Dashboard Organisateur</h1>} />
          <Route path="Apropos" element={<h1>Dashboard Organisateur</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
