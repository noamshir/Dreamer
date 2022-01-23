import React from 'react'
// import Select from 'react-select'
import { connect } from 'react-redux'


import { userService } from '../services/user.service';
import { gigService } from '../services/gig.service';
import { saveSellerInfo } from '../store/user.action'
// import { initialService } from '../initials/initial.service';

function _UserProfile({ user }) {
    // console.log('user.fullName:', user.fullName);

    return (
        <div>!!</div>
        // <div>{user.fullName}</div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    saveSellerInfo
};


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)