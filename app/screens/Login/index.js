import React from 'react';
import { View, Text, Button, ImageBackground, Alert, TextInput, BackHandler, ScrollView, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import styles from './style';
import globalStyles from '../global.style';
import LoadingScreen from '../../components/LoadingScreen';

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
            prepareQuit:false,
            hidePassword: true,
            showLoading: false, 
        }
        
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
    
    goBack() {
        this.props.navigation.goBack();
    }

    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {
        
    }
    

    goToRegister=()=>{
        this.props.navigation.navigate('Register');
    }

    goSetPass=()=>{
        this.props.navigation.navigate('ResetPass');
        // this.props.navigation.navigate('ForgotPass');
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
            Alert.alert(this.globallang.alert, "Please input your phone number!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        if(this.state.password === ""){
            Alert.alert(this.globallang.alert, "Please input your password account!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        this.setState({showLoading:true});

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
            this.setState({showLoading:false});
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
            this.setState({showLoading:false});
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

    managePasswordVisibility = () =>
    {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    renderLoading=()=>{
        if(this.state.showLoading){
            return (
                <LoadingScreen></LoadingScreen>
            )
        }
    }

    render() {

        const isEnabled = this.canBeSubmitted();
        return (
            <View style={globalStyles.screenContainer}>
                <ImageBackground source={require('../../assets/images/bg_login2.png')} style={styles.pictureContainer}>
                <ScrollView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <View style={styles.formContainer}>
                        <Image source={require('../../assets/images/Kosmo.png')} style={{alignSelf:'center', width: 100, height: 100, marginTop:20 }} />
                            <Text style={{alignSelf:'center', marginTop:10, marginBottom:5,fontSize:22, fontWeight:'bold', color:'#000'  }}>KOSMO</Text>
                            {/* <Text style={{alignSelf:'center', marginTop:5, marginBottom:5,fontSize:22, fontWeight:'bold', color:'#000'  }}>(Komunitas Modern)</Text> */}
                            <Text style={{alignSelf:'center', marginTop:5, marginBottom:20,fontSize:18, fontWeight:'bold', color:'#000'  }}>Please login to your account!</Text>
                        <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/contact-button.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder="Mobile Phone Number" 
                            placeholderTextColor='#000'
                            autoFocus={false}
                            keyboardType='phone-pad'
                            autoCapitalize = 'none'
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.setState({phonenumber: text})}></TextInput>
                        </View>
                        <View style={styles.inputContainer1}>
                            <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                            <TextInput style={styles.inputs}
                                placeholder="Password" 
                                placeholderTextColor='#000'
                                autoFocus={false}
                                secureTextEntry={this.state.hidePassword}
                                keyboardType='default'
                                underlineColorAndroid='transparent'
                                onChangeText={(text)=>this.setState({password: text})}></TextInput>
                            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                <Image source = { ( this.state.hidePassword ) ? require('../../assets/images/eye.png') : require('../../assets/images/view.png') } style = { styles.btnImage } />
                            </TouchableOpacity>    
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>this.doLogin()}>
                                <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                    <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>LOGIN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.registerTextView}>
                            <Text>{this.pagelang.donthaveanaccount} </Text><TouchableOpacity onPress={()=>this.goToRegister()}><Text style={styles.registerHyperlink}>Sign Up</Text></TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
                            <View style={{flex:1, flexDirection:'column'}}>
                            <TouchableOpacity onPress={()=>this.goSetPass()}>
                                <View style={{justifyContent:'flex-start', flexDirection:'row'}} >
                                    <Text style={{paddingTop:6, fontWeight:'bold', color:'#fff'}} >{this.pagelang.passwordlink}?</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column'}} >
                            <TouchableOpacity onPress={()=>this.handleBackPress()}>
                                <View style={{justifyContent:'flex-end', flexDirection:'row'}} >
                                    <Text style={{paddingTop:6, fontWeight:'bold', paddingRight:6, color:'#fff'}} >Back to Home</Text>
                                    <Image style={{width:30,height:30, borderRadius:15, justifyContent: 'center'}} source={require('../../assets/images/home64.png')}/>
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View> 
                    </View>  
                </ScrollView>
                </ImageBackground>
                {this.renderLoading()}
            </View>
        );
    }
}

export default LoginScreen