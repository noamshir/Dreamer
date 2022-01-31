import { NavLink } from "react-router-dom";
import React from 'react';

import { UserProfileImg } from "../profile/UserProfileImg"
import { socketService } from "../../services/socket.service";
import { utilService } from "../../services/util.service";

export function OrderPreview({ order, type, user, onChangeStatus }) {
    const showingType = (type === 'buyer') ? 'seller' : 'buyer';
    const atIdx = order[showingType].username.indexOf('@');
    const username = order[showingType].username;
    const slicedUsername = atIdx < 0 ? username : username.slice(0, atIdx);
    var statusClass;

    if (order.orderStatus === ('pending' || 'delivered')) statusClass = 'gray';
    if (order.orderStatus === 'rejected') statusClass = 'deactivated red';
    if (order.orderStatus === 'active') {
        if (type === 'seller') statusClass = 'deactivated green'
        else statusClass = 'green';
    }


    const getStatus = () => {
        switch (order.orderStatus) {
            case 'pending': {
                return 'Approve'
            }
            case 'active': {
                return 'Active'
            }
            case 'rejected': {
                return 'Rejected'
            }
        }

    }

    const setStatus = (value) => {
        if (order.orderStatus === 'rejected' || order.orderStatus === 'active') return
        order.orderStatus = value
        onChangeStatus(order)
        const notification = {
            _id: utilService.makeId(8),
            sender: user,
            type: order.orderStatus,
            createdAt: Date.now(),
            msg: createMsg(order.orderStatus)
        }
        socketService.emit('new status', { order, notification })
    }
    const createMsg = (status) => {
        var msg = {}
        if (status === "active") {
            msg.title = "Order approved!"
            msg.content = "The seller approved your order"
            msg.subHeader = "You can now view it in the dashboard"
        }
        else if (status === "rejected") {
            msg.title = "Order was rejected!"
            msg.content = "The seller rejected your order"
            msg.subHeader = "Dont worry! we have many other gigs for you"
        }
        return msg;
    }
    const formatDate = () => {
        var { createdAt } = order
        createdAt = new Date(createdAt)
        var month = createdAt.toLocaleString('default', { month: 'short' })
        var year = createdAt.getFullYear();
        var hours = createdAt.getHours();
        var minutes = createdAt.getMinutes();
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        var formatedDate = `${hours}:${minutes} ${month} ${year}`
        return formatedDate;
    }

    return (
        <section className={showingType === 'buyer' ? `order-preview flex eighty` : `order-preview flex`}>
            <div className="main">
                <NavLink className="gig-img" to={`/explore/${order.gig._id}`}>
                    <div className='img-container'>
                        <img src={order.gig.img} alt='img' />
                    </div>
                </NavLink>
                <div className='user-info flex'>
                    <h5>{slicedUsername}</h5>
                    <UserProfileImg isLink={true} user={order[showingType]} />
                </div>
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{order.gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{order.gig.daysToMake === 1 ? `${order.gig.daysToMake} day` : `${order.gig.daysToMake} days`}</span>
                </div>
                <div className="order-date flex">
                    <span className='title'>Issued At</span>
                    <span className='date'>{formatDate()}</span>
                </div>
            </div>
            <div className="status-container">
                <span className='order-type'>Order Status:</span>
                {showingType === 'buyer' ?
                    <div className='btn-wrapper flex'>
                        <button className={`button ${getStatus() === 'Rejected' ? 'red' : 'green'}`
                        } onClick={() => {
                            setStatus('active')
                        }}>{getStatus()}
                        </button>
                        {order.orderStatus === 'pending' && <button className={'button red'}
                            onClick={() => {
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