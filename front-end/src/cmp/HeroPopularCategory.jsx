import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { gigService } from '../services/gig.service'


function _HeroPopularCategory(props) {
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
                        <button className="btn-popular-category" onClick={() => {
                            props.history.push(`/explore?filterBy=${category}`)
                        }}>{category}</button>
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

const _HeroPopularCategoryWithRouter = withRouter(_HeroPopularCategory);
export const HeroPopularCategory = connect(mapStateToProps, mapDispatchToProps)(_HeroPopularCategoryWithRouter)