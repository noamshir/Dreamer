import Axios from "axios";
import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
import {
  socketService,
  SOCKET_EMIT_LOGOUT,
  SOCKET_EMIT_ADD_REVIEW,
} from "./socket.service.js";

const STORAGE_KEY = "user_db";
const STORAGE_KEY_LOGGEDIN = "loggedinUser";
const userDescs = [
  "I have over 6 years of experience in WordPress and several custom themes. I can build Websites, troubleshooting WordPress, tweak WordPress, install, fix, move and customize.",
  "Hello Fiverr Visitors and thank you for checking out my profile! \n I am based in Miami, Florida USA and am a Business Entrepreneur with proven talent for driving website traffic along with a superior quality deliverable. A keen acumen and web building spirit help me in providing impeccable customer service for your personal or business website. I speak perfect English so feel free to connect with me and let's discuss your next project.",
  "I am an expert Electrical Engineer with more than 7 years of experience in Electrical and Electronics Engineering. My expertise are in fields of Electrical engineering, Analog and Digital Electronics, Communication Systems, VLSI, Control Systems, Digital Logic Design and Programming Languages C, C++, Python, AVR assembly, ARM assembly etc. I have command on various Engineering softwares for simulations and design of the complete project. I have also a lot of experience in software domain. Please check my GIGS for more details. Happy Ordering!",
  "I'm a professional video editor and multimedia artist with over 4 years of experience and I am here to provide the best result possible.\n I am also a videographer in the Czech republic where I shoot mostly weddings.\n I specialize in video editing, but I can create stunning graphic design as well.\n 1. Professional video editing and delivery in Full HD or 4K quality in any format. \n 2. I am working with Adobe Premiere and After Effects to provide the best result possible.\n Feel free to contact me, if you have questions and I will answer :)\n Hope to hear from you soon! :)",
];

export const userService = {
  login,
  logout,
  signUp,
  getLoggedinUser,
  update,
  saveUser,
  getUsers,
  getById,
  saveReview,
  saveSellerInfo,
  getGoogleUser,
};
window.us = userService;

async function login(credentials) {
  try {
    const user = await httpService.post("auth/login", credentials);
    if (user) {
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
    }
    return user;
  } catch (err) {
    return false;
  }
}
async function signUp(userInfo) {
  try {
    const user = await httpService.post("auth/signup", userInfo);
    if (user) {
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
    }
    return user;
  } catch (err) {
    console.log("error in signUp", err);
    return false;
  }
}
async function logout(user) {
  await httpService.post("auth/logout");
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null);
  socketService.emit(SOCKET_EMIT_LOGOUT, user._id);
  return Promise.resolve();
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

async function getGoogleUser(googleId) {
  try {
    const user = await httpService.get(`user/google/${googleId}`);
    if (user) {
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
    }
    return user;
  } catch (err) {
    return false;
  }
}

async function update(sellerInfo) {
  const loggedinUser = getLoggedinUser();
  const imgUrl = sellerInfo.imgUrl;
  sellerInfo = {
    rate: 5,
    sellerDesc: sellerInfo.sellerDesc,
    origin: sellerInfo.origin,
    skills: sellerInfo.skills,
  };
  const newUser = {
    ...loggedinUser,
    imgUrl,
    reviews: [],
    sellerInfo,
  };

  await httpService.put(`user/${newUser._id}`, newUser);
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser));
  return newUser;
}

async function getUsers() {
  return httpService.get(`user`);
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  return user;
}

async function saveReview(rate, txt, user, gigId, owner) {
  const review = {
    _id: utilService.makeId(),
    txt,
    rate,
    createdAt: Date.now(),
    by: {
      _id: user._id,
      fullname: user.fullname,
      origin: user.origin || "Israel",
      imgUrl: user.imgUrl || null,
    },
  };
  const notification = {
    _id: utilService.makeId(8),
    sender: user,
    txt: "",
    type: "review",
    createdAt: Date.now(),
    gigId,
    msg: createMsg(review.by),
  };
  owner.reviews = [...owner.reviews, review];
  if (!owner.notifications) owner.notifications = [];
  owner.notifications = [...owner.notifications, notification];
  const updatedOwner = await saveUser(owner);
  socketService.emit("new-review", {
    review,
    ownerId: updatedOwner._id,
    notification,
  });
  return updatedOwner;
}

function createMsg(by) {
  return {
    title: "Review Added",
    content: `${by.fullname} added a review on one of your gigs`,
    subHeader: "Head to your profile and check it out!",
  };
}

async function saveUser(user) {
  if (user._id) {
    return httpService.put(`user/${user._id}`, user);
  } else {
    return httpService.post("user", user);
  }
}

async function saveSellerInfo(sellerInfo) {
  sellerInfo.skills = sellerInfo.skills.map((skill) => {
    return skill.value;
  });
  return await update(sellerInfo);
}
