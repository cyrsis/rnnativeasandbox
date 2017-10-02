import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
import RNFetchBlob from  'react-native-fetch-blob'

const Blob =RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const base = 'posts'

export default class Poststore extends MobxFirebaseStore {
    constructor() {
        super(firebase.database().ref())
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;
            this.storage = firebase.storage().ref(user.uid) //I can have storeage from the user.uid object
        })

    }
}