import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {
    Button,
    Thumbnail,
    Text,
    Icon,
    View,
    Spinner
} from 'native-base'
import {StyleSheet} from 'react-native'
import { autoSubscriber } from 'firebase-nest' //Subscribe to the different firebase query auto
import SwipeCards from 'react-native-swipe-cards'


class MatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: null
        }
    }

    static getSubs(props, state) {
        return props.stores.matches.subs()
    }

    subscribeSubs(subs, props, state) {
        const {matches} = props.stores
        const {unsubscribe, promise} = matches.subscribeSubsWithPromise(subs)
        this.setState({fetching: true}, () => {
            promise.then(() => {
                this.setState({fetching: false})
            })

        })
        return unsubscribe

    }

    markViewed(match) {
        this.props.stores.matches.markViewed(match[0]) //We want the key , want the key for the instance
    }

    renderCard(post, store) {
        const postObj = post ? post[1] : null
        if (postObj) {
            let pic = {url: postObj.url}
            let text = postObj.text

            return (
                <View style={styles.card}>
                    {pic.url != undefined && pic.uri != "" ? <Thumbnail source={pic}/> : null}
                    <Text style={styles.Text}>
                        {text}
                    </Text>
                </View>
            )
        }
        return null
    }

    renderNoMoreCards() {
        return (
            <View style={styles.noMoreCards}>
                <Text> Out of Matches</Text>
            </View>
        )
    }

    render() {
        const {matches} = this.props.stores
        const postList = matches.getData('matches')
        const list = postList ? postList.entries() : null
        const {fetching} = this.state


        return (
            <View>
                {fetching ? <Spinner/> :
                    <SwipeCards
                        cards={list}
                        renderCard={(card) => this.renderCard(card, matches)}
                        renderNoMoreCards={this.renderNoMoreCards}
                        handleYup={this.markViewed.bind(this)}
                        handleNope={this.markViewed.bind(this)}
                    />}
            </View>

        );
    }
}

const style = StyleSheet.create({
    card: {
        alignItems : 'center',
        borderRadius: 5,
        borderColor:'grey',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth:1,
        elevation:1
    },
    text: {
        color: 'black',
        fontSize: 20,
        paddingBottom: 10,
        paddingTop:10
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',

    }
})
export default autoSubscriber(observer(MatchList)) //let autoSubscriber wrap the observerable
