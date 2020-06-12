import React from 'react';
import { StyleSheet, Text, View, Dimensions, WebView, Image,TouchableOpacity, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import globalStyles from '../global.style';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import LoadingScreen from '../../components/LoadingScreen';

class InboxScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.pagelang = getPageLang('inbox');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            canChangeCommunity: false,
            currentTab:0,
            showLoading: false,
        }

        this.background={
            blue: '#6680ff',
            default: '#cccccc'
        }

        this.color={
            red: '#cc0000',
            green: '#39e600',
            orange: '#ffcc00',
            blue: '#6680ff',
            gray: '#d9d9d9'
        }

        this.state.showLoading = true;
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

    componentDidMount=()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        this.props.navigation.replace('MyPage');
        return true;
      }   
      
    goBack=()=> {
        this.props.navigation.replace('MyPage');
    }

    renderLoading=()=>{
        if(this.state.showLoading){
            return (
                <LoadingScreen></LoadingScreen>
            )
        }
    }



    changeTab =(idx)=>{
        if(this.state.currentTab !== idx){
            this.setState({currentTab :idx});

            if(this.interval != null){
                clearInterval(this.interval);
            }
            setTimeout(()=>{
                if(this.state.currentTab === 0){
                    this.getDataMessage();
                }
                else if(this.state.currentTab === 1){
                    this.getDataVoucher();
                }
            },300)
        }
    }

    getDataMessage=()=>{

    }

    getDataVoucher=()=>{
        
    }

    renderHeader=()=>{
        if(this.state.currentTab === 0){
            return(
                <View style={{ flexDirection:'row', paddingTop:5, paddingBottom:5, backgroundColor:'#fff', borderTopWidth:1, borderTopColor:'#d9d9d9', borderBottomWidth:1, borderBottomColor:'#d9d9d9', marginTop:10}}>

                </View>
            )
        }
        else if(this.state.currentTab === 1){
            return(
                <View style={{ flexDirection:'row', paddingTop:5, paddingBottom:5, backgroundColor:'#fff', borderTopWidth:1, borderTopColor:'#d9d9d9', borderBottomWidth:1, borderBottomColor:'#d9d9d9', marginTop:10}}>
                    
                </View>
            )
        }
    }

    renderBody=()=>{
        if(this.state.currentTab === 0){
            return(
                <ScrollView style={{ flex:1, position:'absolute', top:75, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2' }}>
                    {/* <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:5, paddingRight:5, paddingTop:5,  paddingBottom:5, marginLeft:8, marginRight:8, marginTop: 8, marginBottom: 8 ,borderRadius: 5, elevation:2  ,backgroundColor:'#fff', borderBottomWidth:2, borderBottomColor:'#d9d9d9'}}> */}
                        <View style={{marginTop:100, marginBottom:10}}>
                            <Text style={{fontSize:20, justifyContent:'center', alignItems:'center', textAlign:'center'}}>No message found</Text>
                        </View>
                    {/* </View> */}
                </ScrollView>
            )
        }else if(this.state.currentTab === 1){
            return(
                <ScrollView style={{ flex:1, position:'absolute', top:75, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2'}}>
                      {/* <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:5, paddingRight:5, paddingTop:5, paddingBottom:5, marginLeft:8, marginRight:8, marginTop: 8, marginBottom: 8 ,borderRadius: 5, elevation:2  ,backgroundColor:'#fff', borderBottomWidth:2, borderBottomColor:'#d9d9d9'}}> */}
                        <View style={{marginTop:100, marginBottom:10}}>
                            <Text style={{fontSize:20, justifyContent:'center', alignItems:'center', textAlign:'center'}}>No voucher found</Text>
                        </View>
                    {/* </View> */}
                </ScrollView>
            )
        }
    }



    // handleBackPress = ()=>{
    //     this.goBack();
    // }

    // goBack=()=> {
    //     this.props.navigation.goBack();
    // }

    changeCommunity(community) {
        global.community = community;
    }

    

    //----receive on message from webview
    receivePost(param) {

    }
    //------------------------------------

    refreshPage = () => {
        this.props.navigation.replace('MyPage');
    }

    render(){
        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            {/* <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#000' }}> */}
            <View style={styles.formRowContainer}>
                <View style={{flex:1, paddingBottom:10, borderBottomWidth: this.state.currentTab === 0 ? 2 : 0, borderBottomColor: this.color.blue}}>
                    <TouchableOpacity onPress={()=>this.changeTab(0)}>
                        <Text style={{color: this.state.currentTab ===0 ? this.color.blue : this.color.default, textAlign:'center'}}>Messages</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1, paddingBottom:10, borderBottomWidth: this.state.currentTab === 1 ? 2 : 0, borderBottomColor: this.color.blue}}>
                    <TouchableOpacity onPress={()=>this.changeTab(1)}>
                        <Text style={{color: this.state.currentTab ===1 ? this.color.blue : this.color.default, textAlign:'center'}}>Vouchers</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {this.renderBody()}
            {/* {this.renderLoading()} */}
            {/* </ScrollView> */}
            {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
            {/* {this.renderPrepareQuit()} */}
        </View>
        );
    }
}

export default InboxScreen