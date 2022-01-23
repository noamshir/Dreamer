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
    saveReview,
    saveSellerInfo
}
window.us = userService

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user;
}
async function signUp(userInfo) {
    const user = await httpService.post('auth/signup', userInfo)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}
async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

async function update(sellerInfo) {
    const loggedinUser = getLoggedinUser()
    const imgUrl = sellerInfo.imgUrl
    sellerInfo = {
        rate: 5,
        sellerDesc: sellerInfo.sellerDesc,
        origin: sellerInfo.origin,
        skills: sellerInfo.skills
    }
    const newUser = {
        ...loggedinUser,
        imgUrl,
        reviews: [],
        sellerInfo
    }

    await httpService.put(`user/${newUser._id}`, newUser)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser))
    return newUser
} 


async function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    // return user
    // const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

async function saveReview(rate, txt, user, owner) {
    const review = {
        "_id": utilService.makeId(),
        txt,
        rate,
        "createdAt": Date.now(),
        "by": {
            "_id": user._id,
            "fullname": user.fullname,
            "origin": user.origin || 'Israel',
            "imgUrl": user.imgUrl || null,
        }
    }
    owner.reviews = [...owner.reviews, review]
    const updatedOwner = await _saveUser(owner)
    console.log({ updatedOwner })
    return updatedOwner
}

async function _saveUser(user) {
    if (user._id) {
        return httpService.put(`user/${user._id}`, user)
        // return storageService.put(STORAGE_KEY, user);
    } else {
        // return httpService.post('gig', gig)
        // const user = userService.getLoggedinUser()
        // gig.owner = user;
        return storageService.post(STORAGE_KEY, user);
    }
}

async function saveSellerInfo(sellerInfo) {
    sellerInfo.skills = sellerInfo.skills.map(skill => {
        return skill.value
    })
    return await update(sellerInfo)

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
        {
            "_id": "u201",
            "fullname": "Eleonora Oliversen",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_10_eg0mae.jpg",
            "isAdmin": false,
            "username": "eleonora",
            "password": "eleonora",
            "sellerInfo": {
                "rate": 3,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "logo-design",
                    "illustration"
                ],
                "sellerDesc": "Hey, Thank you for visiting my profile, I help entrepreneurs, startups, enterprises, and every business to design Creative logo designs to bring their ideas into reality, I offer the highest quality in service, customer support. You can check my profile for previous designs."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u202",
            "fullname": "Kristel Bosch",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_8_acoqgy.jpg",
            "isAdmin": false,
            "username": "kristel",
            "password": "kristel",
            "sellerInfo": {
                "rate": 4.5,
                "origin": "United States",
                "languages": ["en", "he"],
                "skills": [
                    "logo-design",
                    "illustration"
                ],
                "sellerDesc": "We are a team of professionals who do almost everything you may require for your media based companies. We are your one-stop destination for Graphics Design services, Web Design & Development services and Digital Marketing services. If you have any questions, we are just one message away."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u203",
            "fullname": "Jessie Lacey",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_9_ncrp66.jpg",
            "isAdmin": false,
            "username": "jessie",
            "password": "jessie",
            "sellerInfo": {
                "rate": 4.5,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "logo-design",
                    "illustration"
                ],
                "sellerDesc": "Hey there!I am the designer behind Zakdesignz and my nickname is Zak.I have been working as a professional graphic and brand designer since 2012. I love to work creatively and logically with quality design and customer satisfaction being my number one priority."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u204",
            "fullname": "Galit Tirrell",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849243/User%20photos/Female/profile_femals_img_7_lm3n0i.jpg",
            "isAdmin": false,
            "username": "galit",
            "password": "galit",
            "sellerInfo": {
                "rate": 3.5,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "programming",
                    "wordpress"
                ],
                "sellerDesc": "I was born and raised in the Midwest & have been working with computers since the early 90's. My specialties include programming with the Amazon Marketing API, python, SQL and scraping information from websites."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u205",
            "fullname": "Shakuntala House",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_5_umwzvf.jpg",
            "isAdmin": false,
            "username": "shakuntala",
            "password": "shakuntala",
            "sellerInfo": {
                "rate": 3.5,
                "origin": "Germany",
                "languages": ["en", "he"],
                "skills": [
                    "programming",
                    "wordpress"
                ],
                "sellerDesc": "I am a professional software and web developer. I am a certified python expert with professional work experience. If you have any type of work in web development or python then you are in the right place. I assure you of my best services. Contact me to discuss about the problem and I will provide you the best solution. Thanks :-)"
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u206",
            "fullname": "Mia Wilmer",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_4_aqswjc.jpg",
            "isAdmin": false,
            "username": "mia",
            "password": "mia",
            "sellerInfo": {
                "rate": 3.2,
                "origin": "Australia",
                "languages": ["en", "he"],
                "skills": [
                    "video",
                    "music"
                ],
                "sellerDesc": "I put my experience and creativity at the service of your projects. My goal is to make the emotions of your images visible. I'm a awarded professional director, editor and cinematographer based in Bangkok with 35 years of experience in the audiovisual industry. As author I've created 6 tv shows with more then 150 episodes in prime time for a Sky Italy channel. I'm a DaVinci Resolve certified professional with hundreds happily completed works in the last 15 years."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u207",
            "fullname": "Shirli Ericson",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_3_aeua68.jpg",
            "isAdmin": false,
            "username": "shirli",
            "password": "shirli",
            "sellerInfo": {
                "rate": 4.2,
                "origin": "Australia",
                "languages": ["en", "he"],
                "skills": [
                    "video",
                    "music"
                ],
                "sellerDesc": "I have never considered making business commercials for brands as my job. It is my passion to help a business get discovered and gain recognition through my high-end editing talent. I love finding creative solutions in how to get the best result of the raw footage."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u208",
            "fullname": "Margalit Jarrett",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_1_exfhiy.jpg",
            "isAdmin": false,
            "username": "margalit",
            "password": "margalit",
            "sellerInfo": {
                "rate": 4.8,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "video",
                    "music"
                ],
                "sellerDesc": "Hi! We are a team of creative scriptwriters, voiceover artists, video editors, and SEO experts. We do provide fast and quality top 10 video service. We specialize in facts, travel, tech, health, and gaming videos. So let's make your YouTube channel successful. If you do have any queries, feel free to contact us. We will get back to you ASAP. Thanks."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u209",
            "fullname": "Tricia Tupper",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_2_kih6pt.jpg",
            "isAdmin": false,
            "username": "tricia",
            "password": "tricia",
            "sellerInfo": {
                "rate": 3.9,
                "origin": "United States",
                "languages": ["en", "he"],
                "skills": [
                    "voice over",
                    "music"
                ],
                "sellerDesc": "Full-time professional voice actor/audio engineer, bending audio waves to perfection! I love telling engaging stories and delivering perfect audio to my clients! Whether it’s a commercial, trailer, voicemail, eLearning course, or corporate narration; trust me to share your message and prompt your listeners to take action :)"
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u210",
            "fullname": "Luvenia Zegers",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849242/User%20photos/Female/profile_femals_img_6_pr0bgz.jpg",
            "isAdmin": false,
            "username": "luvenia",
            "password": "luvenia",
            "sellerInfo": {
                "rate": 4.2,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "voice over",
                    "music"
                ],
                "sellerDesc": "I am a Voice over artist, journalist, creative copywriter and community manager with over 10 years of experience. I have worked with many agencies and brands such as Mattel, Procter & Gamble, among others. I also worked in public relations, event management and corporate communications. I am Constantly in search of innovation and tools that contribute both to my professional development and my clients needs."
            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u211",
            "fullname": "Youssef Holland",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_10_op4gm7.jpg",
            "isAdmin": false,
            "username": "youssef",
            "password": "youssef",
            "sellerInfo": {
                "rate": 5,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "voice over",
                    "music"
                ],
                "sellerDesc": "I am a creative. From acting in TV, Theater, and Film, to Music production, voice overs, songs and script writing. These are what I spend the majority of my time doing. I take pride in the my work and therefor give my 100% with whatever project I commit to."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u212",
            "fullname": "Cliff Stacy",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_11_qdnpqi.jpg",
            "isAdmin": false,
            "username": "cliff",
            "password": "cliff",
            "sellerInfo": {
                "rate": 4,
                "origin": "Australia",
                "languages": ["en", "he"],
                "skills": [
                    "wordpress",
                    "logo design"
                ],
                "sellerDesc": "Hi, we are a duo of web professionals, with expert WordPress design and development experience. We are very results-driven. Doing a great job and achieving the desired end result is our primary motivation. With over 10+ years of professional web experience; we understand that real business goals requires a tapestry of on-brand design, functional development, lead generation channels, user experience tailoring and conversion optimization couched in solid strategy."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u213",
            "fullname": "Om Sangster",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849190/User%20photos/Male/profile_img_9_qfwnxb.jpg",
            "isAdmin": false,
            "username": "om",
            "password": "om",
            "sellerInfo": {
                "rate": 4.1,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "We have the biggest illustration offering, providing over 30 illustration styles to choose from, in a wide variety of finishes and techniques – digital, mixed media, water colour, poster colour, pencils, acrylics, painterly, whimsical, graphic… Clients from all across the world use our illustrations for children's books, greeting cards, print advertising, mascots & characters, promotional material, presentations, websites, blogs, newsletters, corporate communication, direct mail, packaging… Experience a world of sheer illustration wizardry."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u214",
            "fullname": "Samuel Harding",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_8_dzxvxj.jpg",
            "isAdmin": false,
            "username": "samuel",
            "password": "samuel",
            "sellerInfo": {
                "rate": 4.3,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "Hi' i'm a professional freelance Digital Illustrator. I respond in a timely manner, i am transparent with my process and friendly =) I love roleplaying games such as DnD 5e/Pathfinder, having knowledge what system your character in helps =) I also love MMOS used to play FFXIV, ESO, WoW, Etc. Overall gaming nerd as-well as an artist so feel free to chat to =)"

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u215",
            "fullname": "Tobin Abbott",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_7_wrinwo.jpg",
            "isAdmin": false,
            "username": "tobin",
            "password": "tobin",
            "sellerInfo": {
                "rate": 4.6,
                "origin": "Germany",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "I'm a visual artist working with watercolour and ink. Originally coming from an architect-background, I have developed strong conceptual thinking and versatility with over 8 years experience, and am able to illustrate many topics same as to create anything from raw and sketchy architecture drawing to a detailed, playfully colourful or minimal traditional illustration of people, animals, plants and different kind of objects."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u216",
            "fullname": "Hamid Morison",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_5_svbpoe.jpg",
            "isAdmin": false,
            "username": "hamid",
            "password": "hamid",
            "sellerInfo": {
                "rate": 3.6,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "Hi everyone ♥ I have a degree in illustration, my skills range from classic watercolor illustration to digital illustrations! I work with photoshop and make projects of all kinds, from children's illustrations to hand drawn logo for entrepreneurs. You can consult me about any project that interests you and the prices vary according to the complexity of the illustrations. I look forward to working with you! ♥"

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u217",
            "fullname": "Cat Denman",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_3_pn29lw.jpg",
            "isAdmin": false,
            "username": "cat",
            "password": "cat",
            "sellerInfo": {
                "rate": 5,
                "origin": "United States",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "An illustrator based in Zurich. My main areas of interest are book and editorial illustration, advertising, traveling and lifestyle."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u218",
            "fullname": "Mikhael Sultan",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_6_z6cezt.jpg",
            "isAdmin": false,
            "username": "mikhael",
            "password": "mikhael",
            "sellerInfo": {
                "rate": 5,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "As a human, I like to explore the world I live in, how I feel about life and how I manage to live it. As an artist, I use these accumulated experiences and feelings to shape the outline of my imagination and to obtain forms and combinations of colors that have never seen before. My portfolio is filled with visual fragments of timeless work for my clients’ present-day needs. My areas of expertise shift between visual understanding and digital art fields, with a spotlight on branding, graphic design, and illustration."

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u219",
            "fullname": "Raj Danielson",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_4_iqwofu.jpg",
            "isAdmin": false,
            "username": "raj",
            "password": "raj",
            "sellerInfo": {
                "rate": 3.5,
                "origin": "Pakistan",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "Hello, I'm a professional designer and illustrator. I'm originally from London and now based in Tel Aviv. I enjoy working on a range of projects using both traditional and digital mediums. Including: Illustrations, Portraits, Fashion Design and Pattern Design. I'm constantly taking on new clients. Please feel free to message me with your ideas and let's bring it to life!"

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u220",
            "fullname": "Nizar Alexander",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_1_ue7dwo.jpg",
            "isAdmin": false,
            "username": "nizar",
            "password": "nizar",
            "sellerInfo": {
                "rate": 4.8,
                "origin": "Germany",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "Freelance digital artist. Open to creating all sorts or requests so if you have something in mind just drop me a mail and we can get the ball rolling. :) I can create character and environment artwork. I can mimic other styles and can create lots of other art like logo designs and lots more. I am fortunate enough to have my art published on platforms like PS4 and Xbox one. If you have any questions at all just drop me a mail and Ill answer any you have and do my utmost to deliver exactly what you are looking for. :)"

            },

            "reviews":
                [

                ]
        },
        {
            "_id": "u221",
            "fullname": "Fadi Houtman",
            "imgUrl": "https://res.cloudinary.com/drdfrwt1d/image/upload/v1642849189/User%20photos/Male/profile_img_2_enz1x0.jpg",
            "isAdmin": false,
            "username": "fadi",
            "password": "fadi",
            "sellerInfo": {
                "rate": 4.9,
                "origin": "Israel",
                "languages": ["en", "he"],
                "skills": [
                    "illustration",
                    "logo design"
                ],
                "sellerDesc": "Hi, I have over 3 years of art experience in the video game industry and over 10 years of experience with traditional art. During my time in the video game industry, I was a lead artist for many projects from large developers, among which include Epic Games and Ubisoft. During my career, I was also responsible for projects of various genres which included storytelling games, RPG, hidden object puzzle adventure, and slots. I have extensive experience working with Adobe Photoshop. I also have extensive experience using oil, watercolor, acrylic, charcoal, pastels, and pencil."

            },

            "reviews":
                [

                ]
        }
    ]
}