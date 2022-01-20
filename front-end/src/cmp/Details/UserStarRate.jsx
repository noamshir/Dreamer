import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function UserStarRate({ owner }) {
    const stars = [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />]
    return (
        <div className='stars'>
            {stars.map((star, idx) => {
                if (idx < (owner.rate)) return <span key={idx} className='star'>{star}</span>
                else return <span key={idx} className='star'><StarOutlineIcon /></span>
            })}
        </div>
    )
}