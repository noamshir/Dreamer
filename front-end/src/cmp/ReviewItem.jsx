import photo from "../svg/photo3.jpg";
export const ReviewItem = ({ review, width, imgUrl }) => {
    return (
        <div className="review-item" style={{ width: width }}>
            <img src={photo} alt="" />
            <div className="review-content">
                <div className="wrap-text">
                    <div className="writer-info">
                        <h5>{review.writers}</h5>
                        <h4>{review.company}</h4>
                    </div>
                    <p>{review.txt}</p>
                </div>
            </div>
        </div>
    );
};