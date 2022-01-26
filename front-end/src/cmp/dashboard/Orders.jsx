import { connect } from 'react-redux'
import React from 'react';

import { OrdersList } from "./OrdersList"
import { loadOrders, onChangeStatus } from '../../store/order.action';
import { socketService } from '../../services/socket.service';

class _Orders extends React.Component {

    state = {
        room: '',
        orders: null
    }

    async componentDidMount() {
        await this.props.loadOrders(this.props.user._id, this.props.type)
        socketService.setup()
        socketService.on('added order', this.onAddOrder)
        socketService.on('changed status', this.onUpdateOrder)
        this.setState(prevState => ({ ...prevState, room: this.props.user._id }), () => {
            socketService.emit('new room', this.state.room);
        })
        this.setState(prevState => ({ ...prevState, orders: this.props.orders }))
    }

    componentWillUnmount() {
        socketService.off('added order')
        socketService.off('changed status')
    }


    onAddOrder = (order) => {
        this.setState(prevState => ({ ...prevState, orders: [...this.state.orders, order] }))
    }

    onUpdateOrder = (order) => {
        const { orders } = this.state
        let ordersCopy = [...orders]
        ordersCopy = ordersCopy.map(currOrder => currOrder._id === order._id ? order : currOrder)
        this.setState(prevState => ({ ...prevState, orders: ordersCopy }))
    }

    render() {
        const { orders } = this.state
        if (!orders) return <React.Fragment></React.Fragment>
        return (
            <div className="orders-section max-width-container equal-padding">
                <header className="orders-header">
                    <h1>{this.props.user.username}'s orders</h1>
                </header>
                <main className="orders-content">
                    <OrdersList onChangeStatus={this.props.onChangeStatus} type={this.props.type} orders={orders} loadOrders={this.props.loadOrders} user={this.props.user} />
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders
    }
}

const mapDispatchToProps = {
    loadOrders,
    onChangeStatus
};


export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)
