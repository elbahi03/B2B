import React from 'react'
import Router from './Router'
import Route from './Route'
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Register />} />
        <Route path="/WholesaleHub" element={<Header />}> 
          <Route path="Home" element={<h1>Dashboard Organisateur</h1>} />
          <Route path="store" element={<UserEvents/>} />
          <Route path="store/:id" element={<ParticipantsOrg/>} />
          <Route path="store/:id/produit/:id" element={<CheckinPage />} />
          <Route path="ordres" element={<CheckoutPage />} />
          <Route path="Apropos" element={<CheckoutPage />} />
        </Route>
      </Router>
      
    </>
  )
}

export default App
