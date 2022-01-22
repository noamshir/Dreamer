import { Carousel } from "./Carousel"
import { CarouselItem } from "./CarouselItem"

export function HomeReviews() {
    const reviews = [{ txt: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.", writers: "Caitlin Tormey, Chief Commercial Officer", company: "Meta", imgUrl: "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg" },{ txt: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.", writers: "Caitlin Tormey, Chief Commercial Officer", company: "Meta", imgUrl: "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg" }]
    return <section className="home-reviews">
        <Carousel>
            { reviews.map((review,idx)=><CarouselItem key={idx} imgUrl={review.imgUrl}></CarouselItem>)}
        </Carousel>
    </section>
}