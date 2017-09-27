import React, { Component } from 'react';
import { Button, InputGroup, Input, Icon, View, Spinner } from 'native-base'
import { observer } from 'mobx-react/native'

@observer //Changes add render
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: null

        }
    }

    updateEmail(email) {
        this.setState({
            email: email
        });
    }

    updatePassword(password) {
        this.setState({
            password: password,
        });
    }

    signIn() {
        const {auth} = this.props.stores
        const {email, password} = this.state

        this.setState({loading: true}, () => {
                auth.signIn({email, password}
                ).then(() => {
                    this.props.navigator.replace({
                        title: 'Match',
                        passProps: this.props
                    })
                })
            }
        );


    }


    render() {
        const {loading} = this.state
        const {auth} = this.props.stores
        return (

            <View theme={this.props.theme}>
                <InputGroup style={{marginBottom: 10}} boarderType='round'>
                    <Icon style={{color: "#fff"}} name='person-outline'/>
                    <Input style={{color: "#fff"}} placeholder='Please Enter Email'
                           placeholderTextColor="#fff"
                           onChangeText={(email) => {
                               this.updateEmail(email)
                           }}
                    />
                </InputGroup>
            </View>
        );
    }
}

