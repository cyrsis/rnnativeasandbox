import React, { Component } from 'react';
import { Drawer } from 'native-base';
import { View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import SideMenu from "./components/sideMenu";
import theme from './theme/base-theme';

import SettingsStore from "./stores/SettingsStore";
import AuthStore from './stores/authStore';
import MatchStore from './stores/matchStore';

import SplashScene from "./scenes/SplashScene";
import LoginScene from './scenes/loginScene';
import MatchScene from './scenes/MatchScene';

const settings = new SettingsStore()
const authStore = new AuthStore()
const matchStore = new MatchStore()


export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            store: {
                settings: settings,
                auth:authStore,  //Once we get here, every scence and componet have access
                matches:matchStore
            },
            theme: theme
        };
    }

    toggleDrawer() {
        this.state.toggled ? this._drawer.close() : this._drawer.open();
    }

    openDrawer() {
        this.setState({toggled: true});
    }

    closeDrawer() {
        this.setState({toggled: false});
    }

    renderScene(route, navigator) {
        switch (route.title) {
            case 'Splash': {
                return <SplashScene {...route.passProps} navigator={navigator}/>
            }
            case 'Login' :{
                return <LoginScene {...route.passProps} navigator={navigator}/>
            }
            case 'Match' :{
                return <MatchScene {...route.passProps} navigator={navigator}/>
            }
            default:
                return null;
        }
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {

        return (

            <Drawer
                ref={(ref) => this._drawer = ref}
                type='displace'
                content={<SideMenu navigator={this._navigator} theme={this.state.theme}/>}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)}
                openDrawerOffset={100}
                panOpenMask={.25}
            >
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                    initialRoute={{
                        title: "Splash",
                        passProps: {
                            stores: this.state.store,
                            toggleDrawer: this.toggleDrawer.bind(this),
                            theme: this.state.theme
                        }
                    }}
                />
            </Drawer>
        );
    }
}
