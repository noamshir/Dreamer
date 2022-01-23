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
    { "category": "logo design", "features": ['1 Concept Included', 'Logo Transparency', 'Vector File', 'Printable File', '3D Mockup', 'Source File'] },
    { "category": "wordpress", "features": ['1 Page', 'Design Customization', 'Content Upload', 'Responsive Design'] },
    { "category": "voice over", "features": ['HQ Audio File (WAV format)', 'Number Of Words: 150'] },
    { "category": "video explainer", "features": ['Background Music', 'Add Logo', '60 Seconds Running Time'] },
    { "category": "social media", "features": ['1 Platform', 'Page Setup', 'Profile Image & Cover', 'Website Integration'] },
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
    getPopularCategories,
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

function getPopularCategories(numOfCategories) {
    var popularCategories = categories.slice(0, numOfCategories);
    return popularCategories.map(category => {
        return `${category.category.charAt(0).toUpperCase()}${category.category.slice(1)}`
    })
}
function getFeaturesByCategory(categoryName) {
    const category = categories.find(category => category.category === categoryName);
    console.log('category:', category);
    return category.features;
}

function createGigs() {
    // var array = [
    //     {
    //         "_id": "g101",
    //         "title": "I will design your logo",
    //         "price": 12,
    //         "owner": {
    //             "_id": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
    //             "rate": 4
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg", "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg"],
    //         "categories": [
    //             "logo design",
    //             "illustration",
    //         ],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="

    //         }]
    //     },
    //     {
    //         "_id": "g102",
    //         "title": "I will design your illustration",
    //         "price": 120,
    //         "owner": {
    //             "_id": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
    //             "rate": 4
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg", "https://images.pexels.com/photos/1569002/pexels-photo-1569002.jpeg"],
    //         "categories": [
    //             "illustration",
    //         ],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g103",
    //         "title": "I will teach you js",
    //         "price": 200,
    //         "owner": {
    //             "_id": "u108",
    //             "fullname": "Baadur Lomidze",
    //             "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
    //             "rate": 5,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg"],
    //         "categories": ["programming"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g104",
    //         "title": "I will design your website",
    //         "price": 150,
    //         "owner": {
    //             "_id": "u108",
    //             "fullname": "Baadur Lomidze",
    //             "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
    //             "rate": 5,
    //         },
    //         "daysToMake": 7,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg", "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"],
    //         "categories": ["programming"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g105",
    //         "title": "I will craft a logo for you",
    //         "price": 130,
    //         "owner": {
    //             "_id": "u201",
    //             "fullname": "Eleonora Oliversen",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_10_eg0mae.jpg",
    //             "rate": 3,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/pexels-katya-wolf-8715869_jbv8kp.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/radio-6115819_960_720_s8o6wa.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/sketch-3064403_960_720_jyfxcq.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/picture-frame-3042585_960_720_ebb5jv.jpg"],
    //         "categories": ["logo design"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g106",
    //         "title": "I will the best logo for your business",
    //         "price": 20,
    //         "owner": {
    //             "_id": "u202",
    //             "fullname": "Kristel Bosch",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_8_acoqgy.jpg",
    //             "rate": 4.5,
    //         },
    //         "daysToMake": 2,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/pexels-photo-8715871_obkcyq.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/pexels-photo-2740844_vembs8.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/pexels-photo-1749900_qvespe.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/halloween-4576759_960_720_ckgbgd.png"],
    //         "categories": ["logo design"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g107",
    //         "title": "I will make a logo for your company",
    //         "price": 320,
    //         "owner": {
    //             "_id": "u203",
    //             "fullname": "Jessie Lacey",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_9_ncrp66.jpg",
    //             "rate": 4.5,
    //         },
    //         "daysToMake": 4,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/e-sports-6701392_960_720_pikzq8.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/hummingbird-1935665_960_720_uiehsy.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/bee-2389834_960_720_ttcq7x.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/coming-soon-1898936_960_720_fmpuj6.jpg"],
    //         "categories": ["logo design"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g108",
    //         "title": "I will program a python project for you",
    //         "price": 100,
    //         "owner": {
    //             "_id": "u204",
    //             "fullname": "Galit Tirrell",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_7_lm3n0i.jpg",
    //             "rate": 3.5,
    //         },
    //         "daysToMake": 4,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code8_fuamhl.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code9_oqgcsr.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code7_fsyu8c.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code6_dsmevt.jpg"],
    //         "categories": ["programming"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g109",
    //         "title": "I will build a console game for you",
    //         "price": 150,
    //         "owner": {
    //             "_id": "u205",
    //             "fullname": "Shakuntala House",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_5_umwzvf.jpg",
    //             "rate": 3.5,
    //         },
    //         "daysToMake": 14,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code1_dpmmnv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code5_recjzc.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code3_kbv9nw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code_4_cefapg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code_2_lddxz4.jpg"],
    //         "categories": ["programming"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g110",
    //         "title": "I will edit your wedding video",
    //         "price": 250,
    //         "owner": {
    //             "_id": "u206",
    //             "fullname": "Mia Wilmer",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_4_aqswjc.jpg",
    //             "rate": 3.2,
    //         },
    //         "daysToMake": 4,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_16_ci26tp.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_15_nebuto.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_14_lczsjy.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_12_mmbrq5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_13_vzcn4b.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_11_fpyjya.jpg"],
    //         "categories": ["video explainer"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g111",
    //         "title": "I will make your linkedin profile video",
    //         "price": 50,
    //         "owner": {
    //             "_id": "u207",
    //             "fullname": "Shirli Ericson",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_3_aeua68.jpg",
    //             "rate": 4.2,
    //         },
    //         "daysToMake": 5,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_10_lvtcu8.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_9_cv1bg7.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_6_khndob.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_8_v9oyjd.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_1_vhqqxm.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_7_nqiocr.jpg"],
    //         "categories": ["video explainer"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g112",
    //         "title": "I will film a promotional movie for you",
    //         "price": 70,
    //         "owner": {
    //             "_id": "u208",
    //             "fullname": "Margalit Jarrett",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_1_exfhiy.jpg",
    //             "rate": 4.8,
    //         },
    //         "daysToMake": 2,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_5_afuuxw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_4_g3nmju.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_3_tivras.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_2_vhk6wk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_1_qw7dzh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_1_wqr8gg.jpg"],
    //         "categories": ["video explainer"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g113",
    //         "title": "I will record your idea!",
    //         "price": 10,
    //         "owner": {
    //             "_id": "u209",
    //             "fullname": "Tricia Tupper",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_2_kih6pt.jpg",
    //             "rate": 3.9,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_8_fsndol.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_7_z412pb.jpg"],
    //         "categories": ["voice over"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g114",
    //         "title": "I will record your song",
    //         "price": 100,
    //         "owner": {
    //             "_id": "u210",
    //             "fullname": "Luvenia Zegers",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_6_pr0bgz.jpg",
    //             "rate": 4.2,
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_4_jynsfy.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_3_ly8zkk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_2_bzyztj.jpg"],
    //         "categories": ["voice over"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g115",
    //         "title": "I will record your book",
    //         "price": 500,
    //         "owner": {
    //             "_id": "u211",
    //             "fullname": "Youssef Holland",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_10_op4gm7.jpg",
    //             "rate": 5,
    //         },
    //         "daysToMake": 30,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_5_uummt3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_6_gv72yn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_1_xi0ek8.jpg"],
    //         "categories": ["voice over"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g116",
    //         "title": "I will build your business site",
    //         "price": 50,
    //         "owner": {
    //             "_id": "u212",
    //             "fullname": "Cliff Stacy",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_11_qdnpqi.jpg",
    //             "rate": 4,
    //         },
    //         "daysToMake": 4,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_1_fsepxf.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_2_ydsqnn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_1_kntzvm.jpg"],
    //         "categories": ["wordpress"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g117",
    //         "title": "I will illustrate you a mural",
    //         "price": 20,
    //         "owner": {
    //             "_id": "u213",
    //             "fullname": "Om Sangster",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_9_qfwnxb.jpg",
    //             "rate": 4.1,
    //         },
    //         "daysToMake": 4,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_27_owjgpb.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_23_osd9ui.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_25_vllcm3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_26_hrvfu0.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_24_blsxbs.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_19_dfo3dk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_20_lgq8pg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_qcomnu.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_11_ulhryi.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_jfvnyy.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g118",
    //         "title": "I will illustrate your idea!",
    //         "price": 120,
    //         "owner": {
    //             "_id": "u214",
    //             "fullname": "Samuel Harding",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_8_dzxvxj.jpg",
    //             "rate": 4.3,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_30_bdpfpf.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_28_r6sl98.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_29_lmuw6n.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_22_gdjfgl.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_21_qdypp5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_18_ksxnin.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_17_ljugao.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g119",
    //         "title": "I will illustrate your dreams!!",
    //         "price": 180,
    //         "owner": {
    //             "_id": "u215",
    //             "fullname": "Tobin Abbott",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_7_wrinwo.jpg",
    //             "rate": 4.6,
    //         },
    //         "daysToMake": 2,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_16_fgwhje.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_17_thcwdn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_14_xubud3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_16_mtwidh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_15_rbdzcm.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_15_l9ofuv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_14_overmn.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g120",
    //         "title": "I will decorate your workspace",
    //         "price": 80,
    //         "owner": {
    //             "_id": "u216",
    //             "fullname": "Hamid Morison",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_5_svbpoe.jpg",
    //             "rate": 3.6,
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_13_bklbyi.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_q3k9uh.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_qotxsv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_13_ysbmnw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_13_a8wu8k.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843818/illustration/illustration_11_dv3wat.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843814/illustration/illustration_10_mmsn2c.png"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g121",
    //         "title": "I will animate your site",
    //         "price": 80,
    //         "owner": {
    //             "_id": "u217",
    //             "fullname": "Cat Denman",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_3_pn29lw.jpg",
    //             "rate": 5,
    //         },
    //         "daysToMake": 7,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843814/illustration/illustration_11_jnlpou.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_10_xmmmow.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_10_avtryh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_d1f5pr.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_lnlzzx.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_x5vky1.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_8_izu0uv.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g122",
    //         "title": "I will illustrate your commercial ideas",
    //         "price": 180,
    //         "owner": {
    //             "_id": "u218",
    //             "fullname": "Mikhael Sultan",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_5_svbpoe.jpg",
    //             "rate": 5,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_8_gnyrbw.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_8_b6yhqk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_6_fa28yc.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_6_v00lfa.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_dt5fia.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_pc3ixj.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g123",
    //         "title": "I will illustrate you and your family",
    //         "price": 16,
    //         "owner": {
    //             "_id": "u219",
    //             "fullname": "Raj Danielsonn",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_4_iqwofu.jpg",
    //             "rate": 3.5,
    //         },
    //         "daysToMake": 1,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_c5aqpg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_iojmww.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_4_l5werm.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_j7bru5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_4_xextpu.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_g7d1ii.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_4_ar59py.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g124",
    //         "title": "I will design your office",
    //         "price": 16,
    //         "owner": {
    //             "_id": "u220",
    //             "fullname": "Nizar Alexander",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_1_ue7dwo.jpg",
    //             "rate": 4.8,
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_pamh8t.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_xugcr2.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_1_vtdbat.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_2_kknoa7.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_1_pnnozf.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_2_swlsot.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_2_e9qi9b.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     },
    //     {
    //         "_id": "g125",
    //         "title": "I will do your kids drawings for them",
    //         "price": 16,
    //         "owner": {
    //             "_id": "u221",
    //             "fullname": "Fadi Houtman",
    //             "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_2_enz1x0.jpg",
    //             "rate": 4.9,
    //         },
    //         "daysToMake": 3,
    //         "description": descriptions[utilService.getRandomIntInclusive(0, descriptions.length - 1)],
    //         "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_1_sdwxzj.jpg"],
    //         "categories": ["illustration"],
    //         "likedByUser": [{
    //             "userId": "u107",
    //             "fullname": "Dwayne Loony",
    //             "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
    //         }]
    //     }
    // ]
    // return _shuffle(array)

    return [
        { "_id": "g119", "title": "I will illustrate your dreams!!", "price": 180, "owner": { "_id": "u215", "fullname": "Tobin Abbott", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_7_wrinwo.jpg", "rate": 4.6 }, "daysToMake": 2, "description": "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_16_fgwhje.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_17_thcwdn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_14_xubud3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_16_mtwidh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_15_rbdzcm.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_15_l9ofuv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_14_overmn.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g112", "title": "I will film a promotional movie for you", "price": 70, "owner": { "_id": "u208", "fullname": "Margalit Jarrett", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_1_exfhiy.jpg", "rate": 4.8 }, "daysToMake": 2, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_5_afuuxw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_4_g3nmju.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_3_tivras.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_2_vhk6wk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_1_qw7dzh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843971/video/video_1_wqr8gg.jpg"], "categories": ["video explainer"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g113", "title": "I will record your idea!", "price": 10, "owner": { "_id": "u209", "fullname": "Tricia Tupper", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_2_kih6pt.jpg", "rate": 3.9 }, "daysToMake": 1, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_8_fsndol.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_7_z412pb.jpg"], "categories": ["voice over"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g123", "title": "I will illustrate you and your family", "price": 16, "owner": { "_id": "u219", "fullname": "Raj Danielsonn", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_4_iqwofu.jpg", "rate": 3.5 }, "daysToMake": 1, "description": "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_c5aqpg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_iojmww.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_4_l5werm.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_5_j7bru5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_4_xextpu.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_g7d1ii.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_4_ar59py.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g109", "title": "I will build a console game for you", "price": 150, "owner": { "_id": "u205", "fullname": "Shakuntala House", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_5_umwzvf.jpg", "rate": 3.5 }, "daysToMake": 14, "description": "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code1_dpmmnv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code5_recjzc.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code3_kbv9nw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code_4_cefapg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844024/programming/code_2_lddxz4.jpg"], "categories": ["programming"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g105", "title": "I will craft a logo for you", "price": 130, "owner": { "_id": "u201", "fullname": "Eleonora Oliversen", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_10_eg0mae.jpg", "rate": 3 }, "daysToMake": 1, "description": "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/pexels-katya-wolf-8715869_jbv8kp.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/radio-6115819_960_720_s8o6wa.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/sketch-3064403_960_720_jyfxcq.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/picture-frame-3042585_960_720_ebb5jv.jpg"], "categories": ["logo design"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] },
        { "_id": "g117", "title": "I will illustrate you a mural", "price": 20, "owner": { "_id": "u213", "fullname": "Om Sangster", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_9_qfwnxb.jpg", "rate": 4.1 }, "daysToMake": 4, "description": "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_27_owjgpb.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_23_osd9ui.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_25_vllcm3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_26_hrvfu0.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_24_blsxbs.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_19_dfo3dk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_20_lgq8pg.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_qcomnu.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_11_ulhryi.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_jfvnyy.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g125", "title": "I will do your kids drawings for them", "price": 16, "owner": { "_id": "u221", "fullname": "Fadi Houtman", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_2_enz1x0.jpg", "rate": 4.9 }, "daysToMake": 3, "description": "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_1_sdwxzj.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g114", "title": "I will record your song", "price": 100, "owner": { "_id": "u210", "fullname": "Luvenia Zegers", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_6_pr0bgz.jpg", "rate": 4.2 }, "daysToMake": 3, "description": "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_4_jynsfy.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_3_ly8zkk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_2_bzyztj.jpg"], "categories": ["voice over"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g110", "title": "I will edit your wedding video", "price": 250, "owner": { "_id": "u206", "fullname": "Mia Wilmer", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_4_aqswjc.jpg", "rate": 3.2 }, "daysToMake": 4, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_16_ci26tp.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_15_nebuto.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_14_lczsjy.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_12_mmbrq5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_13_vzcn4b.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_11_fpyjya.jpg"], "categories": ["video explainer"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g103", "title": "I will teach you js", "price": 200, "owner": { "_id": "u108", "fullname": "Baadur Lomidze", "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=", "rate": 5 }, "daysToMake": 1, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg"], "categories": ["programming"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g115", "title": "I will record your book", "price": 500, "owner": { "_id": "u211", "fullname": "Youssef Holland", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_10_op4gm7.jpg", "rate": 5 }, "daysToMake": 30, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_5_uummt3.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_6_gv72yn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843921/voice%20over/voice-over_1_xi0ek8.jpg"], "categories": ["voice over"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g120", "title": "I will decorate your workspace", "price": 80, "owner": { "_id": "u216", "fullname": "Hamid Morison", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_5_svbpoe.jpg", "rate": 3.6 }, "daysToMake": 3, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843820/illustration/illustration_13_bklbyi.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_q3k9uh.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_12_qotxsv.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_13_ysbmnw.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843819/illustration/illustration_13_a8wu8k.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843818/illustration/illustration_11_dv3wat.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843814/illustration/illustration_10_mmsn2c.png"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g108", "title": "I will program a python project for you", "price": 100, "owner": { "_id": "u204", "fullname": "Galit Tirrell", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_7_lm3n0i.jpg", "rate": 3.5 }, "daysToMake": 4, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code8_fuamhl.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code9_oqgcsr.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code7_fsyu8c.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642844025/programming/code6_dsmevt.jpg"], "categories": ["programming"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g116", "title": "I will build your business site", "price": 50, "owner": { "_id": "u212", "fullname": "Cliff Stacy", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_11_qdnpqi.jpg", "rate": 4 }, "daysToMake": 4, "description": "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_1_fsepxf.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_2_ydsqnn.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843868/wordpress/wordpress_1_kntzvm.jpg"], "categories": ["wordpress"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g102", "title": "I will design your illustration", "price": 120, "owner": { "_id": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=", "rate": 4 }, "daysToMake": 3, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg", "https://images.pexels.com/photos/1569002/pexels-photo-1569002.jpeg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g107", "title": "I will make a logo for your company", "price": 320, "owner": { "_id": "u203", "fullname": "Jessie Lacey", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_9_ncrp66.jpg", "rate": 4.5 }, "daysToMake": 4, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/e-sports-6701392_960_720_pikzq8.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/hummingbird-1935665_960_720_uiehsy.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/bee-2389834_960_720_ttcq7x.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/coming-soon-1898936_960_720_fmpuj6.jpg"], "categories": ["logo design"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g121", "title": "I will animate your site", "price": 80, "owner": { "_id": "u217", "fullname": "Cat Denman", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_3_pn29lw.jpg", "rate": 5 }, "daysToMake": 7, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843814/illustration/illustration_11_jnlpou.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_10_xmmmow.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_10_avtryh.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_d1f5pr.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_lnlzzx.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_9_x5vky1.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_8_izu0uv.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g101", "title": "I will design your logo", "price": 12, "owner": { "_id": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=", "rate": 4 }, "daysToMake": 3, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg", "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg"], "categories": ["logo design", "illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g111", "title": "I will make your linkedin profile video", "price": 50, "owner": { "_id": "u207", "fullname": "Shirli Ericson", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_3_aeua68.jpg", "rate": 4.2 }, "daysToMake": 5, "description": "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_10_lvtcu8.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_9_cv1bg7.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_6_khndob.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_8_v9oyjd.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_1_vhqqxm.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843972/video/video_7_nqiocr.jpg"], "categories": ["video explainer"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g118", "title": "I will illustrate your idea!", "price": 120, "owner": { "_id": "u214", "fullname": "Samuel Harding", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_8_dzxvxj.jpg", "rate": 4.3 }, "daysToMake": 1, "description": "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_30_bdpfpf.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_28_r6sl98.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843823/illustration/illustration_29_lmuw6n.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843822/illustration/illustration_22_gdjfgl.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_21_qdypp5.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_18_ksxnin.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843821/illustration/illustration_17_ljugao.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g104", "title": "I will design your website", "price": 150, "owner": { "_id": "u108", "fullname": "Baadur Lomidze", "imgUrl": "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=", "rate": 5 }, "daysToMake": 7, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg", "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"], "categories": ["programming"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g122", "title": "I will illustrate your commercial ideas", "price": 180, "owner": { "_id": "u218", "fullname": "Mikhael Sultan", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_6_z6cezt.jpg", "rate": 5 }, "daysToMake": 1, "description": "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843813/illustration/illustration_8_gnyrbw.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_8_b6yhqk.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_6_fa28yc.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_6_v00lfa.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_dt5fia.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843812/illustration/illustration_7_pc3ixj.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843811/illustration/illustration_6_kqv9hc.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g106", "title": "I will the best logo for your business", "price": 20, "owner": { "_id": "u202", "fullname": "Kristel Bosch", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_8_acoqgy.jpg", "rate": 4.5 }, "daysToMake": 2, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843703/logo/pexels-photo-8715871_obkcyq.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/pexels-photo-2740844_vembs8.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/pexels-photo-1749900_qvespe.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843702/logo/halloween-4576759_960_720_ckgbgd.png"], "categories": ["logo design"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }, { "_id": "g124", "title": "I will design your office", "price": 16, "owner": { "_id": "u220", "fullname": "Nizar Alexander", "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_1_ue7dwo.jpg", "rate": 4.8 }, "daysToMake": 3, "description": "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.", "imgUrls": ["https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_pamh8t.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_3_xugcr2.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_1_vtdbat.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843810/illustration/illustration_2_kknoa7.png", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_1_pnnozf.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_2_swlsot.jpg", "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642843809/illustration/illustration_2_e9qi9b.jpg"], "categories": ["illustration"], "likedByUser": [{ "userId": "u107", "fullname": "Dwayne Loony", "imgUrl": "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=" }] }]
    // console.log(JSON.stringify(_shuffle(array)));
}

function _shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
