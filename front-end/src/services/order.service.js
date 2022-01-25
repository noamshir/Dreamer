import { storageService } from "./async-storage.service.js";

// import Axios from 'axios'
import { httpService } from "./http.service.js";
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = "order_db";

export const orderService = {
  query,
  getById,
  save,
  remove,
  createOrders,
  fixOrder,
};

async function query(userId, type) {
  //TODO - type means buyer or seller
  var filterBy = { userId, type };
  return httpService.get("order", { params: { filterBy } });
  // return storageService.query(STORAGE_KEY);
  // return storageService.query(STORAGE_KEY, filterBy);
}
async function getById(orderId) {
  return httpService.get(`order/${orderId}`);
  // return storageService.get(STORAGE_KEY, orderId);
}
async function remove(orderId) {
  return httpService.delete(`order/${orderId}`);
  // return Promise.reject('Not now!');
  // return storageService.remove(STORAGE_KEY, orderId);
}
async function save(order) {
  if (order._id) {
    return httpService.put(`order/${order._id}`, order);
    // return storageService.put(STORAGE_KEY, order);
  } else {
    return httpService.post("order", order);
    // const user = userService.getLoggedinUser()
    // order.owner = user;
  }
}

async function fixOrder(gig, user, owner) {
  const order = {
    buyer: {
      fullname: user.fullname,
      imgUrl: user.imgUrl,
      _id: user._id,
      username: user.username,
    },
    seller: {
      fullname: owner.fullname,
      imgUrl: owner.imgUrl,
      _id: owner._id,
      username: owner.username,
    },
    gig: {
      _id: gig._id,
      title: gig.title,
      price: gig.price + gig.price / 3,
      img: gig.imgUrls[0],
    },
    status: "pending",
  };

  return await save(order);
}

function createOrders() {
  return [
    {
      _id: "o101",
      createdAt: 9898989,
      buyer: {
        userId: "u107",
        fullname: "Dwayne Loony",
        imgUrl:
          "https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg=",
      },
      seller: {
        _id: "u108",
        fullname: "Baadur Lomidze",
        imgUrl:
          "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=",
        rate: 5,
      },
      order: {
        _id: "g101",
        name: "I will design your logo",
        price: 12,
      },
      status: "pending",
    },
  ];
}
createOrders();
