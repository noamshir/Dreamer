import React from 'react'
import { UserStarRate } from './UserStarRate'

export function DetailsHeader({ gig, getUserLevel, owner }) {

    return (
        <div className='details-header' id='Overview'>
            <h1>{gig.title}</h1>
            <div className="owner-info">
                <div className='owner-img' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                <h5 className='owner-name'>{gig.owner.fullname}</h5>
                <h5 className='owner-level'>{getUserLevel()}</h5>
                <span className='spacer'>|</span>
                <UserStarRate gig={gig} owner={owner} />
            </div>
        </div>
    )
}
