import { storageService } from "./async-storage.service.js";
// import Axios from 'axios'
// import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = "order_db";

export const orderService = {
    query,
    getById,
    save,
    remove,
    createOrders,
};

async function query() {
    // return httpService.get('order')
    return storageService.query(STORAGE_KEY);
    // return storageService.query(STORAGE_KEY, filterBy);
}
async function getById(orderId) {
    // return httpService.get(`order/${orderId}`)
    return storageService.get(STORAGE_KEY, orderId);
}
async function remove(orderId) {
    // return httpService.delete(`order/${orderId}`)
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, orderId);
}
async function save(order) {
    if (order._id) {
        // return httpService.put(`order/${order._id}`, order)
        return storageService.put(STORAGE_KEY, order);
    } else {
        // return httpService.post('order', order)
        // const user = userService.getLoggedinUser()
        // order.owner = user;
        return storageService.post(STORAGE_KEY, order);
    }
}

function createOrders() {
    return [
        {
            "_id": "o101",
            "createdAt": 9898989,
            // "buyer": { miniUser },
            // "seller": { miniUser },
            "order": {
                "_id": "g101",
                "name": "I will design your logo",
                "price": 12
            },
            "status": "pending"
        }
    ]
}
createOrders()