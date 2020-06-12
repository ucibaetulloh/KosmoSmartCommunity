import React from 'react';
import { View, ScrollView, Text, ImageBackground, Image, Alert, TextInput, BackHandler, TouchableHighlight,TouchableOpacity, AsyncStorage } from 'react-native';
import HeaderTitle from '../../components/headerTitleRegister/index';
//import FooterMenu from '../../components/footerMenu/index';
import ModalPicker from '../../components/ModalPicker';
import { getPageLang } from '../../languages';
import config from '../../config';
import styles from './style';
import globalStyles from '../global.style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import LoadingScreen from '../../components/LoadingScreen';

class Register extends React.Component {


    constructor(props) {
        super(props);
        this.pagelang = getPageLang('register');
        this.globallang = getPageLang('global');

        //global.community = { code: "", text: "" };
        let dob = new Date();
        let year = dob.getFullYear();
        let month = dob.getMonth()+1;
        let day = dob.getDate();

        this.state = {
            title: "Sign Up",
            canGoBack: true,
            webUri: '',
            canChangeCommunity: false,
            communityList: [],
            phonenumber: '',
            name: '',
            nickname: '',
            genderId: '0',
            genderText: '',
            dob: dob,
            dobText : day+'-'+month+'-'+year, 
            profilePic: '',
            email: '',
            company: '',
            location: '',
            password: '',
            confirmPassword: '',
            currentPage:0,
            openModal:false,
            isDateTimePickerVisible: false,
            fields: {},
            errors: {},
            otp:'',
            hidePassword: true,
            hideConfirmPassword: true,
            phonenumberValid:false,
            passwordValid:false,
            passwordconfirmValid:false,
            emailValid:false,
            isButtonDisabled: false,
            isTimer:false,
            code: '',
            showLoading: false
        }
        this.genderData = [];
        this.handleChange = this.handleChange.bind(this);
        this.onLaunchClicked = this.onLaunchClicked.bind(this);
    }

    handleChange() {
        let fields = this.state.fields;
        fields[target.value];
        this.setState({
          fields
        });
  
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
          this.setState({ code,  isTimer:false });
          setTimeout(function(){
            Alert.alert(
                'Confirmation Code',
                'Successful!',
                [{text: 'OK'}],
                { cancelable: false }
              );
            
         }, 50)
        }
    }

    onErrorOTP() {
        if ( this.state.code === '') {
            return <Text style={{color:'red', fontSize:11}}>* 6 digit verification code</Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* 6 digit verification code</Text>;
        }
    }

    onTimer(){
        if (this.state.isTimer === true ){
            return <CountDown
            until={300}
            size={9}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
          />
        }{
            return null
        }
    }


    componentDidMount(){
        this.generateOTP();
        this.getGenderList();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.props.navigation.replace('Login');
        return true;
    } 

    // goBack() {
    //     this.props.navigation.goBack();
    // }

    goBack() {
        if(this.state.currentPage > 0){
            this.setState({currentPage: this.state.currentPage-1});
        }else
            this.props.navigation.goBack();
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


    changeCommunity(community) {
        //not available in this page
    }

    getGenderList=()=>{
        fetch(global.serverurl + global.webserviceurl + '/app_get_gender_list.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify({})
        }).then((response) => {
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).then((response) => {
            if (response.status === "OK") {
                this.genderData = [];
                
                for(let i=0;i<response.records.length ;i++){
                    this.genderData.push({ value:response.records[i].id, text: response.records[i].name});
                }
                //if(this.state.genderId === 0 && this.genderData.length>0){
                    this.setState({genderId: this.genderData[0].value, genderText: this.genderData[0].text});
                //}

            } else {
                //error
                /*Alert.alert(this.globallang.alert, response.message,
                    [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }],
                    { cancelable: false });*/
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    _storeData2 = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    onLaunchClicked (event) {
        event.preventDefault();
        this.setState({
            isButtonDisabled: true
        });
    
        setTimeout(() => this.setState({ isButtonDisabled: false }), 5000);
        // return this.props.onLaunchClicked();
    }

    doOTP = () =>{
        let params = {
            phonenumber : this.state.phonenumber,
            otp : this.state.otp
        }

        console.log(params);
        this._storeData2('user-register', JSON.stringify(params));
        


        fetch(global.serverurl + global.webserviceurl + '/sms_otp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then((response) => {
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).catch((error) => {
            console.log(error);
        });
    }

    dovalidationPhone=()=>{
        let params = {
            phonenumber : this.state.phonenumber
        }
        console.log(params);

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
            console.log(response);
            if(response.status === "OK"){
                Alert.alert(this.globallang.alert, "Your mobile phone number has been registered", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }
            else{
                this.doVerificationCode();
            }

        }).catch((error) => {
            console.log(error);
        });
    }

    doVerificationCode =()=>{

        
        if(this.state.phonenumber === ''){
            Alert.alert(this.globallang.alert, "Please enter the mobile phone number", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.phonenumberValid === false){
            Alert.alert(this.globallang.alert, "please enter a valid mobile phone number", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.phonenumber !== ''){
            this.setState({
                isButtonDisabled: true,
                isTimer: true
            });
        
            setTimeout(() => this.setState({ isButtonDisabled: false, isTimer: false }), 300000);
        }

        var digits = '0123456789'
        let OTP = '';
        for (let i = 0; i < 6; i++){
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        this.setState({otp : OTP})
        console.log(OTP);

        let params = {
            phonenumber : this.state.phonenumber,
            otp : OTP,
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
        }).catch((error) => {
            console.log(error);
        });
    }

    doValidateEmail=()=>{

        if(this.state.name === ''){
            Alert.alert(this.globallang.alert, "Please fill your full name!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.nickname === ''){
            Alert.alert(this.globallang.alert, "Please fill your full nick name!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.nickname === ''){
            Alert.alert(this.globallang.alert, "Please fill your full nick name!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        
        
        if(this.state.email === ''){
            Alert.alert(this.globallang.alert, "Please fill your email!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.emailValid === false){
            Alert.alert(this.globallang.alert, "Please correct your email!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        let params = {
            email : this.state.email
        }
        console.log(params);

        fetch(global.serverurl + global.webserviceurl + '/app_email_validation.php', {
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
            if(response.status === "OK"){
                Alert.alert(this.globallang.alert, "The email already exists", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            }
            else{
                this.doRegister();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    doRegister=()=>{
        let year = this.state.dob.getFullYear();
        let month = this.state.dob.getMonth()+1 < 10 ? '0'+(this.state.dob.getMonth()+1) : this.state.dob.getMonth()+1;
        let day = this.state.dob.getDate() < 10 ? '0'+this.state.dob.getDate() : this.state.dob.getDate(); 

        let params = {
            phonenumber : this.state.phonenumber,
            password : this.state.password,
            name : this.state.name,
            nickname : this.state.nickname,
            gender : this.state.genderId,
            dob : year +'-'+month+'-'+day,
            email : this.state.email,
            company : this.state.company,
            location : this.state.location
        }

        console.log(params);

        this.setState({showLoading:true});
        fetch(global.serverurl + global.webserviceurl + '/app_register_fix.php', {
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
            if (response.status === "OK") {
                this.setState({showLoading:false});
                if(response.records.length === 0){
                    Alert.alert(this.globallang.alert, this.pagelang.invalidlogin, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    this.props.navigation.replace('Login');
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


    }

    doNext=(toIdx, currIdx)=>{
        if(toIdx < 3){
            
            if(currIdx === 0){
                if(this.state.phonenumber === ''){
                    Alert.alert(this.globallang.alert, "Please enter the mobile phone number", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }
        
                if(this.state.phonenumberValid === false){
                    Alert.alert(this.globallang.alert, "please enter a valid mobile phone number", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }

                if (this.state.code === ''){
                    Alert.alert(this.globallang.alert, "Please fill in the verification code!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }

                if(this.state.password === ""){
                    Alert.alert(this.globallang.alert, this.pagelang.inputyourpassword, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }
                if(this.state.password !== this.state.confirmPassword){
                    Alert.alert(this.globallang.alert, this.pagelang.invalidconfirmpassword, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }

                if (this.state.passwordValid === false){
                    Alert.alert(this.globallang.alert, "Password does not meet the conditions!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }

                if (this.state.passwordconfirmValid === false){
                    Alert.alert(this.globallang.alert, "Confirm that the password does not meet the conditions!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                    return false;
                }
            }

            this.setState({currentPage: toIdx});
        }
            
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        this.setState({dob: date, dobText: day+'-'+month+'-'+year});
        this._hideDateTimePicker();
    };


    renderModal=()=>{
        if(this.state.openModal){
            return (<ModalPicker data={this.genderData} selectedValue={this.state.genderId} 
                onPick={(item)=>this.setState({genderId: item.value, genderText:item.text, openModal:false})} onCancel={()=>this.setState({openModal:false})} ></ModalPicker> )
        }
            
        
    }

    managePasswordVisibility = () =>{
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    manageConfirmPasswordVisibility = () =>{
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }

    validatePhone = (text) => {
        console.log(text);
        let reg= /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
        if(reg.test(text) === false){
            console.log("Phone number is Not Correct");
            this.setState({phonenumber:text, phonenumberValid: false })
            console.log(this.state.phonenumberValid);
            return false;
        }
        else {
          this.setState({phonenumber:text, phonenumberValid: true})
          console.log("Phone Number is Correct");
        }
    }

    onErrorPhone() {
        if (this.state.phonenumber === ''){
            return null
        }
        if ( this.state.phonenumberValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Phone number is not correct </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Phone number is correct </Text>;
        }
    }

    onErrorPhone() {
        if (this.state.phonenumber === ''){
            return null
        }
        if ( this.state.phonenumberValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Phone number is not correct </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Phone number is correct </Text>;
        }
    }

    validateEmail = (text) => {
        console.log(text);
        let reg = /\S+@\S+\.\S+/;
        if(reg.test(text) === false){
            console.log("email is Not Correct");
            this.setState({email:text, emailValid: false })
            console.log(this.state.emailValid);
            return false;
        }
        else {
          this.setState({email:text, emailValid: true})
          console.log("email is Correct");
        }
    }

    onErrorEmail() {
        if (this.state.email === ''){
            return <Text style={{color:'black', fontSize:11}}>* the email entered must be active and still in use </Text>;
        }
        if ( this.state.emailValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Email must have symbols (@ and .com) </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Email is correct </Text>;
        }
    }

    validatePassword = (text) => {
        console.log(text);
        // let reg = /^(?=.[A-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        let reg = /^.{6,50}$/;
        if(reg.test(text) === false){
            console.log("Password is Not Correct");
            // Alert.alert(this.globallang.alert, this.pagelang.phonenumbercorrect, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            this.setState({password:text, passwordValid: false})
            console.log(this.state.passwordValid);
            return false;
        }
        else {
          this.setState({password:text, passwordValid: true})
          console.log(this.state.passwordValid);
          console.log("Password is Correct");
        }
    }

    onErrorPass() {
        if (this.state.password === ''){
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
        // let reg = /^(?=.[A-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        let reg = /^.{6,50}$/;
        if(reg.test(text) === false){
            console.log("Password Confirm is Not Correct");
            this.setState({confirmPassword:text, passwordconfirmValid: false})
            console.log(this.state.passwordconfirmValid);
            return false;
        }
        else {
          this.setState({confirmPassword:text, passwordconfirmValid: true})
          console.log(this.state.passwordconfirmValid);
          console.log("Password Confirm is Correct");
        }
    }

    onErrorPassConfirm() {
        if (this.state.confirmPassword === ''){
            return null
        }
        if (this.state.password !== this.state.confirmPassword || this.state.passwordValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Must be the same as the password created</Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Password Confirmation match</Text>;
        }
    }

    renderPage =()=>{
        if(this.state.currentPage === 0){
            //profile page
            return (
                <View style={{marginTop:30}} > 
                <View style={{flexDirection:'row', justifyContent:'center', marginBottom:0}}>
                    <View style={{flex:0, flexDirection:'column', paddingLeft:30}} >
                        <TouchableOpacity onPress={()=>this.goBack()}>
                            <View style={{justifyContent:'center', flexDirection:'row'}} >
                                <Image style={{height:24, width:24}} source={require('../../assets/images/return.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection:'column', justifyContent:'center', paddingRight:30}}>
                        <Text style={{paddingLeft:16,  fontSize:16, fontWeight:'bold', color:'#000'}} >VERIFICATION MOBILE PHONE NUMBER & PASSWORD</Text>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>{this.pagelang.phonenumber}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/contact-button.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyourphone}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            maxLength={15}
                            keyboardType= 'phone-pad'
                            autoCapitalize = 'none'
                            underlineColorAndroid='transparent'
                            value={this.state.phonenumber}
                            onChangeText={(text) => this.validatePhone(text)} 
                            // onChangeText={(text)=>this.setState({phonenumber: text})}
                            >
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row', marginTop:-16, marginBottom:6}} >
                        {this.onErrorPhone()}
                    </View>

                    <View style={{flex:0, flexDirection:'row', justifyContent:'center', marginTop:10}} >
                        <View style={{flex:2, flexDirection:'column', paddingRight:10 }} >
                            <View style={styles.inputContainer1}>
                                <Image style={styles.inputIcon} source={require('../../assets/images/code.png')}/>
                                    <CodeInput
                                    ref="codeInputRef1"
                                    className={'border-b'}
                                    keyboardType={Platform.OS === 'ios' ? 'phone-pad' : 'numeric'}
                                    codeLength={6}
                                    inputPosition='center'
                                    size={16}
                                    containerStyle={{ marginTop: 15, marginBottom:16 }}
                                    activeColor='#000'
                                    inactiveColor='#000'
                                    compareWithCode={this.state.otp}
                                    autoFocus={false}
                                    ignoreCase={true}
                                    onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                                    onCodeChange={(code) => { this.state.code = code }}
                                    />
                            </View>
                        </View>
                        <View style={{flex:1.2, flexDirection:'column'}} >
                            <TouchableOpacity disabled={this.state.isButtonDisabled} onPress={()=>{this.dovalidationPhone()}}>
                                <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:8 }} >
                                    <Text style={{fontSize:16, textAlign:'center',fontWeight:'bold', color:'#fff' }}>Get Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginTop:-10, marginBottom:14}} >
                        <View style={{flex:1}} >
                            {this.onErrorOTP()}
                        </View>
                        <View style={{flex:0}} >
                            {this.onTimer()}
                        </View>
                    </View>

                    <Text style={styles.label}>{this.pagelang.password}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyourpassword}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            secureTextEntry={this.state.hidePassword}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            value={this.state.password}
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


                    <Text style={styles.label}>{this.pagelang.confirmpassword}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/lock.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.confirmyourpassword}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            secureTextEntry={this.state.hideConfirmPassword}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            value={this.state.confirmPassword} 
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
                    <View>
                        <TouchableOpacity onPress={()=>this.doNext(this.state.currentPage+1, this.state.currentPage)}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6, marginTop:20 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>SUBMIT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            )
        }else if(this.state.currentPage === 1){
            return(
                <View style={{marginTop:30}}>
                <View style={{flexDirection:'row', justifyContent:'center', marginBottom:0}}>
                    <View style={{flex:0, flexDirection:'column', paddingLeft:30}} >
                        <TouchableOpacity onPress={()=>this.goBack()}>
                            <View style={{justifyContent:'center', flexDirection:'row'}} >
                                <Image style={{height:24, width:24}} source={require('../../assets/images/return.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection:'column', justifyContent:'center', paddingRight:30}}>
                        <Text style={{paddingLeft:16,  fontSize:16, fontWeight:'bold', color:'#000'}} >DETAILS OF USER INFORMATION</Text>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>{this.pagelang.name}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/identity-card.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyourname} 
                            placeholderTextColor='#000'
                            autoFocus={false}
                            autoCapitalize = 'words'
                            underlineColorAndroid='transparent'
                            value={this.state.name} 
                            onChangeText={(text)=>this.setState({name: text})}>
                        </TextInput>
                    </View>

                    <Text style={styles.label}>{this.pagelang.nickname}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/identity-card.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyournickname}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            autoCapitalize = 'words'
                            underlineColorAndroid='transparent'
                            value={this.state.nickname}
                            onChangeText={(text)=>this.setState({nickname: text})}>
                        </TextInput>
                    </View>

                    <Text style={styles.label}>{this.pagelang.gender}</Text>
                    <View style={styles.inputContainer1} >
                        <Image style={styles.inputIcon} source={require('../../assets/images/gendericon.png')}/>
                        <TouchableOpacity style={{width:'100%'}}  underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.setState({openModal:true})}>
                                <Text style={styles.selectText}>{this.state.genderText}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>{this.pagelang.dob}</Text>
                    <View style={styles.inputContainer1} >
                        <Image style={styles.inputIcon} source={require('../../assets/images/calendar.png')}/>
                        <TouchableHighlight  style={{width:'100%'}}  underlayColor={'rgba(0,0,0,0)'} onPress={this._showDateTimePicker}>
                            <Text style={styles.selectText}>{this.state.dobText}</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.label}>{this.pagelang.email}</Text>
                    <View style={styles.inputContainer1}>
                        <Image style={styles.inputIcon} source={require('../../assets/images/at.png')}/>
                        <TextInput style={styles.inputs}
                            placeholder={this.pagelang.inputyouremail}
                            placeholderTextColor='#000'
                            autoFocus={false}
                            keyboardType='default'
                            autoCapitalize = 'none'
                            underlineColorAndroid='transparent'
                            value={this.state.email}
                            onChangeText={(text) => this.validateEmail(text)} 
                            // onChangeText={(text)=>this.setState({email: text})}
                            >
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row', marginTop:-16, marginBottom:6}} >
                        {this.onErrorEmail()}
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>this.doValidateEmail()}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6, marginTop:20 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>SIGN UP NOW</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            )
        }
    }

    renderNext=()=>{
        if(this.state.currentPage < 0){
            return (
                <TouchableHighlight style={{position:'absolute', bottom:0, left:0, right:0, justifyContent:'center'}} underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.doNext(this.state.currentPage+1, this.state.currentPage)}>
                    <View style={{height:50, backgroundColor:'#0066ff', justifyContent:'center'}}>
                        <Text style={{color:'#fff', alignSelf:'center'}}>{this.pagelang.next}</Text>
                    </View>
                </TouchableHighlight>
            )
        }else{
            return (
                <TouchableHighlight style={{position:'absolute', bottom:0, left:0, right:0, justifyContent:'center'}} underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.doRegister()}>
                    <View style={{height:50, backgroundColor:'rgb(8,194,223)', justifyContent:'center'}}>
                        <Text style={{color:'#fff', alignSelf:'center'}}>{this.pagelang.register}</Text>
                    </View>
                </TouchableHighlight>
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

        return (
            <View style={globalStyles.screenContainer}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
                <ScrollView style={{position:'absolute',top:50,left:0,right:0, bottom:0 }}>
                    {this.renderPage()}
                </ScrollView>
                </ImageBackground>
                {/* {this.renderNext()} */}
                {this.renderModal()}
                {this.renderLoading()}
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    date={this.state.dob}
                />
            </View>
        );
    }
}

export default Register