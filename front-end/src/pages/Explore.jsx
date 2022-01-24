import React from "react";
import { connect } from 'react-redux'

import { loadGigs, setCategory } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller, setProfile } from '../store/scss.action.js';
import { GigList } from "../cmp/GigList";
import { Loader } from '../cmp/utils/Loader';


class _Explore extends React.Component {

    state = {
        sortBy: ''
    }

    componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search);
        this.filterBy = {}
        this.getFilterBy(urlParams)
        this.onSetExplore()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            this.filterBy = {}
            this.getFilterBy(urlParams)
        }
    }

    componentWillUnmount() {
        this.props.setCategory('all')
    }

    getFilterBy = (urlParams) => {
        if (urlParams.get('filterBy')) this.filterBy.category = urlParams.get('filterBy')
        if (urlParams.get('title')) this.filterBy.title = urlParams.get('title')
        if (this.filterBy.category) this.props.setCategory(this.filterBy.category)
        else this.props.setCategory('all')

        this.props.loadGigs(this.filterBy)
    }

    onSetExplore = () => {
        if (this.props.isExplore) return;
        this.props.setHome(false);
        this.props.setBecomeSeller(false);
        this.props.setDetails(false);
        this.props.setProfile(false);
        this.props.setExplore(true);
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.filterBy.sortBy = value
        this.setState(prevState => ({ ...prevState, [field]: value }), () => {
            this.props.loadGigs(this.filterBy)
        })
    }

    onGoToDetails = (gigId) => {
        this.props.history.push(`/explore/${gigId}`)
    }

    render() {
        const { gigs, category } = this.props
        const { sortBy } = this.state
        if (!gigs) return <Loader />
        return (
            <React.Fragment>
                {!gigs.length ? 'No Services Found For Your Search' :
                    <section className='explore'>
                        <section className="explore-main  max-width-container equal-padding">
                            {category === 'all' ? <h1>All Categories</h1> : <h1>{category}</h1>}
                            <div className="inner-container">
                                <div className="services-count">{gigs.length} services available</div>
                                <label htmlFor="sort" className='sort-label'>
                                    Sort by 
                                    <select className='sort-by' name="sortBy" id="sort" value={sortBy} onChange={this.handleChange}>
                                        <option value="best selling">Best Selling</option>
                                        <option value="title">Title</option>
                                        <option value="price">Price</option>
                                    </select>
                                </label>
                            </div>
                            <GigList gigs={gigs} onGoToDetails={this.onGoToDetails} />
                        </section>
                    </section >
                }
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user,
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        filterBy: state.gigModule.filterBy,
        category: state.gigModule.category
    }
}

const mapDispatchToProps = {
    loadGigs,
    setExplore,
    setHome,
    setDetails,
    setBecomeSeller,
    setProfile,
    setCategory
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)