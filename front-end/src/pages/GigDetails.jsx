import { connect } from 'react-redux'
import React from 'react'

import { DetailsHeader } from '../cmp/Details/DetailsHeader'
import { OrderModal } from '../cmp/Details/OrderModal'
import { Carousel } from '../cmp/Carousel'
import { CarouselItem } from '../cmp/CarouselItem'
import { AboutSeller } from '../cmp/Details/AboutSeller'
import { AboutGig } from '../cmp/Details/AboutGig'
import { ReviewList } from '../cmp/Details/ReviewList'

import { userService } from '../services/user.service'
import { gigService } from '../services/gig.service'

import { onSetFilterBy } from '../store/gig.action'
import { setHome, setExplore, setDetails } from '../store/scss.action.js';
import { GigHeader } from '../cmp/header/GigHeader'



class _GigDetails extends React.Component {
    state = {
        gig: null,
        owner: null
    }

    async componentDidMount() {
        const { gigId } = this.props.match.params
        this.onSetDetails();
        await this.loadGig(gigId)
        this.loadOwner(this.state.gig.owner._id)
    }

    onSetDetails = () => {
        if (this.props.isDetails) return;
        this.props.setExplore(false);
        this.props.setHome(false);
        this.props.setDetails(true)
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        this.setState(prevState => ({ ...prevState, gig }))
    }
    loadOwner = async (userId) => {
        const owner = await userService.getById(userId)
        this.setState(prevState => ({ ...prevState, owner }))
    }

    getUserLevel = () => {
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
        const { gig, owner} = this.state
        if (!gig || !owner) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                <GigHeader gig={gig} />
                <section className='gig-details max-width-container equal-padding'>
                    <div className="details-main-container">
                        <DetailsHeader gig={gig} getUserLevel={this.getUserLevel} owner={owner} />
                        <Carousel gig={gig} isDetails={true}>
                            {gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                        </Carousel>
                        <OrderModal modalClass="in-details" gig={gig} />
                        <AboutGig gig={gig} owner={owner} />
                        <AboutSeller gig={gig} getUserLevel={this.getUserLevel} owner={owner} />
                        <ReviewList owner={owner} gig={gig} />
                    </div>
                    <OrderModal modalClass="aside" gig={gig} />
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
    setDetails,
    setExplore,
    setHome
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)