import React from 'react';
import { View, ScrollView, Text, Button, Image, Alert, TextInput, BackHandler, TouchableHighlight,TouchableOpacity, AsyncStorage } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
//import FooterMenu from '../../components/footerMenu/index';
import ModalPicker from '../../components/ModalPicker';
import { getPageLang } from '../../languages';
import config from '../../config';
import styles from './style';
import globalStyles from '../global.style';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
            title: this.pagelang.title,
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
        }
        this.genderData = [];
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let fields = this.state.fields;
        fields[target.value];
        this.setState({
          fields
        });
  
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

    goBack() {
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

    doRegister=()=>{

        if(this.state.email === ''){
            Alert.alert(this.globallang.alert, "Please fill your email!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.phonenumber === ''){
            Alert.alert(this.globallang.alert, "Please fill your phone number!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
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

        if(this.state.emailValid === false){
            Alert.alert(this.globallang.alert, "Please correct your email!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.phonenumberValid === false){
            Alert.alert(this.globallang.alert, "Please correct your phone number!", [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
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

        
        fetch(global.serverurl + global.webserviceurl + '/app_register.php', {
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
                if(response.records.length === 0){
                    Alert.alert(this.globallang.alert, this.pagelang.invalidlogin, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    this.doOTP();
                    // this._storeData('smart-app-id-login', JSON.stringify(response.records[0]))
                    this.props.navigation.replace('RegisterOTP');
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

    }

    doNext=(toIdx, currIdx)=>{
        if(toIdx < 3){
            
            if(currIdx === 0){
                if(this.state.name === ''){
                    Alert.alert(this.globallang.alert, this.pagelang.inputyourname, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
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
        let reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(reg.test(text) === false){
            console.log("Phone number is Not Correct");
            // Alert.alert(this.globallang.alert, this.pagelang.phonenumbercorrect, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            this.setState({phonenumber:text})
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
            return null
        }
        if ( this.state.emailValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Email must have symbols (@ and .com) </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Email is correct </Text>;
        }
    }


    validatePassword = (text) => {
        console.log(text);
        let reg = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
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
            return <Text style={{color:'red', fontSize:11}}>* The password must be a combination of no less than 6 digit letters, one of the capital letters, numbers or symbols without spaces </Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Password match </Text>;
        }
    }

    validatePasswordConfirm = (text) => {
        console.log(text);
        let reg = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
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
        if ( this.state.passwordconfirmValid === false) {
            return <Text style={{color:'red', fontSize:11}}>* Must be the same as the password created</Text>;
        }{
            return <Text style={{color:'green', fontSize:11}}>* Password Confirmation match</Text>;
        }
    }

    renderPage =()=>{
        if(this.state.currentPage === 0){
            //profile page
            return (
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
                        <TouchableOpacity onPress={()=>this.doRegister()}>
                            <View style={{backgroundColor:'rgb(8,194,223)', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                <Text style={{fontSize:16, textAlign:'center', color:'#fff', fontWeight:'bold' }}>REGISTER</Text>
                            </View>
                        </TouchableOpacity>
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

    render() {

        return (
            <View style={globalStyles.screenContainer}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <ScrollView style={{position:'absolute',top:50,left:0,right:0, bottom:0, backgroundColor:'#ffffff' }}>
                    {this.renderPage()}
                </ScrollView>
                {/* {this.renderNext()} */}
                {this.renderModal()}
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    date={this.state.dob}
                />
                {/*<FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />*/}
            </View>
        );
    }
}

export default Register