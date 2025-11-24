import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './user/Auth/Login'
import Register from './user/Auth/register'
import Home from './user/pages/Home'
import Scrolltotop from './user/Component/Scrolltotop'
import Stores from './user/pages/Stores'
import CreateStore from './user/pages/create'
import CreateProduct from './user/pages/CreateProduct'
import StoreDetails from './user/pages/StoreDetails'
import Orders from './user/pages/orders'
import About from './user/pages/Apropos'
import LoginAdmin from './admin/auth/loginadmin'

function App() {

  return (
    <>
      <Scrolltotop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateStore />} />
        <Route path='/productcreate' element={<CreateProduct />} />
        <Route path="/WholesaleHub">
          <Route path="Home" element={<Home />} />
          <Route path="magasins" element={<Stores />} />
          <Route path="magasin/:id" element={<StoreDetails />} />
          <Route path="mescommandes" element={<Orders />} />
          <Route path="About" element={<About />} />
        </Route>
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </>
  )
}

export default App
