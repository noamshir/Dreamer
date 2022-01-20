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
            <h3 className='order-title'>{title}</h3>
            <h4 className='order-Subtitle'>{gig.title}</h4>
            <h3 className='order-price'>${gig.price}</h3>
            <div className='order-delivery'>
                <AccessTimeIcon />
                {gig.daysToMake} Days Delivery
            </div>
            <div className='order-features'>
                <ul>
                    {features.map((feature, idx) => {
                        return (<li key={idx}>
                            <CheckIcon />
                            {feature}
                        </li>)
                    })}
                </ul>
            </div>
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