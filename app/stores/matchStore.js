import { action } from 'mobx'
import firebase from 'firebase'
import MobxFireBaseStore from 'mobx-firebase-store'

import React, { Component } from 'react';

export default class MatchStore extends MobxFireBaseStore{
    constructor() {
        super(firebase.database().ref());
        firebase.auth().onAuthStateChanged((user) => {
            this.user=user;
        })
    }

    resolveFirebaseQuery(sub) { //if usre exist ? if user not review it , review it now : null
        return this.user ?this.fb.child(sub.path).orderByChild('viewdBy/'+this.user.uid).equalTo(null).limitToLast(10) :[]
    }

    @action
    markViewed(post){
        let updates = {}
        updates['viewedBy/'+this.user.uid]
        this.fb.child('posts').child(post).update(updates) //Can update all the place at once
    }
    subs(){ //Mobx Firebase specific method
        return [{
            subKey:'matches', //Get our match data, as label
            path:'posts',
            asList: true,
            user: this.user
        }]
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}


