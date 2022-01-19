import React from "react";
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Button } from "@mui/material";

// import { loadToys, remove, toggleType } from '../store/toy.action'


class _Explore extends React.Component {




    render() {
        return (
            <section className='explore'>
                <div className="explore-hero">
                    <p>
                        A whole world of freelance
                        talent at your fingertips
                    </p>
                </div>
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
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)