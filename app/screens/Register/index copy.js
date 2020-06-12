import React from 'react';
import { View, ScrollView, Text, Button, Alert, TextInput, BackHandler, TouchableHighlight, AsyncStorage } from 'react-native';
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

      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["name"]) {
          formIsValid = false;
          errors["name"] = "*Please enter your full name.";
        }
  
        if (typeof fields["name"] !== "undefined") {
          if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["name"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "*Please enter your email-ID.";
        }
  
        if (typeof fields["email"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
          }
        }
  
        if (!fields["phonenumber"]) {
          formIsValid = false;
          errors["phonenumber"] = "*Please enter your mobile no.";
        }
  
        if (typeof fields["phonenumber"] !== "undefined") {
          if (!fields["phonenumber"].match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["phonenumber"] = "*Please enter valid mobile no.";
          }
        }
  
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        if (typeof fields["password"] !== "undefined") {
          if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
          }
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
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

    // handleBackPress = ()=>{
    //     return true;
    // }

    changeCommunity(community) {
        //not available in this page
    }

    // goBack() {
    //     //check if the page is on first page. do navigation back. if not, change page to idx before
    //     if(this.state.currentPage > 0){
    //         this.setState({currentPage: this.state.currentPage-1});
    //     }else
    //         this.props.navigation.goBack();
    // }

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
        if(this.state.phonenumber === ''){
            Alert.alert(this.globallang.alert, this.pagelang.inputyourphone, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
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

    renderPage =()=>{
        if(this.state.currentPage === 0){
            //profile page
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>{this.pagelang.name}</Text>
                    <TextInput underlineColorAndroid='transparent' 
                        placeholder={this.pagelang.inputyourname} 
                        style={styles.input}  value={this.state.fields.name} 
                        onChangeText={(text)=>this.setState({name: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.nickname}</Text>
                    <TextInput underlineColorAndroid='transparent' 
                        placeholder={this.pagelang.inputyournickname} 
                        style={styles.input} value={this.state.nickname}
                         onChangeText={(text)=>this.setState({nickname: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.gender}</Text>
                    <TouchableHighlight style={styles.select} underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.setState({openModal:true})}>
                            <Text style={styles.selectText}>{this.state.genderText}</Text>
                    </TouchableHighlight>
                    <Text style={styles.label}>{this.pagelang.dob}</Text>
                    <TouchableHighlight style={styles.select} underlayColor={'rgba(0,0,0,0)'} onPress={this._showDateTimePicker}>
                            <Text style={styles.selectText}>{this.state.dobText}</Text>
                    </TouchableHighlight>
                    <Text style={styles.label}>{this.pagelang.email}</Text>
                    <TextInput underlineColorAndroid='transparent' 
                            keyboardType= 'email-address' placeholder={this.pagelang.inputyouremail} 
                            style={styles.input} value={this.state.email} 
                            onChangeText={(text)=>this.setState({email: text})}></TextInput>
                    <Text style={styles.label}>{this.pagelang.phonenumber}</Text>
                    <TextInput underlineColorAndroid='transparent' 
                        keyboardType= 'numeric'
                        maxLength={13} 
                        placeholder={this.pagelang.inputyourphone} 
                        style={styles.input} value={this.state.phonenumber} 
                        onChangeText={(text)=>this.setState({phonenumber: text})}></TextInput>
                    <Text style={styles.label}>{this.pagelang.password}</Text>
                    <TextInput underlineColorAndroid='transparent' 
                        maxLength={8}  placeholder={this.pagelang.inputyourpassword} 
                        secureTextEntry={true} style={styles.input} 
                        value={this.state.password} 
                        onChangeText={(text)=>this.setState({password: text})}></TextInput>
                    <Text style={styles.label}>{this.pagelang.confirmpassword}</Text>
                    <TextInput underlineColorAndroid='transparent' maxLength={8} placeholder={this.pagelang.confirmyourpassword} secureTextEntry={true} style={styles.input} value={this.state.confirmPassword} onChangeText={(text)=>this.setState({confirmPassword: text})}></TextInput>

                    <TouchableHighlight style={{marginTop:20}} underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.doRegister()}>
                        <View style={{height:50, backgroundColor:'rgb(8,194,223)', justifyContent:'center'}}>
                            <Text style={{color:'#fff', alignSelf:'center'}}>{this.pagelang.register}</Text>
                        </View>
                    </TouchableHighlight>
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
                <ScrollView style={{position:'absolute',top:30,left:0,right:0, bottom:0, backgroundColor:'#ffffff' }}>
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