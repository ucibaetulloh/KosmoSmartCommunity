import React from 'react';
import { View, Text, Button, WebView, Alert, TextInput, BackHandler, ScrollView, Image, AsyncStorage } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import styles from './style';
import globalStyles from '../global.style';

class LoginScreen extends React.Component {


    constructor(props) {
        super(props);
        this.pagelang = getPageLang('login');
        this.globallang = getPageLang('global');
        global.community = { code: "", text: "" };

        this.state = {
            title: this.pagelang.title,
            canGoBack: false,
            webUri: '',
            canChangeCommunity: false,
            communityList: [],
            phonenumber:'',
            password:'',
            prepareQuit:false
        }

        //this.webview = React.createRef();
        //this.getCommunityList();
        
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }
    componentWillMount=(props)=>{
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null)  this.props.navigation.replace('MyPage'); 
        })
    }

    componentDidMount(){
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null)  this.props.navigation.replace('MyPage'); 
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.props.navigation.replace('Home');
        return true;
    }                   

    // handleBackPress = ()=>{
        
    //     if(this.state.prepareQuit){
    //         //do quit
    //         BackHandler.exitApp();
    //     }else{
    //         this.setState({prepareQuit: true});
    //     }
    
    //     return true;
    // }

    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {
        
    }

    goBack() {
        this.props.navigation.goBack();
    }

    //----receive on message from webview
    /*receivePost(param) {
        let jsonParam = JSON.parse(param);
        if(jsonParam.showCommunityName == true){
            jsonParam.title = global.community.text;
        }
        this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack, canChangeCommunity: (jsonParam.canGoBack ? false : true) });
    }*/
    

    goToRegister=()=>{
        this.props.navigation.navigate('Register');
    }

    goSetPass=()=>{
        this.props.navigation.navigate('ResetPass');
    }

    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }
	
	canBeSubmitted() {
        const { phonenumber, password } = this.state;
        return phonenumber.length > 0 && password.length > 0;
      }

    doLogin=()=>{
        if(this.state.phonenumber === ''){
            Alert.alert(this.globallang.alert, this.pagelang.pleaseinputphone, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        if(this.state.password === ""){
            Alert.alert(this.globallang.alert, this.pagelang.pleaseinputpassword, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        fetch(global.serverurl + global.webserviceurl + '/app_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify({'phonenumber': this.state.phonenumber, 'password': this.state.password})
        }).then((response) => {
            console.log(response);
            // alert(JSON.stringify(response));
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).then((response) => {
            // alert(JSON.stringify(response));
            if (response.status === "OK") {
                if(response.records.length === 0){
                    Alert.alert(this.globallang.alert, this.pagelang.invalidlogin, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    //global.logininfo = response.records[0];
                    this._storeData('smart-app-id-login', JSON.stringify(response.records[0]))
                    this.props.navigation.replace('Home');
                }
            } else {
                //error
                Alert.alert(this.globallang.alert, response.message,
                    [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }],
                    { cancelable: false });
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log(this.state.phonenumber);
        console.log(this.state.password);

    }

    refreshPage = () => {
        this.props.navigation.replace('Login');
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    renderPrepareQuit=()=>{
        if(this.state.prepareQuit){
            return (
                <PrepareQuit started={this.state.prepareQuit} cancel={this.cancelQuit} />
            )
        }
    }

    render() {

        const isEnabled = this.canBeSubmitted();
        return (
            <View style={globalStyles.screenContainer}>
                {/* <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: true }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} /> */}
                <ScrollView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor:'#ffffff' }}>
                    <View style={styles.formContainer}>
                        <Image source={require('../../assets/images/Kosmo.png')} style={{alignSelf:'center', width: 100, height: 100, marginTop:20 }} />
                            <Text style={{alignSelf:'center', marginTop:10, marginBottom:5,fontSize:22, fontWeight:'bold', color:'#000'  }}>KOSMO</Text>
                            <Text style={{alignSelf:'center', marginTop:5, marginBottom:20,fontSize:18, fontWeight:'bold', color:'#000'  }}>Please login to your Account!</Text>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput underlineColorAndroid='transparent' keyboardType= 'phone-pad' placeholder={this.pagelang.inputyourphone} style={styles.input} onChangeText={(text)=>this.setState({phonenumber: text})}></TextInput>
                        <Text style={styles.label}>{this.pagelang.password}</Text>
                        <TextInput underlineColorAndroid='transparent' keyboardType='name-phone-pad' placeholder={this.pagelang.inputyourpassword} secureTextEntry={true} style={styles.input} onChangeText={(text)=>this.setState({password: text})}></TextInput>
                        <Button
                            onPress={()=>this.doLogin()}
                            title={this.pagelang.login}
                            color="rgb(8,194,223)"
                            accessibilityLabel={this.pagelang.logintoyouraccount}
                            // disabled={!isEnabled}
                            />
                        <View style={styles.registerTextView}>
                            <Text>{this.pagelang.donthaveanaccount} </Text><Text style={styles.registerHyperlink} onPress={()=>this.goToRegister()}>{this.pagelang.register}</Text>
                        </View>
                        <View style={styles.registerTextView}>
                            <Text style={styles.registerHyperlink} onPress={()=>this.goSetPass()}>{this.pagelang.passwordlink}</Text>
                        </View>
                    </View>    
                </ScrollView>
                {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />
                {this.renderPrepareQuit()} */}
            </View>
        );
    }
}

export default LoginScreen