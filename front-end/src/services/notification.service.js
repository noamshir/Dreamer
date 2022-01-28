// import { storageService } from "./async-storage.service.js";
// const STORAGE_KEY = "notification_db";

import { httpService } from "./http.service.js";

export const notificationService = {
  query,
  getById,
  save,
  remove,
};

async function query(userId, type) {
  //TODO - type means buyer or seller
  var filterBy = { userId, type };
  const notifications = await httpService.get("notification", { params: { filterBy } });
  return notifications
}
async function getById(notificationId) {
  return httpService.get(`notification/${notificationId}`);
  // return storageService.get(STORAGE_KEY, notificationId);
}
async function remove(notificationId) {
  return httpService.delete(`notification/${notificationId}`);
  // return storageService.remove(STORAGE_KEY, notificationId);
}
async function save(notification) {
  if (notification._id) {
    return httpService.put(`notification/${notification._id}`, notification);
    // return storageService.put(STORAGE_KEY, notification);
  } else {
    const user = userService.getLoggedinUser()
    notification.userId = user._id;
    return httpService.post("notification", notification);
  }
}

// async function changeStatus(notification) {
//   const updatedNotification = await save(notification)
//   return updatedNotification
// }
