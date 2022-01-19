// import React from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { HeroPopularCategory } from './HeroPopularCategory'

export function AppHero(props) {
    return (
        <div className="hero-container">
            <div className='background-images'></div>
            <div className='hero-content'>
                <h1>Find the perfect <i>freelance</i> services for your business</h1>
                <SearchBar />
                <HeroPopularCategory />
            </div>
        </div>
    )
}