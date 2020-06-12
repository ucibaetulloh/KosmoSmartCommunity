import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, Dimensions, ImageBackground, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import {AddMinutesToDate} from '../../global';
import styles from './style';
import globalStyles from '../global.style';
import AddPlus from '../../assets/images/AddPlus.png';
import LoadingScreen from '../../components/LoadingScreen';

class AccountBinding extends React.Component {


    constructor(props) {
        super(props);
        this.pagelang = getPageLang('linkaccount');
        this.globallang = getPageLang('global');
        global.community = { code: "", text: "" };

        this.state = {
            title: this.pagelang.title,
            canGoBack: true,
            webUri: '',
            canChangeCommunity: false,
            communityList: [],
            account:[],
            UserName:'',
            Password:'',
            bindingAct:{
                phonenumber:'',
                DebtorAcct:'',
                LotNo:'',
                BisnisId:''
            },
            link:{
                phonenumber:''
            },
			usertypes: [],
            prepareQuit:false,
            hidePassword: true,
            showLoading: false
        }

        //this.webview = React.createRef();
        //this.getCommunityList();
        
    }
	
	_retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    _retrieveDataBinding = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        this._retrieveData('smart-app-id-login').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })

        this._retrieveData('smart-app-id-binding').then(info => {
            if(info !== null)  this.props.navigation.replace('AccountBindingList');            
        })
        
    }

    componentDidMount=(props)=>{
        
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null) {
                this.setState({link: JSON.parse(info)});
            } 
            else this.props.navigation.replace('Login');   
            
            console.log(info);
            console.log(this.state);
        })
        
        console.log(AsyncStorage.getItem("phonenumber"));
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    changeCommunity(community) {
        global.community = community;
    }

    handleBackPress = ()=>{
        this.props.navigation.replace('MyPage');
        return true;
    }   
      
    goBack=()=> {
        this.props.navigation.replace('MyPage');
    }

    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {
        
    }

    refreshPage = () => {

        this.props.navigation.replace('MyPage');
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    canBeSubmitted() {
        const { UserName, Password } = this.state;
        return UserName.length > 0 && Password.length > 0;
      }

    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    _storeDataUser = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    managePasswordVisibility = () =>{
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    doBinding=()=>{
		
        if(this.state.UserName === ''){
            Alert.alert(this.globallang.alert, this.pagelang.please_input_username, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        if(this.state.Password === ''){
            Alert.alert(this.globallang.alert, this.pagelang.please_input_password, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
		
        let params = {
            phonenumber : this.state.link.phonenumber,
            UserName: this.state.UserName,
            Password: this.state.Password
        }

        this._storeDataUser('Modernland-Account', JSON.stringify(params));

    
        console.log(global.serverurl + global.webserviceurl + '/access_token_binding.php');
        this.setState({showLoading:true});

        fetch(global.serverurl + global.webserviceurl + '/access_token_binding.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then((response) => {
                return response.json();
        }).then((response) => {
            this.setState({showLoading:false});
            console.log(response);
            if (response.status === "OK") {
                if(response.status === "Error"){
                    Alert.alert(this.globallang.alert, this.pagelang.invalid_account, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    let payload = {
                        access_token : response.token.access_token,
                        token_type : response.token.token_type,
                        expires_in : response.token.expires_in,
                    }
                    this.setToken(payload);
                    // this._storeData('smart-app-id-token', JSON.stringify(response.token));
                    this._storeData('smart-app-id-binding', JSON.stringify(response.data));
                    this.props.navigation.replace('Home');
                }
            } else {
                //error
                // AsyncStorage.removeItem('smart-app-id-token');
                Alert.alert(this.globallang.alert, response.message,
                    [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }],
                    { cancelable: false });
            }
        }).catch((error) => {
            this.setState({showLoading:false});
            console.log(error);
        });
        console.log(params);
    }

    setToken = (payload) =>{
        console.log(payload)
        return new Promise((resolve, reject,) => {
			if(typeof payload === 'undefined') {
				return reject({message : "Error"});
			}
			
			try {
				// let str_data = JSON.stringify(data);
				let exp = new Date() ;
				let access_token = payload.access_token;
				let type_token = payload.token_type;
				let expires_in = payload.expires_in;
				var refresh_at = AddMinutesToDate(new Date(), 30).getTime();
				let data = {
					access_token : access_token,
					expires_in : expires_in,
					refresh_at : refresh_at,
					type_token : type_token,
				};
				console.log(data);

				let strData = JSON.stringify(data);
				resolve(AsyncStorage.setItem('smart-app-id-token', strData));
				

			} catch(e){
				return reject(e);
			}
		});
    }

    renderPrepareQuit=()=>{
        if(this.state.prepareQuit){
            return (
                <PrepareQuit started={this.state.prepareQuit} cancel={this.cancelQuit} />
            )
        }
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
                {/* <HeaderTitle param={{ title: this.state.title,  canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} /> */}
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
                <ScrollView style={{ flex:1, position:'absolute', top:50, bottom:0, left:0, right:0 }}>
                <View style={styles.formContainer}>
                        <Image source={require('../../assets/images/logo_mini_modernland.png')} style={{alignSelf:'center', width: 300, height: 50 }} resizeMode="stretch" />
                        <Text style={{alignSelf:'center', marginTop:10, marginBottom:20,fontSize:20, fontWeight:'bold', color:'#000'  }}>Please login to your Link Account</Text>
                    <Text style={styles.label}>{this.pagelang.username}:</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/identity-card.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.input_username} 
                            placeholderTextColor='#000'
                            autoFocus={false}
                            keyboardType='default'
                            autoCapitalize = 'none'
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.setState({UserName: text})}></TextInput>
                    </View>
                    <Text style={styles.label}>{this.pagelang.password}:</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputPass} 
                            placeholderTextColor='#000'
                            autoFocus={false}
                            secureTextEntry={this.state.hidePassword}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.setState({Password: text})}></TextInput>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                            <Image source = { ( this.state.hidePassword ) ? require('../../assets/images/eye.png') : require('../../assets/images/view.png') } style = { styles.btnImage } />
                        </TouchableOpacity>    
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>this.doBinding()}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>BINDING ACCOUNT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {this.renderLoading()}
            </ImageBackground>
            </View>
        );
    }
}

export default AccountBinding