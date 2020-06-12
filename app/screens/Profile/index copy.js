import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, WebView, Picker, DatePickerAndroid, Image, TouchableOpacity, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from '../../components/ModalPicker';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import imgDefault from '../../assets/images/user-default-image.png';
import globalStyles from '../global.style';
// require('../../assets/images/user-default-profile.png')

class ProfileScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('profile');
        this.globallang = getPageLang('global');


        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            //webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false,

                phonenumber: '',
                name: '',
                nickname: '',
                gender: '',
                profilepic: [],
                dob: '',
                businessqrcode: '',
                company: '', 
                location: '',
                email: '',
                onlycollagues: 0,
                join: '',
                fields: {},
                errors: {},
                ImageSource: null,
                data: null,
                srcImg: '',
                uri: '',
                fileName: '',
                avatarSource: null,
                openModal:false,
                isDateTimePickerVisible: false,

                loginInfo : {
                    profilepic: ''
                }

        }

    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
            skipBackup: true,
            },
          };
          ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response.fileName);  
                // let source = {uri: response.uri};
      
              // You can also display the image using data:
              let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                srcImg: { uri: response.uri },
                uri: response.uri,
                fileName: response.fileName,  
                ImageSource: source,
                profilepic: source.uri,
                data: response.data
              });
              console.log(this.state.profilepic)
            }
          });
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    _retrieveData2 = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          // Error saving data
        }
    }

    componentWillMount=(props)=>{
        this._retrieveData('smart-app-id-login').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })
    }

    componentDidMount=(props)=>{
        this.getGenderList();

        this._retrieveData2('smart-app-id-login').then(info => {
            if(info !== null) {
                this.setState({loginInfo: JSON.parse(info)});
                console.log(info);
            } 
            else this.props.navigation.replace('Login');            
        })


        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null) {
                info = JSON.parse(info)
                this.setState({...this.state,
                    phonenumber: info.phonenumber,
                    email: info.email,
                    name: info.name,
                    nickname: info.nickname,
                    gender : info.gender,
                    dob : info.dob,
                    profilepic : info.profilepic,   
                    join: info.join
                });
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

    changeDOB=async ()=>{

        //------FOR ANDROID------
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(this.state.dob),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
                let tmpmonth = month+1
                tmpmonth = tmpmonth > 9 ? tmpmonth : '0'+tmpmonth

                let tmpday = day
                tmpday = tmpday > 9 ? tmpday : '0'+tmpday

                this.setState({dob: year+'-'+(tmpmonth)+'-'+tmpday})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
        //----------------------
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


    doChange=()=>{

        if(this.state.ImageSource === ''){
            Alert.alert(this.globallang.alert, this.pagelang.pleaseinputprofile, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        if(this.state.profilepic === ''){
            Alert.alert(this.globallang.alert, this.pagelang.pleaseinputprofile, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
            return false;
        }

        let params = {
            phonenumber : this.state.phonenumber,
            name : this.state.name,
            nickname : this.state.nickname,
            gender : this.state.genderId,
            email : this.state.email,
            dob : this.state.dob,
            profilepic : this.state.profilepic
        }

        console.log(params);
        
        fetch(global.serverurl + global.webserviceurl + '/app_update_profile.php', {
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
                    // global.logininfo = response.records[0];
                    this._storeData('smart-app-id-login', JSON.stringify(response.records[0]))
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
    }

    
    renderModal=()=>{
        if(this.state.openModal){
            return (<ModalPicker data={this.genderData} selectedValue={this.state.genderId} 
                onPick={(item)=>this.setState({genderId: item.value, genderText:item.text, openModal:false})} onCancel={()=>this.setState({openModal:false})} ></ModalPicker> )
        }
            
        
    }

    handleBackPress = ()=>{
        this.goBack();
    }

    goBack=()=> {
        this.props.navigation.replace('MyPage');
    }

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
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }


    render() {
        return (
            <View style={globalStyles.screenContainer}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#fff' }}>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                          
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 5}]}>
                                        {this.state.ImageSource === null ? <Image source={this.state.loginInfo.profilepic === "" ? require('../../assets/images/user-default-profile.png'): {uri: this.state.loginInfo.profilepic}} style={styles.avatar}></Image> :
                                            <Image style={styles.avatar} source={this.state.ImageSource} />
                                        }                       
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.formColumn}>
                                <Button
                                    onPress={()=>this.doChange()}
                                    title={this.pagelang.change}
                                    color="rgb(8,194,223)" >
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                    <Text style={styles.label}>{this.pagelang.phone}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'numeric' 
                        maxLength={13}  
                        style={styles.input}
                        value={this.state.phonenumber}
                        editable = {false} 
                        onChangeText={(text)=>this.setState({phonenumber: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.email}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'email-address' 
                        style={styles.input}
                        value={this.state.email}
                        editable = {false} 
                        onChangeText={(text)=>this.setState({email: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.name}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'default' 
                        style={styles.input}
                        value={this.state.name}
                        editable = {true} 
                        onChangeText={(text)=>this.setState({name: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.nickname}</Text>
                    <TextInput 
                        underlineColorAndroid='transparent' 
                        keyboardType = 'default' 
                        style={styles.input}
                        value={this.state.nickname}
                        editable = {true} 
                        onChangeText={(text)=>this.setState({nickname: text})}>
                    </TextInput>
                    <Text style={styles.label}>{this.pagelang.gender}</Text>
                    <TouchableHighlight style={styles.select} underlayColor={'rgba(0,0,0,0)'} onPress={()=>this.setState({openModal:true})}>
                            <Text style={styles.selectText} value={this.state.gender}>{this.state.genderText}</Text>
                    </TouchableHighlight>
                    <Text style={styles.label}>{this.pagelang.dob}</Text>
                    <TouchableHighlight style={styles.select} underlayColor={'rgba(0,0,0,0)'} onPress={this.changeDOB}>
                        <TextInput style={{textAlign:'left', color:'#000'}} editable={false} value={this.state.dob} />
                    </TouchableHighlight>

                    </View>
                </ScrollView>
                {this.renderModal()}
                {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
                {/* {this.renderPrepareQuit()} */}
            </View>
        );
    }

}

export default ProfileScreen

