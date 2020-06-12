import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Dimensions, ImageBackground, Image, TouchableOpacity, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import globalStyles from '../global.style';
import LoadingScreen from '../../components/LoadingScreen';


class ForgotPasswordScreen extends React.Component {
 
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('forgotpass');
        this.globallang = getPageLang('global');

        this.state = {
            title: 'Reset Password',
            canGoBack: true,
            canChangeCommunity: false,
            phonenumber: '',
            passnew: '',
            passconfirm: '',
            passwordValid:false,
            passwordconfirmValid:false,
            hidePassword: true,
            hideConfirmPassword: true,
            showLoading: false
        }
        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
     
        this._retrieveData('user-phonenumber').then(info => {
            if(info !== null) {
                info = JSON.parse(info)
                this.setState({...this.state,
                    phonenumber: info.phonenumber,
                });
            } 
            else this.props.navigation.replace('ResetPass');   
            
            console.log(info);
        })
    }

    componentDidMount=(props)=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        //this._retrieveData('login-info');
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

        this.props.navigation.replace('Login');
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    canBeSubmitted() {
        const { passconfirm ,passnew } = this.state;
        return passconfirm.length > 0 && passnew.length > 0;
    }

    managePasswordVisibility = () =>{
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    manageConfirmPasswordVisibility = () =>{
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }

    validatePassword = (text) => {
        console.log(text);
        // let reg = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        let reg = /^.{6,50}$/;
        if(reg.test(text) === false){
            console.log("Password is Not Correct");
            // Alert.alert(this.globallang.alert, this.pagelang.phonenumbercorrect, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            this.setState({passnew:text, passwordValid: false})
            console.log(this.state.passwordValid);
            return false;
        }
        else {
          this.setState({passnew:text, passwordValid: true})
          console.log(this.state.passwordValid);
          console.log("Password is Correct");
        }
    }

    onErrorPass() {
        if (this.state.passnew === ''){
            return null
        }
        if ( this.state.passwordValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* The password must be a combination of letters, numbers, or symbols of at least 6 digits, without spaces </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Password match </Text>;
        }
    }

    validatePasswordConfirm = (text) => {
        console.log(text);
        // let reg = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        let reg = /^.{6,50}$/;
        if(reg.test(text) === false){
            console.log("Password Confirm is Not Correct");
            this.setState({passconfirm:text, passwordconfirmValid: false})
            console.log(this.state.passwordconfirmValid);
            return false;
        }
        else {
          this.setState({passconfirm:text, passwordconfirmValid: true})
          console.log(this.state.passwordconfirmValid);
          console.log("Password Confirm is Correct");
        }
    }

    onErrorPassConfirm() {
        if (this.state.passconfirm === ''){
            return null
        }
        if (this.state.passnew !== this.state.passconfirm || this.state.passwordValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Must be the same as the password created</Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Password Confirmation match</Text>;
        }
    }


    doChange=()=>{ 
        if(this.state.passnew === ""){
            Alert.alert(this.globallang.alert, this.pagelang.faled_pass_new, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        if(this.state.passconfirm === ""){
            Alert.alert(this.globallang.alert, this.pagelang.faled_pass_confrim, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if (this.state.passnew !== this.state.passconfirm){
            Alert.alert(this.globallang.alert, this.pagelang.faled_samepass, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.passwordValid === false){
            Alert.alert(this.globallang.alert, "Please correct your password!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.passwordconfirmValid === false){
            Alert.alert(this.globallang.alert, "Please correct your password confirmation!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        this.setState({showLoading:true});

        fetch(global.serverurl + global.webserviceurl + '/app_forget_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify({'phonenumber': this.state.phonenumber, 'passnew': this.state.passnew, 'passconfirm': this.state.passconfirm})
        }).then((response) => {
            this.setState({showLoading:false});
            console.log(response);
            this.props.navigation.replace('Login');
        })
        .catch((error) => {
            this.setState({showLoading:false});
            console.log(error);
        });      
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
                <Text style={{alignSelf:'center', marginTop:5, marginBottom:20,fontSize:18, fontWeight:'bold', color:'#000', justifyContent:'center', textAlign:'center'  }}>Reset the password to access your KOSMO account login</Text>
                    <Text style={styles.label}>{this.pagelang.newPass}:</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyourpassword}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            secureTextEntry={this.state.hidePassword}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            value={this.state.passnew}
                            onChangeText={(text) => this.validatePassword(text)} 
                            // onChangeText={(text)=>this.setState({password: text})}
                            >
                        </TextInput>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                            <Image source = { ( this.state.hidePassword ) ? require('../../assets/images/eye.png') : require('../../assets/images/view.png') } style = { styles.btnImageIcon } />
                        </TouchableOpacity>  
                    </View>
                    <View style={{flexDirection:'row', marginTop:-16, marginBottom:6}} >
                        {this.onErrorPass()}
                    </View>

                    <Text style={styles.label}>{this.pagelang.confirmPass}:</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.confirmyourpassword}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            secureTextEntry={this.state.hideConfirmPassword}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            value={this.state.passconfirm} 
                            onChangeText={(text) => this.validatePasswordConfirm(text)} 
                            // onChangeText={(text)=>this.setState({confirmPassword: text})}
                            >
                        </TextInput>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.manageConfirmPasswordVisibility }>
                            <Image source = { ( this.state.hideConfirmPassword ) ? require('../../assets/images/eye.png') : require('../../assets/images/view.png') } style = { styles.btnImageIcon } />
                        </TouchableOpacity>  
                    </View>
                    <View style={{flexDirection:'row', marginTop:-16, marginBottom:6}} >
                        {this.onErrorPassConfirm()}
                    </View>

                    <View style={{marginTop:10}} >
                        <TouchableOpacity onPress={()=>this.doChange()}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>SUBMIT</Text>
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

export default ForgotPasswordScreen