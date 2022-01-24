import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import { connect } from 'react-redux'


import { userService } from '../services/user.service';
import { gigService } from '../services/gig.service';
// import { saveSellerInfo } from '../store/user.action'
import { UserDetails } from '../cmp/profile/UserDetails'
import { SellerDetails } from '../cmp/profile/SellerDetails'
import { GigList } from '../cmp/GigList'

import { setHome, setExplore, setDetails, setProfile } from '../store/scss.action.js';

// import { initialService } from '../initials/initial.service';

function _UserProfile({ setHome, setExplore, setDetails, setProfile, user }) {
    const [gigs, setGigs] = useState([]);
    useEffect(() => {
        setExplore(false);
        setHome(false);
        setDetails(false)
        setProfile(true);
        onSetGigs();
    }, [])

    // useEffect(() => {
    //     onSetGigs()
    // }, [gigs])
    async function onSetGigs() {
        const gigs = await gigService.query({ userId: user._id })
        setGigs(gigs);
    }

    return (
        <React.Fragment>
            <div className="profile-details-container">
                <UserDetails className="user-details" user={user} />
                <SellerDetails user={user} />
            </div>
            <GigList gigs={gigs} />
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    // saveSellerInfo,
    setDetails,
    setExplore,
    setHome,
    setProfile,
};


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)