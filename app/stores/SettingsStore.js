import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'

const config = {
    apiKey: "AIzaSyBQ6FZfyzpyICkXTf60o3TU3H39DkWJCq4",
    authDomain: "onpaper-9c248.firebaseapp.com",
    databaseURL: "https://onpaper-9c248.firebaseio.com",
    projectId: "onpaper-9c248",
    storageBucket: "onpaper-9c248.appspot.com",
    messagingSenderId: "665577702717"
}

export default class SettingsStore extends MobxFirebaseStore {
    constructor() {
        firebase.initializeApp(config)
        super(firebase.database().ref())

        this.splashTime = 5000
        this.splashImg = require('../../images/splash.jpg')
    }

    get SplashTime() {
        return this.splashTime
    }

    get SplashImg() {
        return this.splashImg
    }

}

