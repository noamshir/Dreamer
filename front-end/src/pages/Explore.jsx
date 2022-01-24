import React from "react";
import { connect } from 'react-redux'

import { loadGigs, setCategory } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller, setProfile } from '../store/scss.action.js';
import { GigList } from "../cmp/GigList";
import { Loader } from '../cmp/utils/Loader';


class _Explore extends React.Component {

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

    onGoToDetails = (gigId) => {
        this.props.history.push(`/explore/${gigId}`)
    }

    render() {
        const { gigs, filterBy } = this.props
        if (!gigs) return <Loader />
        return (
            <React.Fragment>
                {!gigs.length ? 'No Services Found For Your Search' :
                    <section className='explore'>
                        <section className="explore-main  max-width-container equal-padding">
                            {filterBy.category === '' ? <h1>All Categories</h1> : <h1>{filterBy.category}</h1>}
                            <div className="services-count">{gigs.length} services available</div>
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
        filterBy: state.gigModule.filterBy
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