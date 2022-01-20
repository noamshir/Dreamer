import { connect } from 'react-redux'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';


import { onSetFilterBy } from '../store/gig.action.js'
import { gigService } from '../services/gig.service.js'

class _GigDetails extends React.Component {
    state = {
        gig: null
    }
    stars = [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />]

    async componentDidMount() {
        const { gigId } = this.props.match.params
        this.loadGig(gigId)
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        // console.log('gig in details', gig);
        this.setState(prevState => ({ ...prevState, gig }))
    }

    get getUserLevel() {
        const { gig } = this.state
        if (gig.owner.rate === 1 || gig.owner.rate < 3) {
            return gig.owner.level = 'New Seller'
        } else if (gig.owner.rate < 4) {
            return gig.owner.level = 'Level 1'
        } else if (gig.owner.rate < 4.5) {
            return gig.owner.level = 'Level 2'
        }
        return gig.owner.level = 'Top Rated Seller'
    }

    render() {
        const { gig } = this.state
        if (!gig) return <React.Fragment></React.Fragment>
        return (
            <section className='gig-details'>
                <header>

                </header>
                <h1>{gig.title}</h1>
                <div className="owner-info">
                    <div className='owner-img' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{this.getUserLevel}</h5>
                    <span>|</span>
                    {this.stars.map((star, idx) => {
                        if (idx < (gig.owner.rate - 1)) return <span key={idx} className='star active'>{star}</span>
                        else return <span key={idx} className='star'>{star}</span>
                    })}
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
    onSetFilterBy,
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)

// loadToy() {
//     const toyId = this.props.match.params.toyId
//     return toyService.getById(toyId)
// }