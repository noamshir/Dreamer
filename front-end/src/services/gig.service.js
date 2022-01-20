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
    createGigs,
    toggleLike,
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

async function toggleLike(gigId, user) {
    // const gig = await httpService.get(`gig/${gigId}`)
    const gig = await getById(gigId)
    if (user) {
        const miniUser = {
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            _id: user._id
        }
        gig.likedByUser = [...gig.likedByUser, miniUser]
    } else {
        storageService.saveGuestGigs(gig)
    }
    const data = await save(gig)
    return data
}

function createGigs() {
    return [
        {
            "_id": "g101",
            "title": "I will design your logo",
            "price": 12,
            "owner": {
                "_id": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
                "rate": 4
            },
            "daysToMake": 3,
            "description": "Make unique logo...",
            "imgUrls": ["https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg", "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg"],
            "categories": [
                "logo-design",
                "illustration",
            ],
            "likedByUser": [{
                "userId": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
            }]
        },
        {
            "_id": "g102",
            "title": "I will design your illustration",
            "price": 120,
            "owner": {
                "_id": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
                "rate": 4
            },
            "daysToMake": 3,
            "description": "aquire my services for unique illustration...",
            "imgUrls": ["https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg", "https://images.pexels.com/photos/1569002/pexels-photo-1569002.jpeg"],
            "categories": [
                "illustration",
            ],
            "likedByUser": [{
                "userId": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
            }]
        },
        {
            "_id": "g103",
            "title": "I will teach you js",
            "price": 200,
            "owner": {
                "_id": "u108",
                "fullname": "Baadur Lomidze",
                "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
                "rate": 5,
            },
            "daysToMake": 1,
            "description": "Teaching JavaScript",
            "imgUrls": ["https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg"],
            "categories": ["Programming"],
            "likedByUser": [{
                "userId": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
            }]
        },
        {
            "_id": "g104",
            "title": "I will design your website",
            "price": 150,
            "owner": {
                "_id": "u108",
                "fullname": "Baadur Lomidze",
                "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
                "rate": 5,
            },
            "daysToMake": 7,
            "description": "The best design for your website...",
            "imgUrls": ["https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg", "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"],
            "categories": ["Programming"],
            "likedByUser": [{
                "userId": "u107",
                "fullname": "Dwayne Loony",
                "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
            }]
        },
    ]
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
