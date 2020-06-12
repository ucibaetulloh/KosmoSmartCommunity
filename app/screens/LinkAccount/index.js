import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, Dimensions, WebView, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';

import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';

class LinkAccountScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('linkaccount');
        this.globallang = getPageLang('global');
        global.community = { code: "", text: "" };

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            canChangeCommunity: false,
            UserName:'',
            Password:'',

            link:{
                phonenumber:''
            }
        }
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        this._retrieveData('login-info').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })
    }

    componentDidMount=(props)=>{
        
        this._retrieveData('login-info').then(info => {
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

    handleBackPress = ()=>{
        this.goBack();
    }

    changeCommunity(community) {
        global.community = community;
    }

    goBack=()=> {
        this.props.navigation.goBack();
    }
    receivePost(param) {

    }

    refreshPage = () => {
        
    }

    getData()
    {
        const data = {
            phonenumber:this.state.link.phonenumber, 
            UserName: this.state.UserName,
            Password: this.state.Password
        };
        console.log(global.serverurl + '/smartcp/webservices/app_linkAccount.php');
        fetch(global.serverurl + '/smartcp/webservices/app_linkAccount.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
            
        }).then((response) => {
            console.log(response);
            if (response.status === 200)
                return response.json();
            else
                throw new Error('Something wrong with api server');
        }).then((response) => {
            if (response.status === "OK") {
                this.props.navigation.replace('Home');
            } else {
                //error
                Alert.alert(this.globallang.alert, response.message,
                    [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }],
                    { cancelable: false });
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log(data);
    }

    doSend=()=>{
        if(this.state.UserName === ''){
            Alert.alert(this.globallang.alert, this.pagelang.please_input_username, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        if(this.state.Password === ""){
            Alert.alert(this.globallang.alert, this.pagelang.please_input_password, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }
        this.getData();
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2' }}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>{this.pagelang.username}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'default' 
                        style={styles.input} 
                        placeholder={this.pagelang.input_username} 
                        onChangeText={(text)=>this.setState({UserName: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.password}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'default' 
                        placeholder={this.pagelang.inputPass} 
                        style={styles.input} 
                        onChangeText={(text)=>this.setState({Password: text})}></TextInput>
                    <Button
                            onPress={()=>this.doSend()}
                            title={this.pagelang.btnsend}
                            color="rgb(8,194,223)"
                            accessibilityLabel={this.pagelang.logintoyouraccount}
                    />
                </View>
            </ScrollView>
        </View>
        );
    }
}

export default LinkAccountScreen