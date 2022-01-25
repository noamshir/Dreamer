
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { gigService } from '../../services/gig.service.js';
import { loadGigs, onSetFilterBy } from '../../store/gig.action.js';

function _AppSubHeader(props) {
    const [isWatched, setWatched] = useState('all')
    const [categories, setCategories] = useState([]);
    let sticky = "";
    let display = "block"
    if (props.isHome) {
        display = "none";
        sticky = "sticky"
        if (props.isSearchBar) {
            display = "block"
        }
    }
    if (props.isProfile) display = "none"
    useEffect(async () => {
        var ans = await getCategories();
        setCategories(ans);
        setWatched(props.filterBy.category.toLowerCase())
        return () => {
        }
    }, [props.filterBy.category])

    const getCategories = async () => {
        const categories = await gigService.getCategories();
        return categories
    }

    const onSetCategory = (category) => {
        if (!category) category = 'all'
        setWatched(category)
        props.onSetFilterBy({ category }, 'category')
        props.history.push(`/explore?category=${category}`)
    }

    if (!categories.length) return <span></span>;
    return <header className={`sub-header ${sticky} ${display}`}>
        <nav className={`sub-header-content max-width-container equal-padding flex`}>
            <ul className="categories flex clean-list">
                <li className={isWatched === 'all' ? `medium active` : 'medium'} onClick={() => {
                    onSetCategory()
                }}><span className="categorie-nav">All</span></li>
                {categories && categories.map((category, idx) => {
                    var className;
                    if (idx >= 0 && idx < 5) className = `medium`;
                    else if (idx >= 5 && idx < 8) className = 'large';
                    return <li key={idx} className={isWatched === category ? `${className} active` : className} onClick={() => {
                        onSetCategory(category)
                    }}><span className="categorie-nav">{category}</span></li>
                })}
            </ul>
        </nav>
    </header>
}

function mapStateToProps(state) {
    return {
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        isSearchBar: state.scssModule.isSearchBar,
        isProfile: state.scssModule.isProfile,
        filterBy: state.gigModule.filterBy
    }
}

const mapDispatchToProps = {
    loadGigs,
    onSetFilterBy
};

const _AppSubHeaderWithRouter = withRouter(_AppSubHeader)
export const AppSubHeader = connect(mapStateToProps, mapDispatchToProps)(_AppSubHeaderWithRouter);