import { connect } from 'react-redux'
import React from 'react'

import { onSetFilterBy } from '../store/gig.action'
import { DetailsHeader } from '../cmp/Details/DetailsHeader'
import { OrderModal } from '../cmp/Details/OrderModal'
import { gigService } from '../services/gig.service'


class _GigDetails extends React.Component {
    state = {
        gig: null
    }

    async componentDidMount() {
        const { gigId } = this.props.match.params
        this.loadGig(gigId)
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        // console.log('gig in details', gig);
        this.setState(prevState => ({ ...prevState, gig }))
    }


    render() {
        const { gig } = this.state
        if (!gig) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                <section className='gig-details'>
                    <DetailsHeader gig={gig} />
                    <OrderModal gig={gig} />
                </section>
            </React.Fragment>
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
    onSetFilterBy,
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)