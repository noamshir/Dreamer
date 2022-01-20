import { connect } from 'react-redux'
import React from 'react'

import { gigService } from '../../services/gig.service'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
export function OrderModal({ gig }) {

    const features = gigService.getFeaturesByCategory(gig.categories[0])
    var { title } = gig
    title = _trimIWill(title);


    return (
        <div className='order-modal'>
            <div className='order-title-wrapper'>
                <h3 className='order-title'>{title}</h3>
                <span className='order-price'>${gig.price}</span>
            </div>
            <p className='order-subtitle'>{gig.title}</p>
            <div className='order-delivery'>
                <AccessTimeIcon className="clock-icon" />
                {gig.daysToMake} Days Delivery
            </div>
            <div className='order-features'>
                <ul className='clean-list'>
                    {features.map((feature, idx) => {
                        return (<li key={idx}>
                            <CheckIcon className="check-icon" />
                            {feature}
                        </li>)
                    })}
                </ul>
            </div>
            <button className='btn'>Continue (${gig.price})</button>
        </div>

    )
}

function _trimIWill(title) {
    title = title.trim();
    var titleToEdit = title.toLowerCase();
    if (titleToEdit.startsWith('i will')) {
        title = title.slice(7);
        title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    return title;
}