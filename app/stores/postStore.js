import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
import RNFetchBlob from  'react-native-fetch-blob'

const Blob =RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const base = 'posts' //base on the firebase node

export default class Poststore extends MobxFirebaseStore {
    constructor() {
        super(firebase.database().ref())
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;
            this.storage = firebase.storage().ref(user.uid) //I can have storeage from the user.uid object
        })

    }

    subs(){
        return [{
            subKey: base,
            asList: true,
            path: base
        }]
    }

    @action
    add(text,url){
        let post = {text:text, created:Date.now(),user: this.user.uid,url: url }
        let key = this.fb.child(base).push().key //Update the post with a key to get back
        
        let updates = {}
        update['/'+base+'/'+key] = post
        update['/'+this.user.uid+'/history/'+key] = true
        this.fb.update(updates) //Demo of update 2 different place
    }


}