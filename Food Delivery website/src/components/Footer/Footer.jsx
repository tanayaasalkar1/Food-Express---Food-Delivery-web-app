import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Hungry? We’ve got you covered.
                    Fresh. Fast. Delivered with love. <br />
                    © 2025 FoodieExpress
                </p>
                <div className="footer-social">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-123-456-789</li>
                    <li>foodieexpress.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-text-bottom">
            copyright © 2025 FoodieExpress | All rights reserved
        </p>
        
    </div>
  )
}

export default Footer