// import React from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { HeroPopularCategory } from './HeroPopularCategory'

export function AppHero(props) {
    return (
        <div className="hero-container">
            <div className='background-images'>
                {/* <div className='background'><img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_3_y5jms3.png" /></div> */}
                {/* <div className='background'><img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_4_gfsdbz.png" /></div> */}
                {/* <div className='background'><img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608522/hero-portrait_2_ifwtha.png" /></div> */}
                <div className='background max-width-container'>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_1_kxdfkl.png" />
                    <span className='seller-name'>Mark, <span className='seller-skill'>Illustrator</span></span>
                </div>
            </div>
            <div className="hero-content-container max-width-container">
                <div className='hero-content'>
                    <h1>Find the perfect <i>freelance</i> services for your business</h1>
                    <SearchBar placeholder='Try "designing business logo"' />
                    <HeroPopularCategory />
                </div>
            </div>
        </div>
    )
}