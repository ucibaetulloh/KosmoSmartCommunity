import React from 'react';
import { StyleSheet, Button, Text, View, Dimensions, ImageBackground,FlatList, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage, Alert } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import globalStyles from '../global.style';

class AccountBindingList extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('accountbindinglist');
		this.globallang = getPageLang('global');

        this.state = {
            title: "Binding Account List",
            canGoBack: true,
            //webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false,
			phonenumber: '',
            accounts: [],
            LinkAccount:{
                DebtorAcct:'',
                LotNo:'',
                BisnisId:''
            },
            data:[],
        }

        console.log(this.state.accounts);
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    _retrieveDataBinding = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{

        this._retrieveData('smart-app-id-login').then(info => {
            if(info === null)  this.props.navigation.replace('Login');            
        })

        this._retrieveDataBinding('smart-app-id-binding').then(info => {
            if(info === null) this.props.navigation.replace('AccountBinding'); 
        })
    }

    componentDidMount=()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        // this._retrieveDataBinding('smart-app-id-binding').then(data => JSON.stringify(this.setState(data)));
        this._retrieveDataBinding('smart-app-id-binding').then(info =>{
            info = JSON.parse(info)
                console.log(info)
                this.setState({ data: info });
        })
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


    changeCommunity(community) {
        global.community = community;
    }

    

    RenderItem =({item})=>{
        return(
            <View style={styles.container}>
                <View style={styles.container_text}>
                    <Text style={styles.description}>
                        Debtor ID: {item.DebtorAcct}
                    </Text>
                    <Text style={styles.description}>
                        Unit Code: {item.LotNo}
                    </Text>
                    <Text style={styles.description}>
                        Company Code: {item.CompanyCode}
                    </Text>
                    <Text style={styles.description}>
                        Cluster Name: {item.ClusterName}
                    </Text>
                <View style={styles.RowDescription}>
                    <Text style={styles.ColumnLeft}>Bisnis ID: {item.BisnisId} </Text>
                </View>    
               </View>
            </View>
        )
      }

    _doLogout = () => {
        AsyncStorage.removeItem('smart-app-id-binding');
        this.props.navigation.replace('Home');
    }

    refreshPage = () =>{

        this.props.navigation.replace('MyPage');

        
    }

    render() {
        return (
            <View style={globalStyles.screenContainer}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)}/>
                <ImageBackground source={require('../../assets/images/bg_form.png')} style={styles.pictureContainer}>
                <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0 }}>
                    <View style={styles.formRowContainer}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.RenderItem}
                        keyExtractor={(item, index) => index}
                    />
					</View>
                </ScrollView>
                </ImageBackground>
            </View>
        );
    }

}

export default AccountBindingList

