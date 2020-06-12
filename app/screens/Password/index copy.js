import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Dimensions, WebView, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import globalStyles from '../global.style';


class PasswordScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('password');
        this.globallang = getPageLang('global');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            canChangeCommunity: false,
                phonenumber: '',
                passold:'',
                passnew: '',
                passconfirm: ''
        }
        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        this._retrieveData('smart-app-id-login').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })
    }

    componentDidMount=(props)=>{
        // if(global.logininfo !== undefined)
            //this.setState({loginInfo: global.logininfo});
        
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null) {
                info = JSON.parse(info)
                this.setState({...this.state,
                    phonenumber: info.phonenumber});
            } 
            else this.props.navigation.replace('Login');   
            
            console.log(info);
        })
    
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        //this._retrieveData('login-info');
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.goBack();
    }

    goBack=()=> {
        this.props.navigation.replace('MyPage');
    }


    // handleBackPress = ()=>{
    //     this.goBack();
    // }

    changeCommunity(community) {
        global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    // goBack=()=> {
    //     //let d = new Date();
    //     //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
    //     this.props.navigation.goBack();
    // }

    //----receive on message from webview
    receivePost(param) {
        //let jsonParam = JSON.parse(param);
        //this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack });

    }
    //------------------------------------

    refreshPage = () => {

        this.props.navigation.replace('MyPage');
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    canBeSubmitted() {
        const { phonenumber, passold } = this.state;
        return phonenumber.length > 0 && passold.length > 0;
      }

    doChange=()=>{ 

        if(this.state.passold === ''){
            Alert.alert(this.globallang.alert, this.pagelang.faled_pass_old, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
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
        

        let params = {
            phonenumber : this.state.phonenumber,
            passold : this.state.passold,
            passnew : this.state.passnew,
            passconfirm : this.state.passconfirm
        }

        console.log(params);

        fetch(global.serverurl + global.webserviceurl + '/app_set_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then((response) => {
            console.log(response);
            this.props.navigation.replace('Home');
            return response.json();
        }).catch((error) => {
            console.log(error);
        });       
    }

    render(){
        const isEnabled = this.canBeSubmitted();
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#fff' }}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>{this.pagelang.phonenumber}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'numeric' 
                        maxLength={13}  
                        style={styles.input}
                        value={this.state.phonenumber}
                        editable = {false} 
                        onChangeText={(text)=>this.setState({phonenumber: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.oldPass}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'default' 
                        secureTextEntry={true} 
                        maxLength={8} 
                        placeholder={this.pagelang.inputCurrent} 
                        style={styles.input} 
                        onChangeText={(text)=>this.setState({passold: text})}></TextInput>
                    <Text style={styles.label}>{this.pagelang.newPass}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        placeholder={this.pagelang.inputNewPass} 
                        keyboardType = 'default' 
                        secureTextEntry={true} 
                        maxLength={8} 
                        style={styles.input}
                        onChangeText={(text)=>this.setState({passnew: text})}></TextInput>
                    <Text style={styles.label}>{this.pagelang.confirmPass}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        placeholder={this.pagelang.inputConfirmPass} 
                        keyboardType = 'default' 
                        secureTextEntry={true} 
                        maxLength={8} 
                        style={styles.input}
                        onChangeText={(text)=>this.setState({passconfirm: text})}></TextInput>
                    <Button
                            onPress={()=>this.doChange()}
                            title={this.pagelang.updatePass}
                            color="rgb(8,194,223)"
                            accessibilityLabel={this.pagelang.setpassword}
                            // disabled={!isEnabled}
                    />
                </View>
            </ScrollView>
            {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
            {/* {this.renderPrepareQuit()} */}
        </View>
        );
    }
}

export default PasswordScreen