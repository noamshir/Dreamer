import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
// import Axios from 'axios'
// import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = "gig_db";
const categories = [
    { "category": "logo-design", "features": ['1 Concept Included', 'Logo Transparency', 'Vector File', 'Printable File', '3D Mockup', 'Source File'] },
    { "category": "wordpress", "features": ['1 Page', 'Design Customization', 'Content Upload', 'Responsive Design'] },
    { "category": "voice-over", "features": ['HQ Audio File (WAV format)', 'Number Of Words: 150'] },
    { "category": "video-explainer", "features": ['Background Music', 'Add Logo', '60 Seconds Running Time'] },
    { "category": "social-media", "features": ['1 Platform', 'Page Setup', 'Profile Image & Cover', 'Website Integration'] },
    { "category": "programming", "features": ['Include Source Code', 'Database Integration', 'Setup File', 'Detailed Code Comments', '3D Mockup', 'Source File'] },
    { "category": "translation", "features": ['Proofreading', 'Document Formatting', 'Number od words: 300'] },
    { "category": "illustration", "features": ['Source File', 'High Resolution', 'Background/Scene', 'Color', 'Full Body', 'Commercial Use', '1 Figure'] }
]
const descriptions = [
    'Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn\'t like prebuilt websites.I started alone in 2016 and currently I\'m leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.',
    'I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It\'s my responsibility to provide a Quick & Quality Service.I\'ve done hours of research on WC Tasks & I\'m an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.',
    'I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.',
    'I\'m your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I\'ll narrate an upload, your voiceover project, whatever it might be. I do audio books, children\'s books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I\'ll do it quickly professionally and make sure it\'s of the highest quality. Hey, it\'s your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I\'ll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.'
]

export const gigService = {
    query,
    getById,
    save,
    remove,
    createGigs,
    toggleLike,
    getCategories,
    getFeaturesByCategory
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

function getCategories() {
    return categories.map(category => category.category);
}
function getFeaturesByCategory(categoryName) {
    console.log('categoryName:', categoryName);
    const category = categories.find(category => category.category === categoryName);
    console.log('category:', category);
    return category.features;
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
            "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
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
            "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
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
            "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
            "imgUrls": ["https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg"],
            "categories": ["programming"],
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
            "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
            "imgUrls": ["https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg", "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"],
            "categories": ["programming"],
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
