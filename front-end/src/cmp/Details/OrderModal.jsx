import { connect } from 'react-redux'
import React from 'react'

import { gigService } from '../../services/gig.service'


function _OrderModal(props) {





    return (
        <div>order</div>

    )
}


function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    // onSetFilterBy,
}

export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(_OrderModal)