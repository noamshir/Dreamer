export const ReviewItem = ({ review, width, imgUrl }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            <img src={imgUrl} alt="" />
            <div className="review-content">
                <h5>{review.writers}</h5>
                <h4>{review.company}</h4>
                <p>{review.txt}</p>
            </div>
        </div>
    );
};