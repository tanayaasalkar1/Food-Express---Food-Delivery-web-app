import React from 'react'
import './Header.css'
// import ExploreMenu from '../../ExploreMenu/ExploreMenu';
import { Navigate, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Wholesome Meals <br /> 
              <span className='inside-header'>at your doorstep.</span></h2>
            <p>
                Skip the line, not the flavor. <br />
                Your favorite food, delivered right on time. <br />
                Pick your plate – we’ll bring it to your gate!
            </p>
            <button onClick={() => window.location.href = '#explore-menu'} className='view-btn'>View Menu</button>

        </div>
    </div>
  )
}

export default Header