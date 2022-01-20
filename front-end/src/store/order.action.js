import { orderService } from "../services/order.service";




export function loadOrders() {
    return async (dispatch) => {
        const orders = await orderService.query()
        const action = { type: 'SET_ORDERS', orders };
        dispatch(action)
    }
}

export function add(order) {
    return async (dispatch) => {
        const savedOrder = await orderService.save(order)
        let action
        if (order._id) action = { type: 'UPDATE_ORDER', order: savedOrder };
        else action = { type: 'ADD_ORDER', order: savedOrder }
        dispatch(action)
        return Promise.resolve(savedOrder)
    }
}

export function remove(orderId) {
    return async (dispatch) => {
        await orderService.remove(orderId)
        const action = { type: 'REMOVE_ORDER', orderId }
        dispatch(action)
    }
}
