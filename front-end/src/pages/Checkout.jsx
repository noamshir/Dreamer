import React from "react";
import { connect } from "react-redux";
import { UserStarRate } from "../cmp/Details/UserStarRate";
import { gigService } from "../services/gig.service";
import { userService } from "../services/user.service";
import { setExplore, setHome, setDetails, setBecomeSeller, setProfile } from '../store/scss.action';



class _Checkout extends React.Component {
    state = {
        gig: null,
        owner: null
    }

    async componentDidMount() {
        const { gigId } = this.props.match.params
        this.onSetProfile();
        await this.loadGig(gigId)
        this.loadOwner(this.state.gig.owner._id)
    }
    onSetProfile = () => {
        if (this.props.isProfile) return;
        this.props.setExplore(false);
        this.props.setHome(false);
        this.props.setDetails(false);
        this.props.setBecomeSeller(false);
        this.props.setProfile(true);
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        this.setState(prevState => ({ ...prevState, gig }))
    }
    loadOwner = async (userId) => {
        const owner = await userService.getById(userId)
        this.setState(prevState => ({ ...prevState, owner }))
    }

    getAvgRate = () => {
        const { owner, gig } = this.state
        if (!owner.reviews.length) return ''
        const acc = owner.reviews.reduce((acc, review) => {
            acc += +review.rate
            return acc
        }, 0)
        gig.owner.rate = (acc / owner.reviews.length).toFixed(1)
        return (acc / owner.reviews.length).toFixed(1)
    }

    render() {
        const { gig, owner } = this.state
        console.log('order', owner);
        if (!gig || !owner) return <React.Fragment></React.Fragment>
        return (
            <section className='checkout' >
                <div style={{ height: '80px' }}></div>
                <div className="main-content-container">
                    <div className="img-container">
                        <img src={gig.imgUrls[0]} alt="first image"></img>
                    </div>
                    <div className="main">
                        <h3>{gig.title}</h3>
                        <div className="star-rate-container">
                            <UserStarRate owner={owner.reviews} gig={gig} isReviews={true} />
                            <span className='num-of-rating'>{this.getAvgRate()}</span>
                            <span className='review-length'>({owner.reviews.length})</span>
                        </div>
                    </div>
                    <div className="price">{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
                </div>
            </section>
        )
    }
}

function mapStateToProps({ scssModule }) {
    return {
        isProfile: scssModule.isProfile
    }
}

const mapDispatchToProps = {
    setExplore, setHome, setDetails, setBecomeSeller, setProfile
}

export const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout)