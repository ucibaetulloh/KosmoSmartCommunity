import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Dimensions, ImageBackground, Image, TouchableHighlight, ScrollView, BackHandler, TouchableOpacity, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import globalStyles from '../global.style';
import LoadingScreen from '../../components/LoadingScreen';


class ResetPasswordScreen extends React.Component {
 
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('forgotpass');
        this.globallang = getPageLang('global');

        this.state = {
            title: 'Forgot Password',
            canGoBack: true,
            canChangeCommunity: false,
            phonenumber: '',
            otp:'',
            showLoading: false
        }
        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
     
    }

    componentDidMount=(props)=>{
        this.generateOTP();
    
        console.log(this.state.otp);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.props.navigation.replace('Login');
        return true;
    }   

    goBack() {
        this.props.navigation.goBack();
    }

    

    changeCommunity(community) {
        global.community = community;
    }

    //----receive on message from webview
    receivePost(param) {

    }
    //------------------------------------

    refreshPage = () => {

        this.props.navigation.replace('Login');
    }

    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    generateOTP = ()=>{
        var digits = '0123456789'
        let OTP = '';
        for (let i = 0; i < 5; i++){
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        this.setState({otp : OTP})
        return OTP;
    }

    checkPhonenumber=()=>{
        if(this.state.phonenumber === ''){
            Alert.alert(this.globallang.alert, "Please enter your mobile phone number!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        let params = {
            phonenumber : this.state.phonenumber
        }

        console.log(params);
        this.setState({showLoading:true});
        fetch(global.serverurl + global.webserviceurl + '/app_phonenumber_validation.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then((response) => {
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).then((response) => {
            this.setState({showLoading:false});
            console.log(response);
            if(response.status === "OK"){
                this.doReset();
            }
            else{
                    Alert.alert(this.globallang.alert, "Your mobile phone number has not been registered", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }
        }).catch((error) => {
            this.setState({showLoading:false});
            console.log(error);
        });


    }
    doReset = () =>{

        let params = {
            phonenumber : this.state.phonenumber,
            otp : this.state.otp
        }

        console.log(params);
        this.setState({showLoading:true});
        fetch(global.serverurl + global.webserviceurl + '/sms_otp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then((response) => {
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).then((response) => {
            this.setState({showLoading:false});
            console.log(response);
            this._storeData('user-phonenumber', JSON.stringify(params));
            this.props.navigation.replace('CodeOTP');
        }).catch((error) => {
            this.setState({showLoading:false});
            console.log(error);
        });
    }

    canBeSubmitted() {
        const { phonenumber} = this.state;
        return phonenumber.length > 0;
    }

    renderLoading=()=>{
        if(this.state.showLoading){
            return (
                <LoadingScreen></LoadingScreen>
            )
        }
    }


    render(){
        const isEnabled = this.canBeSubmitted();
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
            <ScrollView style={{ flex:1, position:'absolute', top:50, bottom:0, left:0, right:0}}>
                <View style={styles.formContainer}>
                    <Text style={{alignSelf:'center', marginTop:5, marginBottom:20,fontSize:14, fontWeight:'bold', color:'#000', justifyContent:'center', textAlign:'center'  }}>Enter the mobile phone number used at registration. Verification code will be sent to the mobile phone number.</Text>
                    <Text style={styles.label}>Mobile Phone Number:</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/contact-button.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputnumber} 
                            placeholderTextColor='#000'
                            autoFocus={false}
                            keyboardType='phone-pad'
                            autoCapitalize = 'none'
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.setState({phonenumber: text})}></TextInput>
                    </View>
                    <View>  
                        <TouchableOpacity onPress={()=>this.checkPhonenumber()}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>SEND</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
            {this.renderLoading()}
        </View>
        );
    }
}

export default ResetPasswordScreen