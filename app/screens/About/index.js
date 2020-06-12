import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import globalStyles from '../global.style';

class AboutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('about');
        this.globallang = getPageLang('global');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            canChangeCommunity: false
        }
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        this._retrieveData('smart-app-id-login').then(info => {
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
        this.props.navigation.replace('MyPage');
        return true;
      }   
      
    goBack=()=> {
        this.props.navigation.replace('MyPage');
    }
    
    changeCommunity(community) {
        global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    //----receive on message from webview
    receivePost(param) {
        //let jsonParam = JSON.parse(param);
        //this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack });

    }
    //------------------------------------

    refreshPage = () => {

        this.props.navigation.replace('MyPage');
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    render(){
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
                <View style={styles.MainContainer}>
                <Image source={require('../../assets/images/Kosmo.png')} style={{alignSelf:'center', width: 100, height: 100}} />
                    <Text style= {styles.paragraph}>Komunitas Modern</Text>
                    <Text>Living for the life</Text>
                    <Text>Easy choice for your home living</Text>
                    <Text>Version 1.0.10</Text>
                </View>
            </ImageBackground>
            {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
        </View>
        );
    }
}

export default AboutScreen