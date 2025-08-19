import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Footer from './components/Footer/Footer'
import LogInPopup from './components/LogInPopup/LogInPopup'
import Cart from './pages/cart/cart'
import PlaceOrder from './pages/place_order/place_order'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LogInPopup setShowLogin={setShowLogin}/> : null}
      <div className='app'> 
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place_order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/my_orders' element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
