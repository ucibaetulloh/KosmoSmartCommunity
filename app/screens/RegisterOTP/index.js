import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    BackHandler,
    Text,
    View,
    ScrollView,
    Alert,
    Button,
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

class RegisterOTP extends React.Component {

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
            newotp:'',
            name: '',
            issuspend: 0,
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
                issuspend : this.state.issuspend
              }
              console.log(params);
              fetch(global.serverurl + global.webserviceurl + '/app_update_register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: JSON.stringify({'phonenumber': this.state.phonenumber, 'issuspend': this.state.issuspend})
              }).then((response) => {
                if (response.status === 200)
                    return response.json();
                else
                    throw new Error('Something wrong with api server');
            }).then((response) => {
                console.log(response);
                if (response.status === "OK") {
                    if(response.records.length === 0){
                        Alert.alert(this.globallang.alert, this.pagelang.invalidlogin, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    }else{
                        // global.logininfo = response.records[0];
                        // this._storeData('smart-app-id-login', JSON.stringify(response.records[0]))
                        this.props.navigation.replace('Login');
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
    
            console.log(params);
    
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
          this._storeData('user-register', JSON.stringify(params));
          this.props.navigation.replace('RegisterOTP');
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

  _retrieveData2 = async (key) => {
    let value = await AsyncStorage.getItem(key);
    return value;
}


    componentDidMount(){
      this.generateOTP();
      this._retrieveData('user-register').then(info => {
        if(info !== null) {
            info = JSON.parse(info)
            this.setState({...this.state,
                phonenumber: info.phonenumber,
                otp: info.otp
            });
        } 
        else this.props.navigation.replace('Register');   
        
        console.log(info);
    })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
      this.props.navigation.replace('Register');
      return true;
    } 

    goBack() {
        this.props.navigation.goBack();
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

    // handleBackPress = ()=>{
    //     return true;
    // }

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

    generateOTP = ()=>{
      var digits = '0123456789'
      let OTP = '';
      for (let i = 0; i < 5; i++){
          OTP += digits[Math.floor(Math.random() * 10)];
      }

      this.setState({newotp : OTP})
      return OTP;
  }

    // goBack() {
    //     //check if the page is on first page. do navigation back. if not, change page to idx before
    //     if(this.state.currentPage > 0){
    //         this.setState({currentPage: this.state.currentPage-1});
    //     }else
    //         this.props.navigation.goBack();
    // }

    refreshPage = () => {

      this.props.navigation.replace('Login');
      //let d = new Date();
      //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
  }


    render(){
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ScrollView style={{position:'absolute',top:30,left:0,right:0, bottom:0, backgroundColor:'#fff' }}>
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
                    {/* <View style={styles.otpTextView}>
                            <Text style={styles.otpHyperlink} onPress={()=>this.doReset()}>Resend</Text>
                    </View> */}
                    {/* <Button
                      onPress={()=>this.doReset()}
                      title={"RESEND"}
                      color="rgb(8,194,223)"
                      // disabled={!isEnabled}
                    /> */}
                    <CountDown
                      until={300}
                      onFinish={this.onDoneCountdown}
                      onPress={this.onPressCountdown}
                      size={15}
                    />
                </View>
            </ScrollView>
            {/*<FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />*/}
            {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
            {/* {this.renderPrepareQuit()} */}
        </View>
        );
    }

}

export default RegisterOTP
