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

async function query() {
  // filterBy = { name: '', type: 'all', selectedLabels: 'all', sortBy: 'name' }
  // return httpService.get('gig')
  return storageService.query(STORAGE_KEY, filterBy);
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
    // console.log(user);
    gig.owner = user;
    return storageService.post(STORAGE_KEY, gig);
  }
}

function _createGigs() {
  const gigs = [
    {
      _id: "i103",
      title: "I will teach you js",
      price: 200,
      owner: {
        _id: "id",
        fullname: "Dan Haimon",
        imgUrl: "url",
        level: "Level 2",
        rate: 4.2,
      },
      daysToMake: 1,
      description: "Teaching JavaScript",
      imgUrls: ["url1", "url2"],
      categories: ["Programming", "proffesional"],
    },
    {
      _id: "i104",
      title: "I will design your website",
      price: 150,
      owner: {
        _id: "u101",
        fullname: "Lee Chang",
        imgUrl: "url",
        level: "Level 1",
        rate: 3,
      },
      daysToMake: 7,
      description: "The best design for your website...",
      imgUrls: ["url1", "url2"],
      categories: ["Design", "Programming", "proffesional"],
    },
  ];
  return gigs;
}

// async function toggleInStock(gigId) {
//     const gig = await httpService.get(`gig/${gigId}`)
//     gig.inStock = !gig.inStock
//     const data = await save(gig)
//     return data
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
