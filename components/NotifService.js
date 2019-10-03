import PushNotification from 'react-native-push-notification';

export default class NotifService {
  constructor(onNotification) {
    this.configure(onNotification);

    this.lastId = 0;
  }
  configure(onNotification, gcm = '') {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  localNotif() {
    this.lastId++;
    PushNotification.localNotification({
      /* iOS only properties */
      alertAction: 'view',

      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'Welcome', // (required)
      playSound: false, // (optional) default: true
    });
  }

  scheduleNotif(info) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 5 * 1000), // in 30 secs

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view

      /* iOS and Android properties */
      title: 'Scheduled Notification', // (optional)
      message: `${info.name} goal has been expired`, // (required)
    });
  }
}
