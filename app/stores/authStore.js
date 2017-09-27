import {observable, action} from 'mobx'
import firebase from 'firebase'


export default class AuthStore{
    @observable authUser = null

    constructor() {
       firebase.auth().onAuthStateChanged((user)=>{
           this.authUser=user;
       }) //Every time, auth changes would reference to different users with their profiles
    }

    @action
    signIn({email, password}){
        if (this.authUser) { //Check the user sign in or not
            return Promise.resolve(this.authUser)
        }
        
    }

    @action
    signOut() {

    }
}
