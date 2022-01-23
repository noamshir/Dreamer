import React, { setState, useEffect } from 'react'
// import Select from 'react-select'
import { connect } from 'react-redux'


import { userService } from '../services/user.service';
import { gigService } from '../services/gig.service';
import { saveSellerInfo } from '../store/user.action'

import { setHome, setExplore, setDetails, setProfile } from '../store/scss.action.js';

// import { initialService } from '../initials/initial.service';

function _UserProfile({ setHome, setExplore, setDetails, setProfile, user }) {
    // const [count, setCount] = useState(0); 
    useEffect(() => {
        setExplore(false);
        setHome(false);
        setDetails(false)
        setProfile(true);
    }, [])


    return (
        <div className="profile-details-container">
            <div>online</div>
        </div>
        // <div>{user.fullName}</div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    saveSellerInfo,
    setDetails,
    setExplore,
    setHome,
    setProfile,
};


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)