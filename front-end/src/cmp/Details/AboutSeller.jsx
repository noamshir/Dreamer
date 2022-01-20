import { UserStarRate } from "./UserStarRate";


export function AboutSeller({ gig, getUserLevel, owner }) {


    return (
        <div className='about-seller'>
            <h1 className='about-seller-header'>About the Seller</h1>

            <div className="seller-info">
                <div className='owner-img' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                <div className="seller-name-level-rate">
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{getUserLevel()}</h5>
                    <UserStarRate gig={gig} isSeller={true} owner={owner}/>
                </div>
            </div>
        </div>
    )
}