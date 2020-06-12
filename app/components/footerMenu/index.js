import React from 'react';
import { StyleSheet, Text, View, Dimensions, WebView, Image, TouchableHighlight } from 'react-native';

import styles from './style';
import { getPageLang } from '../../languages';

import HomePressed from '../../assets/images/home64.png';
//import HomeNormal from '../../assets/images/home.png';
import IotPressed from '../../assets/images/smart-home64.png';
//import IotNormal from '../../assets/images/smart-home.png';
import NewsPressed from '../../assets/images/news64.png';
//import NewsNormal from '../../assets/images/news.png';
import SmartPressed from '../../assets/images/marketplace64.png';
//import SmartNormal from '../../assets/images/marketplace.png';
import ProfilePressed from '../../assets/images/profile64.png';
//import ProfileNormal from '../../assets/images/profile.png';


class FooterMenu extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('menu');
        this.state = {
            currentMenu: parseInt(props.currentMenu),
            menu: [
                {
                    id: 1, text: this.pagelang['menu1'],
                    style: props.currentMenu == 1 ? styles.activelink : styles.nonactivelink,
                    imgSource:  HomePressed
                },
                {
                    id: 2, text: this.pagelang['menu2'],
                    style: props.currentMenu == 2 ? styles.activelink : styles.nonactivelink,
                    imgSource: IotPressed 
                },
                {
                    id: 3, text: this.pagelang['menu3'],
                    style: props.currentMenu == 3 ? styles.activelink : styles.nonactivelink,
                    imgSource:NewsPressed 
                },
                {
                    id: 4, text: this.pagelang['menu4'],
                    style: props.currentMenu == 4 ? styles.activelink : styles.nonactivelink,
                    imgSource:  SmartPressed 
                },
                {
                    id: 5, text: this.pagelang['menu5'],
                    style: props.currentMenu == 5 ? styles.activelink : styles.nonactivelink,
                    imgSource: ProfilePressed 
                }
            ]
        }

    }

    _changeMenu(idx) {
        if (this.state.currentMenu != idx) {
            this.setState({ currentMenu: idx });
            if (idx == 1) {
                this.props.navigation.replace('Home');
            } else if (idx == 3) {
                this.props.navigation.replace('Entertainment');
            } else if (idx == 4) {
                this.props.navigation.replace('Marketplace');
            } else if (idx == 5) {
                this.props.navigation.replace('MyPage');
            }
        } else {
            this.props.refreshPage();
        }
    }

    render() {

        return (
            <View style={styles.footer}>
                {
                    this.state.menu.map((menu, i) =>
                        <View style={styles.menuView} key={menu.id} >
                            <TouchableHighlight onPress={() => this._changeMenu(menu.id)} underlayColor={'rgba(0,0,0,0)'}>
                                <View style={styles.menuItem}>
                                    <Image source={menu.imgSource} style={{resizeMode:'contain', flex:1}} />
                                    <Text style={menu.style}>{menu.text}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                }
            </View >
        )
    }
}

export default FooterMenu;