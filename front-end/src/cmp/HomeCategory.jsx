import { gigService } from '../services/gig.service'

export function HomeCategory(props) {
    var popularCategories = gigService.getPopularCategories(5);

    return (<div className='proffesional-services-container max-width-container equal-padding'>
        <h1>Popular professional services</h1>
        <div className='proffesional-services'>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category-container">
                    <div className="subtitle">Brand your business </div>
                    <div className="title">{popularCategories[0]}</div>
                </div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/logo-starbucks_w8plcz.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category-container">
                    <div className="subtitle">Level up your site</div>
                    <div className="title">{popularCategories[1]}</div>
                </div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/wordpress_dofxal.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category-container">

                    <div className="subtitle">Share your message</div>
                    <div className="title">{popularCategories[2]}</div>
                </div>

                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/voice-over_ilnzmy.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category-container">

                    <div className="subtitle">Capture your audience</div>
                    <div className="title">{popularCategories[3]}</div>
                </div>

                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/video-explainer_gjzhjs.jpg" />
            </div>
            <div className='img-container'>
                <span className="on-click"></span>
                <div className="category-container">

                    <div className="subtitle">Extend your reach</div>
                    <div className="title">{popularCategories[4]}</div>
                </div>

                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
            </div>
        </div>
    </div>
    )
}