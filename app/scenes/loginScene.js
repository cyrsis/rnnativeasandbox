import React, { Component } from 'react'
import {
    Container,
    Content,
    View,
    Text
} from 'native-base'
import { Image } from 'react-native'
import Login from '../components/login'
import { observer } from 'mobx-react/native'

@observer
export default class LoginScene extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { theme, stores } = this.props
        return (
            <View>
            <Container theme={theme}>
                <View>

                        <Image source={stores.settings.LoginBG}>
                            <View>
                                <Login {...this.props}/>
                            </View>
                        </Image>
                </View>
            </Container>
            </View>
        )
    }
}
