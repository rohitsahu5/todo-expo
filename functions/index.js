const { Expo } = require("expo-server-sdk");
let expo = new Expo();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.handleAddTask = functions.firestore
  .document("/tasks/{taskno}")
  .onCreate((snap, context) => {
    var task = snap.data();
    let messages = [];
    admin
      .firestore()
      .collection("/devices")
      .get()
      .then(data => {
        return data.docs.forEach(element => {
          let token = element.data().token;
          if (!Expo.isExpoPushToken()) {
            console.error(`Push token ${token} is not a valid Expo push token`);
          }
          messages.push({
            to: token,
            sound: "default",
            body: "Hey! You have a New Task :" + task.title,
            data: { id: snap.id }
          });
        });
      })
      .then(() => {
        let chunks = expo.chunkPushNotifications(messages);
        var sendPromises = chunks.map(chunk => {
          return expo.sendPushNotificationsAsync(chunk);
        });
        return sendPromises.all();
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  });
