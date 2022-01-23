export const ReviewItem = ({ review, width, imgUrl }) => {
    return (
        <div className="review-item" style={{ width: width }}>
            <img src={imgUrl} alt="" />
            <div className="review-content">
                <div className="wrap-text">
                <h5>{review.writers}</h5>
                <h4>{review.company}</h4>
                <p>{review.txt}</p>
                </div>
            </div>
        </div>
    );
};