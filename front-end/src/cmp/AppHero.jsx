// import React from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { HeroPopularCategory } from './HeroPopularCategory'

export function AppHero(props) {
    return (
        <div className="hero-container">
            <div className='background-images'>
                <div className='background back1'>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608522/hero-portrait_2_ifwtha.png" />
                </div>
                <div className='background back2'>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_4_gfsdbz.png" />
                </div>
                <div className='background back3'>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642779088/hero-portrait_3_gl7r4m.png" />
                </div>
                <div className='background back4'>
                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642608521/hero-portrait_1_kxdfkl.png" />
                </div>
            </div>
            <div className="hero-content-container max-width-container">
                <div className='hero-content'>
                    <h1>Find the perfect <i>freelance</i> services for your business</h1>
                    <SearchBar placeholder='Try "designing business logo"' />
                    <HeroPopularCategory />
                </div>
                <div className="seller-name">
                    <span className='seller1'>Elton, <span className='seller-skill'>Programmer</span></span>
                    <span className='seller2'>Cabra, <span className='seller-skill'>Tattoo Artist</span></span>
                    <span className='seller3'>Sasha, <span className='seller-skill'>Fashion Designer</span></span>
                    <span className='seller4'>Mark, <span className='seller-skill'>Illustrator</span></span>
                </div>
            </div>
        </div>
    )
}