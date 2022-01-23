import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";
import { userService } from "./user.service.js";
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = "gig_db";
const categories = [
  {
    category: "logo design",
    features: [
      "1 Concept Included",
      "Logo Transparency",
      "Vector File",
      "Printable File",
      "3D Mockup",
      "Source File",
    ],
  },
  {
    category: "wordpress",
    features: [
      "1 Page",
      "Design Customization",
      "Content Upload",
      "Responsive Design",
    ],
  },
  {
    category: "voice over",
    features: ["HQ Audio File (WAV format)", "Number Of Words: 150"],
  },
  {
    category: "video explainer",
    features: ["Background Music", "Add Logo", "60 Seconds Running Time"],
  },
  {
    category: "social media",
    features: [
      "1 Platform",
      "Page Setup",
      "Profile Image & Cover",
      "Website Integration",
    ],
  },
  {
    category: "programming",
    features: [
      "Include Source Code",
      "Database Integration",
      "Setup File",
      "Detailed Code Comments",
      "3D Mockup",
      "Source File",
    ],
  },
  {
    category: "translation",
    features: ["Proofreading", "Document Formatting", "Number od words: 300"],
  },
  {
    category: "illustration",
    features: [
      "Source File",
      "High Resolution",
      "Background/Scene",
      "Color",
      "Full Body",
      "Commercial Use",
      "1 Figure",
    ],
  },
];
const descriptions = [
  "Internet is taking over our lives, companies need a website design to promote their business online, this helps them reach out more customers, people tend to think that all the websites get the same results but in fact, Google doesn't like prebuilt websites.I started alone in 2016 and currently I'm leading a team of 5 WordPress developers to work together on current and future projects here on Dimerr.We are specialist in WordPress and best coding practices and we focus on the quality of our work.",
  "I am a WordPress Pro who has worked on various Woocommerce Stores. My Experiences Include: Complete Woocommerce Configuration & Setup. Woocommerce Social Logins. Minor & Common Bug Fixes.Woocommerce Plugin Customization & Custom Development. Page Design For Cart, Checkout, & Shop Pages. Creating Product Grids & Attractive Widgets. Setup WPML with Woocommerce. Products and Theme Based Sliders using Slider Revolution. Theme Customization according to your requirements. and much more!  Basic Benefits Of My Service I PROMISE to deliver within 24 hours.Being a business owner, I understand The Importance of your business.By keeping that in mind, I make sure I value your Time & Cash, as much as I can.If I take an Order, It's my responsibility to provide a Quick & Quality Service.I've done hours of research on WC Tasks & I'm an Expert at what I do. Discussing the issue with me in Inbox & getting a Custom Offer is much better & appreciated than making an Order directly.",
  "I will be your Professional Social Media Manager!  Nowadays, social media plays an important role in business growth. But do we use them properly? SMM is the most important service for each company worldwide. I provide natural and organic Management for your Online Business Accounts. I strongly believe in what I can offer and I strongly believe in what I can make you reach.",
  "I'm your voice for your project right here on Dimerr.com. I am a Professional voice narrator with 3 Years of Experience. I'll narrate an upload, your voiceover project, whatever it might be. I do audio books, children's books, YouTube videos, narrations whiteboards, sales presentations, you name it.  Do you need a HIGHLY EXPERIENCED, PROFESSIONAL NARRATOR for your audiobook?  I will professionally narrate your audiobook to industry standards. I'll do it quickly professionally and make sure it's of the highest quality. Hey, it's your project. It deserves to be done. Right. So go ahead and check out my gigs, check out my samples. And if you have any questions, go ahead and send me a message and I'll make sure to respond back with a custom offer. Thanks so much. And I look forward to working with you.",
];

export const gigService = {
  query,
  getById,
  save,
  remove,
  toggleLike,
  getCategories,
  getPopularCategories,
  getFeaturesByCategory,
  isLikedByUser
};

async function query(filterBy) {
  // filterBy = { name: '', type: 'all', selectedLabels: 'all', sortBy: 'name' }
  return httpService.get("gig");
}
async function getById(gigId) {
  return httpService.get(`gig/${gigId}`);
}
async function remove(gigId) {
  return httpService.delete(`gig/${gigId}`);
}
async function save(gig) {
  if (gig._id) {
    return httpService.put(`gig/${gig._id}`, gig);
  } else {
    return httpService.post("gig", gig);
    // const user = userService.getLoggedinUser()
    // gig.owner = user;
    // return storageService.post(STORAGE_KEY, gig);
  }
}

async function toggleLike(gigId, user) {
  const gig = await getById(gigId);
  if (user) {
    const idx = gig.likedByUser.findIndex(currUser => currUser._id === user._id)
    if (idx === -1) {
      const miniUser = {
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        _id: user._id,
      };
      gig.likedByUser = [...gig.likedByUser, miniUser];
    } else {
      gig.likedByUser.splice(idx, 1)
    }
  } else {
    storageService.saveGuestGigs(gig);
  }
  const data = await save(gig);
  console.log('data in gig service: ', data);
  return data;
}

function getCategories() {
  return categories.map((category) => category.category);
}

function getPopularCategories(numOfCategories) {
  var popularCategories = categories.slice(0, numOfCategories);
  return popularCategories.map((category) => {
    return `${category.category
      .charAt(0)
      .toUpperCase()}${category.category.slice(1)}`;
  });
}
function getFeaturesByCategory(categoryName) {
  const category = categories.find(
    (category) => category.category === categoryName
  );
  return category.features;
}


async function isLikedByUser(gig) {
  const user = await userService.getLoggedinUser()
  return gig.likedByUser.some(currUser => currUser._id === user._id)
}