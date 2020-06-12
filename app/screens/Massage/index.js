import React from 'react';
import { StyleSheet, Text, View, Dimensions, WebView, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';

import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';

class MessageScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('message');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            //webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false
        }
        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        /*if(global.logininfo === undefined){
            this.props.navigation.replace('Login');
        }*/
        this._retrieveData('login-info').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })
    }

    componentDidMount=()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.goBack();
    }

    changeCommunity(community) {
        global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    goBack=()=> {
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        this.props.navigation.goBack();
    }

    //----receive on message from webview
    receivePost(param) {
        //let jsonParam = JSON.parse(param);
        //this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack });

    }
    //------------------------------------

    refreshPage = () => {
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2' }}>
            </ScrollView>
            {/*<FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />*/}
        </View>
        );
    }
}

export default MessageScreen