import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './user/Auth/Login'
import Register from './user/Auth/register'
import Home from './user/pages/Home'
import Scrolltotop from './user/Component/Scrolltotop'
import Stores from './user/pages/Stores'
import CreateProduct from './admin/pages/CreateProduct'
import StoreDetails from './user/pages/StoreDetails'
import Orders from './user/pages/orders'
import About from './user/pages/Apropos'
import LoginAdmin from './admin/auth/loginadmin'
import Dashboard from './admin/pages/Dashboard'
import Layout from './admin/Component/layout'
import Productslist from './admin/pages/Productslist'
import CreateStore from './user/pages/create'
import Gestionproduct from './admin/pages/Gestionproduct'
import Ordre from './admin/pages/ordre'

function App() {

  return (
    <>
      <Scrolltotop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateStore />} />
        <Route path="/WholesaleHub">
          <Route path="Home" element={<Home />} />
          <Route path="magasins" element={<Stores />} />
          <Route path="magasin/:id" element={<StoreDetails />} />
          <Route path="mescommandes" element={<Orders />} />
          <Route path="About" element={<About />} />
        </Route>
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="produits" element={<Productslist />} />
          <Route path="productcreate" element={<CreateProduct />} />
          <Route path="productgestion" element={<Gestionproduct />} />
          <Route path="orders" element={<Ordre />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
