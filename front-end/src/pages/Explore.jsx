import React from "react";
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Button } from "@mui/material";
import { loadGigs } from '../store/gig.action'
import { GigList } from "../cmp/GigList";
import { setHome, setExplore, setDetails } from '../store/scss.action.js';


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
    }

    onGoToDetails = (gigId) => {
        this.props.history.push(`/explore/${gigId}`)
    }

    render() {
        const { gigs } = this.props
        return (
            <section className='explore'>
                {/* <div className="explore-hero">
                    <p className='explore-hero-p'>
                        A whole world of freelance
                        talent at your fingertips
                    </p>
                </div> */}
                <section className="explore-main  max-width-container equal-padding">
                    <GigList gigs={gigs} onGoToDetails={this.onGoToDetails} />

                </section>
            </section >
        )
    }
}



function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user,
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore
    }
}

const mapDispatchToProps = {
    loadGigs,
    setExplore,
    setHome,
    setDetails
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)