import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

import { UserProfileImg } from "../profile/UserProfileImg"
import { loadOrders, onChangeStatus } from '../../store/order.action'
import React from 'react';


function _OrderPreview(props) {
    const showingType = (props.type === 'buyer') ? 'seller' : 'buyer';
    var statusClass;
    if (props.order.orderStatus === ('pending' || 'delivered')) statusClass = 'outline';
    if (props.order.orderStatus === 'rejected') statusClass = 'red';
    if (props.order.orderStatus === 'active') statusClass = 'green';

    const getStatus = () => {
        switch (props.order.orderStatus) {
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

    const setStatus = async (value) => {
        await props.onChangeStatus(props.order, value)
        props.loadOrders(props.user._id, props.type)
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
                    <NavLink to={`/explore/${props.order.gig._id}`}>
                        <div className='img-container'>
                            <img src={props.order.gig.img} alt='img' />
                        </div>
                    </NavLink>
                    <div className='user-info flex'>
                        <h5>{props.order[showingType].username}</h5>
                        <UserProfileImg isLink={true} user={props.order[showingType]} />
                    </div>
                </div>
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{props.order.gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{props.order.gig.daysToMake === 1 ? `${props.order.gig.daysToMake} day` : `${props.order.gig.daysToMake} days`}</span>
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
                        {props.order.orderStatus === 'pending' && <button className={`status button ${statusClass}`
                        } onClick={() => {
                            setStatus('rejected')
                        }}>Reject
                        </button>}
                    </div>
                    :
                    <span className={`status ${statusClass}`}>{props.order.orderStatus}</span>}
            </div>
        </ section >
    )
}


function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = {
    onChangeStatus,
    loadOrders
};


export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)
