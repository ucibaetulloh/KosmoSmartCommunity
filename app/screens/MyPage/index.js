import React from 'react';
import { View, Text, WebView, Alert, ScrollView, StyleSheet, ImageBackground, Image, CameraRoll, TouchableHighlight,BackHandler,AsyncStorage, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import globalStyles from '../global.style';
import ImagePicker from 'react-native-image-picker';
import LoadingScreen from '../../components/LoadingScreen';


const styles = StyleSheet.create({
    pictureContainer: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40,
    },
    picture: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 10
    },
    textName: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 18,
        marginTop:10,
        marginBottom: 4
    },
    textPhone: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 14
    },
    contentContainer: {
        flex: 2,
        backgroundColor: '#f2f2f2',
        padding: 15
    },
    contentTable: {
        height: 180,
        flexDirection: 'column'
    },
    contentRow: {
        flex: 1,
        flexDirection: 'row'
    },
    contentColumn: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#f2f2f2',
        height: 100,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    smallfont:{
        fontSize:12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center'
    },
    formRowContainer:{
        marginTop:15,
        paddingRight:15,
        paddingLeft:15,
        backgroundColor:'#fff',
    },
    formRow:{
        flex:0,
        flexShrink:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#d9d9d9',
        paddingLeft:15,
        paddingRight:15
    },
    formColumn:{
        flex:1,
        paddingTop:15,
        paddingBottom:15,
        justifyContent:"center"
    },
    formColumnAlignRight:{
        textAlign:'right',
    },
    picture:{
        width:120,
        height:120,
        borderRadius:60,
        borderWidth:1,
        borderColor:'#d9d9d9',
        marginTop:10
    },
    center:{
        textAlign:'center',
        color:'#dd0000'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        width:120,
        height:120,
        borderRadius:80,
        borderWidth:1,
        borderColor:'#d9d9d9'
      },

})

class MyPageScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('mypage');

        //this.props.navigation.setParams({ title: this.pagelang['title'] });

        this.state = {
            title: this.pagelang['title'],
            canGoBack: false,
            //webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false,
            prepareQuit: false,
            ImageSource: null,
            data: null,
            srcImg: '',
            uri: '',
            fileName: '',
            profilepic: [],
            showLoading: false, 
            loginInfo : {
                profilepic: '',
                name: '',
                phonenumber: '',
                gender:''
            }
        }

        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
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

        /*if(global.logininfo === undefined){
            this.props.navigation.replace('Login');
        }*/
    }
    componentDidMount=(props)=>{
        // if(global.logininfo !== undefined)
            //this.setState({loginInfo: global.logininfo});
        
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null) {
                this.setState({loginInfo: JSON.parse(info)});
                console.log(info);
            } 
            else this.props.navigation.replace('Login');            
        })
        
        console.log(this._retrieveData('smart-app-id-login'));
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        //this._retrieveData('login-info');
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

   
    handleBackPress = ()=>{
        this.props.navigation.replace('Home');
        return true;
      }   
      
    goBack=()=> {
        this.props.navigation.replace('Home');
    }
      

    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {
        //global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

  

    //----receive on message from webview
    receivePost(param) {
        //let jsonParam = JSON.parse(param);
        //this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack });

    }
    //------------------------------------

    _openCamera = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
            groupTypes: 'PhotoStream'
        }).then(r => {
            console.log(r)
        }).catch(err => {
            console.log(err)
        })
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
              this.doChangeDp(source.uri)

            }
          });
    }

    doChangeDp=(urlphoto)=>{
        let params = {
            phonenumber : this.state.loginInfo.phonenumber,
            profilepic : urlphoto
        }
    
        console.log(params);
    
        this.setState({showLoading:true});
        
        fetch(global.serverurl + global.webserviceurl + '/app_change_profile.php', {
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
            this.setState({showLoading:false});
            if (response.status === "OK") {
                    this._storeData('smart-app-id-login', JSON.stringify(response.records[0]))
                    this.props.navigation.replace('MyPage');
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
    

    _openProfile=()=>{
        this.props.navigation.push('Profile');
    }
    _OpenPersonal=()=>{
        this.props.navigation.push('PersonalInformation');
    }
    _OpenInbox=()=>{
        this.props.navigation.push('Inbox');
        // this.props.navigation.push('AddMoment');
    }
    _OpenLinkAccount=()=>{
        this.props.navigation.push('AccountBinding');
    }
    _OpenPassword=()=>{
        this.props.navigation.push('Password');
    }
    _openTransaction=()=>{
        this.props.navigation.push('Transaction');
    }
    _OpenAbout=()=>{
        this.props.navigation.push('About');
    }
    _OpenAddMoment=()=>{
        this.props.navigation.push('AddMoment');
    }

    _doLogout = () => {
        global.logininfo = undefined;
        AsyncStorage.removeItem('smart-app-id-login');
        AsyncStorage.removeItem('smart-app-id-binding');
        AsyncStorage.removeItem('smart-app-id-token');
        AsyncStorage.removeItem('Modernland-Account');
        AsyncStorage.setItem('smart-app-do-logout', "1");
        this.props.navigation.replace('Home');
    }

    refreshPage = () => {
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    renderPrepareQuit=()=>{
        if(this.state.prepareQuit){
            return (
                <PrepareQuit started={this.state.prepareQuit} cancel={this.cancelQuit} />
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
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <ScrollView style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 50, }}>
                    <ImageBackground source={require('../../assets/images/profile-background.jpg')} style={styles.pictureContainer}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 5}]}>
                                {this.state.ImageSource === null ? <Image source={this.state.loginInfo.profilepic === "" ? require('../../assets/images/user-default-profile.png'): {uri: this.state.loginInfo.profilepic}} style={styles.avatar}></Image> :
                                    <Image style={styles.avatar} source={this.state.ImageSource} />
                                }                       
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.textName}>{this.state.loginInfo.name}</Text>
                        <Text style={styles.textPhone}>{this.state.loginInfo.phonenumber}</Text>
                    </ImageBackground>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTable}>
                            <View style={styles.contentRow}>
                                {/* <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenInbox()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/inbox.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['inbox']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._openProfile()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/SettingIcons/account-3.png')} style={{marginBottom:5, height:45, width:45}} />
                                            <Text style={styles.smallfont}>Personal Info</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenLinkAccount()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                        <Image source={require('../../assets/images/SettingIcons/icon-link-3.png')} style={{marginBottom:5, height:45, width:45}} />
                                            <Text style={styles.smallfont}>Link Account</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.contentRow}>
                                <View style={styles.contentColumn}>
                                <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenPassword()} underlayColor={'#fff'}>
                                    <View style={{alignItems:'center', justifyContent:'center'}}>
                                        <Image source={require('../../assets/images/SettingIcons/key-3.png')} style={{marginBottom:5, height:45, width:45}} />
                                    <Text style={styles.smallfont}>Set Password</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                {/* <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._openTransaction()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center',justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/transaksi.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['transaction']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenAbout()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/SettingIcons/warning-4.png')} style={{marginBottom:5, height:45, width:45}} />
                                            <Text style={styles.smallfont}>{this.pagelang['about']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop:20}} >
                            <TouchableOpacity onPress={()=>this._doLogout()}>
                                <View style={{backgroundColor:'#fff', justifyContent:'center', alignContent:'center', alignItems:'center', height:50, borderRadius:6 }} >
                                    <Text style={{fontSize:16, textAlign:'center', color:'#dd0000', fontWeight:'bold' }}>LOGOUT</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.renderLoading()}
                <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />
                {this.renderPrepareQuit()}
            </View>
        );
    }

}

export default MyPageScreen