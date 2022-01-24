import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import { connect } from 'react-redux'

import { userService } from '../services/user.service';
import { gigService } from '../services/gig.service';
// import { saveSellerInfo } from '../store/user.action'
import { UserDetails } from '../cmp/profile/UserDetails'
import { SellerDetails } from '../cmp/profile/SellerDetails'
import { GigList } from '../cmp/GigList'
import { withRouter } from 'react-router-dom';
import { setHome, setExplore, setDetails, setProfile } from '../store/scss.action.js';

// import { initialService } from '../initials/initial.service';

function _UserProfile(props) {
    const { setHome, setExplore, setDetails, setProfile, match } = props
    const [gigs, setGigs] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(async () => {
        setExplore(false);
        setHome(false);
        setDetails(false)
        setProfile(true);
        onSetGigs(await onSetUser());
    }, [])

    async function onSetUser() {
        const userToSet = await userService.getById(match.params.userId)
        console.log('set user', userToSet);
        setUser(userToSet);
        return userToSet;
    }
    async function onSetGigs(user) {
        const gigs = await gigService.query({ userId: user._id })
        setGigs(gigs);
    }
    if (!user) return <React.Fragment></React.Fragment>
    return (
        <React.Fragment>
            <div className="profile-details-container">
                <UserDetails className="user-details" user={user} />
                {user.sellerInfo && <SellerDetails user={user} />}
            </div>
            <GigList gigs={gigs} />
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        // user: state.userModule.user,
    }
}



const mapDispatchToProps = {
    // saveSellerInfo,
    setDetails,
    setExplore,
    setHome,
    setProfile,
};

const _UserProfileWithRouter = withRouter(_UserProfile);
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfileWithRouter)