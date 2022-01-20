import React from 'react'
import StarIcon from '@mui/icons-material/Star';

export function UserStarRate({ owner }) {
    const stars = [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />]
    return (
        <React.Fragment>
            {stars.map((star, idx) => {
                if (idx < (owner.rate - 1)) return <span key={idx} className='star active'>{star}</span>
                else return <span key={idx} className='star'>{star}</span>
            })}
        </React.Fragment>
    )
}