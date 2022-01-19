import { storageService } from "./async-storage.service.js";
// import Axios from 'axios'
// import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = "gig_db";

export const gigService = {
    query,
    getById,
    save,
    remove,
    // toggleInStock,
};

async function query(filterBy) {
    // filterBy = { name: '', type: 'all', selectedLabels: 'all', sortBy: 'name' }
    // return httpService.get('gig')
    return storageService.query(STORAGE_KEY);
    // return storageService.query(STORAGE_KEY, filterBy);
}
async function getById(gigId) {
    // return httpService.get(`gig/${gigId}`)
    return storageService.get(STORAGE_KEY, gigId);
}
async function remove(gigId) {
    // return httpService.delete(`gig/${gigId}`)
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, gigId);
}
async function save(gig) {
    if (gig._id) {
        // return httpService.put(`gig/${gig._id}`, gig)
        return storageService.put(STORAGE_KEY, gig);
    } else {
        // return httpService.post('gig', gig)
        // const user = userService.getLoggedinUser()
        // gig.owner = user;
        return storageService.post(STORAGE_KEY, gig);
    }
}

// async function toggleInStock(gigId) {
//     const gig = await httpService.get(`gig/${gigId}`)
//     gig.inStock = !gig.inStock
//     const data = await save(gig)
//     return data
// }

function _createGigs() {
    return [
        {
            "_id": "g101",
            "title": "I will design your logo",
            "price": 12,
            "owner": {
                "_id": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "assets/imgs/user/user107.jpg",
                "level": "Level 1",
                "rate": 4
            },
            "daysToMake": 3,
            "description": "Make unique logo...",
            "imgUrls": ["assets/imgs/gig/g101-1.jpeg", "assets/imgs/gig/g101-2.jpeg"],
            "categories": [
                "logo-design",
                "illustration",
            ]
        },
        {
            "_id": "g102",
            "title": "I will design your illustration",
            "price": 120,
            "owner": {
                "_id": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "assets/imgs/user/user107.jpg",
                "level": "Level 1",
                "rate": 4
            },
            "daysToMake": 3,
            "description": "aquire my services for unique illustration...",
            "imgUrls": ["assets/imgs/gig/g102-1.jpeg", "assets/imgs/gig/g102-2.jpeg"],
            "categories": [
                "illustration",
            ]
        },
        {
            "_id": "g103",
            "title": "I will teach you js",
            "price": 200,
            "owner": {
                "_id": "u108",
                "fullname": "Baadur Lomidze",
                "imgUrl": "assets/imgs/user/user108.jpg",
                "level": "Level 1",
                "rate": 4,
            },
            "daysToMake": 1,
            "description": "Teaching JavaScript",
            "imgUrls": ["assets/imgs/gig/g103-1.jpeg", "assets/imgs/gig/g103-2.jpeg"],
            "categories": ["Programming"],
        },
        {
            "_id": "g104",
            "title": "I will design your website",
            "price": 150,
            "owner": {
                "_id": "u108",
                "fullname": "Baadur Lomidze",
                "imgUrl": "assets/imgs/user/user108.jpg",
                "level": "Level 1",
                "rate": 4,
            },
            "daysToMake": 7,
            "description": "The best design for your website...",
            "imgUrls": ["assets/imgs/gig/g104-1.jpeg", "assets/imgs/gig/g104-2.jpeg"],
            "categories": ["Programming"],
        },
    ]
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
