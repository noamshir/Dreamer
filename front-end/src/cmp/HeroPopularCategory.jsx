import { connect } from 'react-redux'
import { gigService } from '../services/gig.service'
import { useState, useEffect } from 'react';


function _HeroPopularCategory() {
    const [popularCategories, setCategories] = useState([]);
    useEffect(async () => {
        var ans = await getCategories();
        setCategories(ans);
        return () => {
        }
    }, [])
    const getCategories = async () => {
        return await gigService.getPopularCategories(4);
    }
    return (
        <ul className="clean-list hero-popular-category">
            Popular:
            {popularCategories.map((category, idx) => {
                return (
                    <li key={idx}>
                        <button className="btn-popular-category">{category}</button>
                    </li>
                )
            })}
        </ul>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.gigModule.categories
    }
}

const mapDispatchToProps = {}

export const HeroPopularCategory = connect(mapStateToProps, mapDispatchToProps)(_HeroPopularCategory)