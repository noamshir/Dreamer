import React from "react";
import { utilService } from "../../services/util.service";
import { UserStarRate } from "./UserStarRate";


export function AboutSeller({ gig, getUserLevel, owner }) {

    if (!owner) return <React.Fragment></React.Fragment>
    return (
        <div className='about-seller' id="AboutSeller">
            <h2 className='about-seller-header'>About the Seller</h2>
            <div className="seller-info">
                <div className='owner-img' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                <div className="seller-name-level-rate">
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{getUserLevel()}</h5>
                    <UserStarRate gig={gig} isSeller={true} owner={owner} />
                </div>
            </div>
            <div className='seller-table'>
                <div className="seller-stats">
                    <div className="card">
                        <h4>From</h4>
                        <h4>{owner.sellerInfo.origin}</h4>
                    </div>
                    <div className="card">
                        <h4>Member since</h4>
                        <h4>Feb 2022</h4>
                    </div>
                    <div className="card">
                        <h4>Avg. response time</h4>
                        <h4>{utilService.getRandomIntInclusive(1, 4)} hours</h4>
                    </div>
                    <div className="card">
                        <h4>Last delivery</h4>
                        <h4>about {utilService.getRandomIntInclusive(1, 24)} hours</h4>
                    </div>
                    <div className="seller-desc">
                        <p>{owner.sellerInfo.sellerDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}