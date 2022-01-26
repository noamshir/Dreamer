import { connect } from 'react-redux'
import React,{ useState, useEffect } from 'react';

// import { orderService } from "../../services/order.service"
import { OrdersList } from "./OrdersList"
import { loadOrders } from '../../store/order.action';

function _Orders({ user, type, orders, loadOrders }) {
    // const [orders, setOrders] = useState([]);
    useEffect(async () => {
        loadOrders(user._id, type)
        // const userOrders = await orderService.query(user._id, type);
        // setOrders(userOrders);
        return () => {

        }
    }, [])
    if (!orders) return <React.Fragment></React.Fragment>
    return (
        <div className="orders-section max-width-container equal-padding">
            <header className="orders-header">
                <h1>{user.username}'s orders</h1>
            </header>
            <main className="orders-content">
                <OrdersList type={type} orders={orders} user={user} />
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders
    }
}

const mapDispatchToProps = {
    loadOrders
};


export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)