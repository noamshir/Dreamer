import StarIcon from '@mui/icons-material/Star';



export function GigPreview({ gig }) {

    console.log('gig', gig.owner.imgUrl);

    return (
        <section className='gig-preview'>
            <div className='card'>
                <img src={`${gig.imgUrls[0]}`} alt="image" />
                <div className="owner-info">
                    <img src={`${gig.owner.imgUrl}`} alt="owner" />
                    <h5>{gig.owner.fullname}</h5>
                    <h5>{gig.owner.level}</h5>
                </div>
                <p>{gig.title}</p>
                <div className='rate-wrapper'>
                    <span className='gig-rating'><StarIcon /> {gig.owner.rate}</span>
                </div>
            </div>
        </section>
    )
}