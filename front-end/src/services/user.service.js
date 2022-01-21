import Axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = 'user_db'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const userDescs = [
    'I have over 6 years of experience in WordPress and several custom themes. I can build Websites, troubleshooting WordPress, tweak WordPress, install, fix, move and customize.',
    'Hello Fiverr Visitors and thank you for checking out my profile! \n I am based in Miami, Florida USA and am a Business Entrepreneur with proven talent for driving website traffic along with a superior quality deliverable. A keen acumen and web building spirit help me in providing impeccable customer service for your personal or business website. I speak perfect English so feel free to connect with me and let\'s discuss your next project.',
    'I am an expert Electrical Engineer with more than 7 years of experience in Electrical and Electronics Engineering. My expertise are in fields of Electrical engineering, Analog and Digital Electronics, Communication Systems, VLSI, Control Systems, Digital Logic Design and Programming Languages C, C++, Python, AVR assembly, ARM assembly etc. I have command on various Engineering softwares for simulations and design of the complete project. I have also a lot of experience in software domain. Please check my GIGS for more details. Happy Ordering!',
    'I\'m a professional video editor and multimedia artist with over 4 years of experience and I am here to provide the best result possible.\n I am also a videographer in the Czech republic where I shoot mostly weddings.\n I specialize in video editing, but I can create stunning graphic design as well.\n 1. Professional video editing and delivery in Full HD or 4K quality in any format. \n 2. I am working with Adobe Premiere and After Effects to provide the best result possible.\n Feel free to contact me, if you have questions and I will answer :)\n Hope to hear from you soon! :)'
]

export const userService = {
    login,
    logout,
    signUp,
    getLoggedinUser,
    update,
    getUsers,
    getById,
    createUsers,
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
async function signUp(userInfo) {
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
    storageService.put(STORAGE_KEY, newUser)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser))
    return Promise.resolve(newUser)

}


async function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await httpService.get(`user/${userId}`)
    // return user
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

// async function loadUsers() {
//     storageService.query(STORAGE_KEY)
// }

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22})




function createUsers() {
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
                "languages": ["en", "he"],
                "skills": [
                    "logo-design",
                    "programming"
                ],
                "sellerDesc": userDescs[utilService.getRandomIntInclusive(0, userDescs.length - 1)]
            },

            "reviews":
                [
                    {
                        "_id": "r101",
                        "txt": "Very kind and works fast",
                        "rate": 4,
                        "createdAt": 19834823429,
                        "by": {
                            "_id": "u107",
                            "fullname": "Dwayne Loony",
                            "origin": "Israel",
                            "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
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
                ],
                "sellerDesc": userDescs[utilService.getRandomIntInclusive(0, userDescs.length - 1)]
            },
            "reviews": [
                {
                    "_id": "madeId123",
                    "txt": "Very kind and works fast",
                    "createdAt": Date.now(),
                    "rate": 4,
                    "by": {
                        "_id": "u108",
                        "fullname": "Baadur Lomidze",
                        "origin": "Israel",
                        "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
                    }
                }
            ]
        },
    ]
}