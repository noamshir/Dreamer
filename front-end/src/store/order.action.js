import { orderService } from "../services/order.service";




export function loadOrders(userId, type) {
    return async (dispatch) => {
        const userOrders = await orderService.query(userId, type);
        const action = { type: 'SET_ORDERS', orders: userOrders };
        dispatch(action)
    }
}

export function addOrder(gig, user, owner) {
    return async (dispatch) => {
        const savedOrder = await orderService.fixOrder(gig, user, owner)
        const action = { type: 'ADD_ORDER', order: savedOrder }
        dispatch(action)
        return Promise.resolve(savedOrder)
    }
}

export function updateOrder(order) {
    return async (dispatch) => {
        const savedOrder = await orderService.save(order)
        const action = { type: 'UPDATE_ORDER', order: savedOrder };
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

export function onChangeStatus(order, value) {
    return async (dispatch) => {
        const savedOrder = await orderService.changeStatus(order, value)
        const action = { type: 'UPDATE_ORDER', order: savedOrder };
        dispatch(action)
        return Promise.resolve(savedOrder)
    }
}
