import React from "react";
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Button } from "@mui/material";
import { loadGigs } from '../store/gig.action'


import { GigList } from "../cmp/GigList";

// import { loadToys, remove, toggleType } from '../store/toy.action'


class _Explore extends React.Component {

    componentDidMount() {
        this.props.loadGigs()
    }


    render() {
        const { gigs } = this.props
        return (
            <section className='explore'>
                <div className="explore-hero">
                    <p className='explore-hero-p'>
                        A whole world of freelance
                        talent at your fingertips
                    </p>
                </div>
                <GigList gigs={gigs}  />
            </section>
        )
    }
}



function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)