



export function ProgressBar({ reviews }) {
    const arr = [5, 4, 3, 2, 1]

    function getReviewRateCount(val) {
        let acc = 0
        reviews.forEach(review => {

            if (review.rate === val) {
                acc++
            }

        })
        return acc
    }

    return (
        <div className='progress-bar'>
            {arr.map(val => {
                const acc = getReviewRateCount(val)
                return <div className="bar" key={val}>
                    <span className={`star-name bar-${val}`}>{val} {val === 1 ? 'star' : 'stars'}</span>
                    <div className='progress-bar-container'>
                        <span className='first-span'></span>
                        <span className='second-span' style={{ width: (((acc / reviews.length) * 100) + '%') }}></span>
                    </div>
                    <span>{`(${acc})`}</span>
                </div>
            })}
        </div >
    )
}