import { gigService } from '../services/gig.service'

export function HomeCategory(props) {
    var popularCategories = gigService.getPopularCategories(5);

    return (
        <div className='proffesional-services max-width-container equal-padding'>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category">{popularCategories[0]}</div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/logo-starbucks_w8plcz.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category">{popularCategories[1]}</div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/wordpress_dofxal.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>

                <div className="category">{popularCategories[2]}</div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/voice-over_ilnzmy.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>

                <div className="category">{popularCategories[3]}</div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/video-explainer_gjzhjs.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>

                <div className="category">{popularCategories[4]}</div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
            </div>
        </div>
    )
}