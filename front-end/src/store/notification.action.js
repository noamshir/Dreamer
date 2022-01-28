import { notificationService } from "../services/notification.service";




export function loadNotifications(userId, type) {
    return async (dispatch) => {
        try {
            const userNotifications = await notificationService.query(userId, type);
            const action = { type: 'SET_NOTIFICATIONS', notifications: userNotifications };
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function addNotification(userId, txt, type = 'notification') {
    return async (dispatch) => {
        try {
            const savedNotification = await notificationService.saveNotification(userId, txt, type)
            const action = { type: 'ADD_NOTIFICATION', notification: savedNotification }
            dispatch(action)
            return savedNotification
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function updateNotification(notification) {
    return async (dispatch) => {
        try {
            const savedNotification = await notificationService.save(notification)
            const action = { type: 'UPDATE_NOTIFICATION', notification: savedNotification };
            dispatch(action)
            return savedNotification
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function remove(notificationId) {
    return async (dispatch) => {
        try {
            await notificationService.remove(notificationId)
            const action = { type: 'REMOVE_NOTIFICATION', notificationId }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}