import { gigService } from '../services/gig.service'

export function HomeCategory(props) {
    var popularCategories = gigService.getPopularCategories(5);

    return (
        <div className='proffesional-services max-width-container equal-padding'>
            <div className='img-container'>
                {popularCategories[0]}
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/logo-starbucks_w8plcz.jpg" />
            </div>
            <div className='img-container'>
                {popularCategories[1]}
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/wordpress_dofxal.jpg" />
            </div>
            <div className='img-container'>
                {popularCategories[2]}
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/voice-over_ilnzmy.jpg" />
            </div>
            <div className='img-container'>
                {popularCategories[3]}
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/video-explainer_gjzhjs.jpg" />
            </div>
            <div className='img-container'>
                {popularCategories[4]}
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
            </div>
        </div>
    )
}