import { connect } from 'react-redux'
import { useState } from 'react'
import { onSetFilterBy } from '../store/gig.action'

function _GigDetails(props) {

    return (
        <div>Details</div>
    )
}


function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    onSetFilterBy
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)

// loadToy() {
//     const toyId = this.props.match.params.toyId
//     return toyService.getById(toyId)
// }