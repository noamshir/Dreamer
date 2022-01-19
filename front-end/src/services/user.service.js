import Axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

var axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    update,
    getUsers,
    getById
}
window.us = userService

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user

    // const users = storageService.query(STORAGE_KEY)
    // const user = users.find(user => user.username === credentials.username &&
    //     user.password === credentials.password)
    // return user
}
async function signup(userInfo) {
    const user = await httpService.post('auth/signup', userInfo)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
    // const user = await storageService.post(STORAGE_KEY, userInfo)
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    // return user
}
async function logout() {
    const data = await httpService.post('auth/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return data
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function update(UpdatedUser) {
    const loggedinUser = getLoggedinUser()
    const newUser = {
        ...loggedinUser,
        ...UpdatedUser
    }
    console.log(newUser);
    storageService.put(STORAGE_KEY, newUser)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser))
    return Promise.resolve(newUser)

}


async function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22})




function createUsers() {
    return [
        {
            "_id": "u101",
            "fullname": "Dwayne Loony",
            "imgUrl": "assets/imgs/user107.jpg",
            "isAdmin": false,
            "isSeller": true,
            "username": "BestSellerXo",
            "password": "secret",
            "level": "level 2",
            "reviews": [
                {
                    "id": "madeId",
                    "txt": "Very kind and works fast",
                    "rate": 4,
                    "by": {
                        "_id": "u102",
                        "fullname": "shay gilceous",
                        "imgUrl": "assets/imgs/user102.jpg"
                    }
                }
            ],
            likedGigs: [
                {
                    "_id": "i101",
                    "name": "Design Logo",
                    "imgUrl": "url1",
                    "price": 20
                },
            ]
        },
    ]
}