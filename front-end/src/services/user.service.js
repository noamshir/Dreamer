import Axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

var axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY = 'user_db'
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
    // const user = await httpService.post('auth/login', credentials)
    // if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    // return user

    const users = storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === credentials.username &&
        user.password === credentials.password)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}
async function signup(userInfo) {
    // const user = await httpService.post('auth/signup', userInfo)
    // if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    // return user
    const user = await storageService.post(STORAGE_KEY, userInfo)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}
async function logout() {
    // const data = await httpService.post('auth/logout')
    // return data
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
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




function _createUsers() {
    return [
        {
            "_id": "u108",
            "fullname": "Baadur Lomidze",
            "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
            "isAdmin": false,
            "username": "BaadurL",
            "password": "BaadurLomidze",
            "sellerInfo": {
                "rate": 4,
                "origin": "Israel",
                "languages": ["en", "heb"],
                "skills": [
                    "logo-design",
                    "programming"
                ]
            },
            //should we seperate the reviews to a different json
            //and include here only a reviews id array???????
            "reviews":
                [
                    {
                        "id": "r101",
                        "txt": "Very kind and works fast",
                        "rate": 4,
                        "by": {
                            "_id": "u107",
                            "fullname": "Dwayne Loony",
                            "imgUrl": "assets/imgs/user/user107.jpg",
                        }
                    }
                ]
        },
        {
            "_id": "u107",
            "fullname": "Dwayne Loony",
            "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
            "isAdmin": false,
            "username": "BestSellerXo",
            "password": "secret",
            "sellerInfo": {
                "rate": 4,
                "origin": "Israel",
                "languages": ["eng", "heb"],
                "skills": [
                    "logo-design",
                    "programming"
                ]
            },
            "reviews": [
                {
                    "id": "madeId",
                    "txt": "Very kind and works fast",
                    "rate": 4,
                    "by": {
                        "_id": "u108",
                        "fullname": "Baadur Lomidze",
                        "imgUrl": "assets/imgs/user/user108.jpg",
                    }
                }
            ]
        },
    ]
}