import StarIcon from '@mui/icons-material/Star';

import { UserStarRate } from "./UserStarRate";
import { ProgressBar } from "./ProgressBar";
import { ReviewPreview } from "./ReviewPreview";


export function ReviewList({ owner, gig }) {


    return (
        <section className='review-section'>
            <div className="stats-container">
                <div className='left-side-container'>
                    <div className='review-header'>
                        <div className='number-of-reviews'>
                            <span> {owner.reviews.length} </span>
                            Reviews
                        </div>
                        <div className='stars'>
                            <UserStarRate owner={owner.reviews} gig={gig} isReviews={true} />
                            <span className='num-of-rating'>{gig.owner.rate}</span>
                        </div>
                    </div>
                    <ProgressBar reviews={owner.reviews} />
                </div>
                <div className='right-side-container'>
                    <h4>Rating Breakdown</h4>
                    <ul className='clean-list'>
                        <div className='line'>
                            <li>Seller communication level</li>
                            <div className="star-rate">
                                <span>4.1</span>
                                <span className='star'><StarIcon /></span>
                            </div>
                        </div>
                        <div className='line'>
                            <li>Recommend to a friend</li>
                            <div className="star-rate">
                                <span>4.6</span>
                                <span className='star'><StarIcon /></span>
                            </div>
                        </div>
                        <div className='line'>
                            <li>Service as described</li>
                            <div className="star-rate">
                                <span>4.5</span>
                                <span className='star'><StarIcon /></span>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <button className='add-review-btn'>Add Review</button>
            <div className="list-of-reviews">
                {owner.reviews.map(review => <ReviewPreview key={review._id} review={review} />)}
            </div>
        </section>
    )
}