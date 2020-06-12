import React from 'react';
import { View, Text, WebView, Alert, StyleSheet, ImageBackground, Image, CameraRoll, TouchableHighlight,BackHandler,AsyncStorage, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import globalStyles from '../global.style';

const styles = StyleSheet.create({
    pictureContainer: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    picture: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 10
    },
    textName: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 2
    },
    textPhone: {
        color: '#b3b3b3',
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
        borderWidth: 1,
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
        borderColor:'#d9d9d9'
    },
    center:{
        textAlign:'center',
        color:'#dd0000'
    }
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

    
   
    // handleBackPress = ()=>{
    //     if(this.state.prepareQuit){
    //         //do quit
    //         BackHandler.exitApp();
    //         this.props.navigation.replace('home');
    //     }else{
    //         // this.setState({prepareQuit: true});
    //         return true;
    //     }
    //     // this.props.navigation.replace('Home');
    //     // return true;
    // }


    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {
        //global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    goBack() {
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });

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

    _openProfile=()=>{
        this.props.navigation.push('Profile');
    }
    _OpenPersonal=()=>{
        this.props.navigation.push('PersonalInformation');
    }
    _OpenInbox=()=>{
        this.props.navigation.push('Inbox');
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

    render() {
        

        return (
            <View style={globalStyles.screenContainer}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
                <View style={{ position: 'absolute', top: 30, left: 0, right: 0, bottom: 50, }}>
                    {/*<WebView ref={this.webview} source={{ uri: this.state.webUri }} onMessage={(event) => { this.receivePost(event.nativeEvent.data) }} />*/}
                    <ImageBackground source={require('../../assets/images/profile-background.jpg')} style={styles.pictureContainer}>
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0)'}>
                            <Image source={this.state.loginInfo.profilepic === "" ? require('../../assets/images/user-default-profile.png'): {uri:this.state.loginInfo.profilepic}} style={styles.picture}></Image>
                        </TouchableHighlight>
                        <Text style={styles.textName}>{this.state.loginInfo.name}</Text>
                        <Text style={styles.textPhone}>{this.state.loginInfo.phonenumber}</Text>
                    </ImageBackground>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTable}>
                            <View style={styles.contentRow}>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenInbox()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/inbox.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['inbox']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._openProfile()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/personal.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['personal']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenLinkAccount()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/linkedid.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['linkaccount']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.contentRow}>
                                <View style={styles.contentColumn}>
                                <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenPassword()} underlayColor={'#fff'}>
                                    <View style={{alignItems:'center', justifyContent:'center'}}>
                                        <Image source={require('../../assets/images/password.png')} style={{marginBottom:5}} />
                                        <Text style={styles.smallfont}>{this.pagelang['password']}</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._openTransaction()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center',justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/transaksi.png')} style={{marginBottom:5}} />
                                            <Text style={styles.smallfont}>{this.pagelang['transaction']}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contentColumn}>
                                    <TouchableOpacity activeOpacity = { 0.8 } style={{flex:1, justifyContent:'center'}} onPress={()=>this._OpenAbout()} underlayColor={'#fff'}>
                                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../../assets/images/about.png')} style={{marginBottom:5}} />
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
                        {/* <View style={styles.formRowContainer}>
                        <TouchableHighlight onPress={()=>this._doLogout()} underlayColor={'rgba(0,0,0,0)'}>
                            <View style={styles.formRow}>
                                    <View style={styles.formColumn} >
                                        <Text style={styles.center}>{this.pagelang['logout']}</Text>
                                    </View>
                            </View>
                        </TouchableHighlight>
                        </View> */}
                    </View>
                </View>
                <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />
                {this.renderPrepareQuit()}
            </View>
        );
    }

}

export default MyPageScreen