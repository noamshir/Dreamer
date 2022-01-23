import { ReviewCarousel } from "./ReviewCarousel"
import { ReviewItem } from "./ReviewItem"
export function HomeReviews() {
    const reviews = [{ txt: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.", writers: "Caitlin Tormey, Chief Commercial Officer", company: "Meta", imgUrl: "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg" }, { txt: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.", writers: "Caitlin Tormey, Chief Commercial Officer", company: "Meta", imgUrl: "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg" }]
    return <section className="home-reviews">
        <div className="home-reviews-content max-width-container equal-padding flex">
            <div className="review">
                <ReviewCarousel>
                    {reviews && reviews.map((review, idx) => <ReviewItem key={idx} review={review} imgUrl={review.imgUrl}>
                    </ReviewItem>)}
                </ReviewCarousel>
            </div>
        </div>
    </section>
}
