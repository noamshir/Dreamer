import React from 'react'
import { UserStarRate } from './UserStarRate'

export function DetailsHeader({ gig }) {

    function getUserLevel() {
        if (gig.owner.rate === 1 || gig.owner.rate < 3) {
            return gig.owner.level = 'New Seller'
        } else if (gig.owner.rate < 4) {
            return gig.owner.level = 'Level 1'
        } else if (gig.owner.rate < 4.5) {
            return gig.owner.level = 'Level 2'
        }
        return gig.owner.level = 'Top Rated Seller'
    }

    return (
        <React.Fragment>
            <h1>{gig.title}</h1>
            <div className="owner-info">
                <div className='owner-img' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                <h5 className='owner-name'>{gig.owner.fullname}</h5>
                <h5 className='owner-level'>{getUserLevel()}</h5>
                <span>|</span>
                <UserStarRate owner={gig.owner} />
            </div>
        </React.Fragment>
    )
}
