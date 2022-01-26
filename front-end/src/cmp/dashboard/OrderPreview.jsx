import { NavLink } from "react-router-dom";
import React from 'react';

import { UserProfileImg } from "../profile/UserProfileImg"
import { socketService } from "../../services/socket.service";


export function OrderPreview({ order, type, user, onChangeStatus }) {
    const showingType = (type === 'buyer') ? 'seller' : 'buyer';
    var statusClass;
    if (order.orderStatus === ('pending' || 'delivered')) statusClass = 'outline';
    if (order.orderStatus === 'rejected') statusClass = 'red';
    if (order.orderStatus === 'active') statusClass = 'green';

    const getStatus = () => {
        switch (order.orderStatus) {
            case 'pending': {
                return 'Approve'
            }
            case 'active': {
                return 'Active'
            }
            case 'rejected': {
                return 'Denied'
            }
        }

    }

    const setStatus = (value) => {
        if (order.orderStatus === 'rejected' || order.orderStatus === 'active') return
        order.orderStatus = value
        onChangeStatus(order)
        socketService.emit('new status', order)
    }
    // var date = new Date(order.createdAt)
    // var month = date.getUTCMonth() + 1; //months from 1-12
    // var day = date.getUTCDate();
    // var year = date.getUTCFullYear();
    // var createdAt = year + '/' + month + '/' + day;
    return (
        <section className={showingType === 'buyer' ? `order-preview flex eighty` : `order-preview flex`}>
            <div className="main flex">
                <div className='inner flex'>
                    <NavLink to={`/explore/${order.gig._id}`}>
                        <div className='img-container'>
                            <img src={order.gig.img} alt='img' />
                        </div>
                    </NavLink>
                    <div className='user-info flex'>
                        <h5>{order[showingType].username}</h5>
                        <UserProfileImg isLink={true} user={order[showingType]} />
                    </div>
                </div>
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{order.gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{order.gig.daysToMake === 1 ? `${order.gig.daysToMake} day` : `${order.gig.daysToMake} days`}</span>
                </div>
            </div>
            <div className="status-container">
                <span className='order-type'>Order Status:</span>
                {showingType === 'buyer' ?
                    <div className='btn-wrapper flex'>
                        <button className={`status button ${statusClass}`
                        } onClick={() => {
                            setStatus('active')
                        }}>{getStatus()}
                        </button>
                        {order.orderStatus === 'pending' && <button className={`status button ${statusClass}`
                        } onClick={() => {
                            setStatus('rejected')
                        }}>Reject
                        </button>}
                    </div>
                    :
                    <span className={`status ${statusClass}`}>{order.orderStatus}</span>}
            </div>
        </ section >
    )
}


// function mapStateToProps(state) {
//     return {
//     }
// }

// const mapDispatchToProps = {
//     onChangeStatus,
// };


// export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)
