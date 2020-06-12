import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    BackHandler,
    Text,
    View,
    ScrollView,
    Alert,
    ImageBackground,
    AsyncStorage
  } from 'react-native';

import CountDown from 'react-native-countdown-component';
import CodeInput from '../../components/ConfirmationCodeInput/ConfirmationCodeInput';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import ModalPicker from '../../components/ModalPicker';
import { getPageLang } from '../../languages';
import config from '../../config';
import styles from './style';
import globalStyles from '../global.style';

class CodeOTP extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('otp');
        this.globallang = getPageLang('global');

        this.state = {
            title: this.pagelang.title,
            canGoBack: true,
            webUri: '',
            canChangeCommunity: false,
            communityList: [],
            currentPage:0,
            openModal:false,
            prepareQuit:false,
            isDateTimePickerVisible: false,
            fields: {},
            errors: {},
            code: '',
            phonenumber: '',
            otp:'',
            newotp:''
        };
    }

    goToHome=()=>{
        this.props.navigation.navigate('Home');
    }

    _onFulfill(code) {
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
        if (code == 'Q234E') {
          Alert.alert(
            'Confirmation Code',
            'Successful!',
            [{text: 'OK'}],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Confirmation Code',
            'Code not match!',
            [{text: 'OK'}],
            { cancelable: false }
          );
          
          this.refs.codeInputRef1.clear();
        }
    }

    _onFinishCheckingCode1(isValid) {
        console.log(isValid);
        if (!isValid) {
          Alert.alert(
            'Confirmation Code',
            'Code not match!',
            [{text: 'OK'}],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Confirmation Code',
            'Successful!',
            [{text: 'OK'}],
            { cancelable: false },
          );
        }
    }

    _onFinishCheckingCode2(isValid, code) {
        console.log(isValid);
        if (!isValid) {
          Alert.alert(
            'Confirmation Code',
            'Code not match!',
            [{text: 'OK'}],
            { cancelable: false }
          );
        } else {
          this.setState({ code });
          Alert.alert(
            'Confirmation Code',
            'Successful!',
            [{text: 'OK'}],
            { cancelable: false }
          );
          setTimeout(() => {
              let params = {
                phonenumber : this.state.phonenumber,
                otp : this.state.otp
              }
              console.log(params);
              this._storeData('user-phonenumber', JSON.stringify(params));
              this.props.navigation.replace('ForgotPass');
          }, 300);
        }
    }

    onDoneCountdown = () => {
 
      Alert.alert("Time Out. Resend OTP");
      setTimeout(() => {
      let params = {
          phonenumber : this.state.phonenumber,
          otp : this.state.newotp
      }
      console.log(params);
      this._storeData('user-phonenumber', JSON.stringify(params));
      this.props.navigation.replace('CodeOTP');
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
          console.log(response);

          this._storeData('user-phonenumber', JSON.stringify(params));
          this.props.navigation.replace('CodeOTP');
      }).catch((error) => {
          console.log(error);
      });
    }, 1000);
   
    }
   
    onPressCountdown = () => {
   
      Alert.alert("Countdown Component Press.");
   
    }

    _retrieveData = async (key) => {
      let value = await AsyncStorage.getItem(key);
      return value;
  }


    componentDidMount(){
      this.generateOTP();
      this._retrieveData('user-phonenumber').then(info => {
        if(info !== null) {
            info = JSON.parse(info)
            this.setState({...this.state,
                phonenumber: info.phonenumber,
                otp: info.otp
            });
        } 
        else this.props.navigation.replace('ResetPass');   
        
        console.log(info);
    })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
      this.props.navigation.replace('ResetPass');
      return true;
  }   

    goBack() {
        this.props.navigation.goBack();
    }



    changeCommunity(community) {
        //not available in this page
    }

    renderPrepareQuit=()=>{
        if(this.state.prepareQuit){
            return (
                <PrepareQuit started={this.state.prepareQuit} cancel={this.cancelQuit} />
            )
        }
    }

    _storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        // Error saving data
      }
    }

    doVerifiy=()=>{
      let params = {
        phonenumber : this.state.phonenumber,
        otp : this.state.otp
      }
      console.log(params);
      this._storeData('user-phonenumber', JSON.stringify(params));
      this.props.navigation.replace('ForgotPass');
    }

    generateOTP = ()=>{
      var digits = '0123456789'
      let OTP = '';
      for (let i = 0; i < 5; i++){
          OTP += digits[Math.floor(Math.random() * 10)];
      }

      this.setState({newotp : OTP})
      return OTP;
  }
   


    render(){
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
            <ScrollView style={{position:'absolute',top:50,left:0,right:0, bottom:0 }}>
                <View style={styles.inputWrapper2}>
                  <Text style={{alignSelf:'center', marginTop:20, marginBottom:2,fontSize:20, fontWeight:'bold', color:'#000', justifyContent:'center', textAlign:'center'  }}>Please Enter Verification Code</Text>
                  <Text style={{alignSelf:'center', marginTop:2, marginBottom:10,fontSize:18, fontWeight:'bold', color:'#000', justifyContent:'center', textAlign:'center'  }}>Sent on your device</Text>
                    <CodeInput
                    ref="codeInputRef1"
                    keyboardType="numeric"
                    codeLength={5}
                    activeColor='#000'
                    inactiveColor='#000'
                    inputPosition='center'
                    size={50}
                    compareWithCode={this.state.otp}
                    autoFocus={false}
                    codeInputStyle={{ fontWeight: '800' }}
                    onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                    containerStyle={{ marginTop: 30, marginBottom:30 }}
                    codeInputStyle={{ borderWidth: 1.5 }}
                    onCodeChange={(code) => { this.state.code = code }}
                    />
                    <CountDown
                      until={300}
                      onFinish={this.onDoneCountdown}
                      onPress={this.onPressCountdown}
                      size={15}
                    />
                </View>
            </ScrollView>
            </ImageBackground>
        </View>
        );
    }

}

export default CodeOTP
