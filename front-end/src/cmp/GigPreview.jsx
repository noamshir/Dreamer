import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

import { Carousel } from "./Carousel";
import { CarouselItem } from "./CarouselItem";



export function GigPreview({ gig }) {
    const [likeMsgClass, setClass] = useState(false)


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
        <section className='gig-preview'>
            <div className='card'>
                {/* <div className="" > */}
                <div className="gig-img">
                    <Carousel>
                        {gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                    </Carousel>
                </div>
                {/* </div> */}
                <div className="owner-info">
                    <div className='owner-pic' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                    <div className="owner-level-name">
                        <h5 className='owner-name'>{gig.owner.fullname}</h5>
                        <h5 className='owner-level'>{getUserLevel()}</h5>
                    </div>
                </div>
                <p className='gig-title'>{gig.title}</p>
                <div className='rate-wrapper'>
                    <span className='gig-rating'><StarIcon /> {gig.owner.rate}<span className='review-number'>(1k+)</span></span>
                </div>
                <div className="price-like-container">

                    <span className='popup like' onMouseLeave={() => {
                        setClass(false)
                    }} onMouseEnter={() => {
                        setClass(true)
                    }}><FavoriteIcon />
                        <span className={likeMsgClass ? 'popuptext show' : 'popuptext'}> add to favorite</span>
                    </span>
                    <ul className='clean-list'>
                        <li className='starting-price'>Starting At</li>
                        <li>{gig.price.toLocaleString("ILS", { style: "currency", currency: "ILS" })}</li>
                    </ul>
                </div>
            </div>
        </section >
    )
}