import StarIcon from '@mui/icons-material/Star';



export function GigPreview({ gig }) {

    console.log('gig', gig.imgUrls[0]);

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
                <div className="gig-img" >
                    <img src={`${gig.imgUrls[0]}`} alt="image" />
                </div>
                <div className="owner-info">
                    <div className='owner-pic' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                    <div className="owner-level-name">
                        <h5 className='owner-name'>{gig.owner.fullname}</h5>
                        <h5>{getUserLevel()}</h5>
                    </div>
                </div>
                <p>{gig.title}</p>
                <div className='rate-wrapper'>
                    <span className='gig-rating'><StarIcon /> {gig.owner.rate} <span>(+1k)</span></span>
                </div>
            </div>
        </section>
    )
}