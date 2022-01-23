import React from "react";
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Button } from "@mui/material";


import { loadGigs } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller } from '../store/scss.action.js';

import { GigList } from "../cmp/GigList";
import { Loader } from '../cmp/utils/Loader';


class _Explore extends React.Component {

    componentDidMount() {
        this.props.loadGigs()
        this.onSetExplore()
    }

    onSetExplore = () => {
        if (this.props.isExplore) return;
        this.props.setExplore(true);
        this.props.setHome(false);
        this.props.setDetails(false)
        this.props.setBecomeSeller(false);
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
    setBecomeSeller
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)