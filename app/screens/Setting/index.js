import React from 'react';
import { StyleSheet, Text, View, Dimensions, WebView, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import styles from './style';
import { getPageLang } from '../../languages';

import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';

class SettingScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('setting');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            //webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false
        }

        //this.webview = React.createRef();
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    componentWillMount=(props)=>{
        /*if(global.logininfo === undefined){
            this.props.navigation.replace('Login');
        }*/
        this._retrieveData('login-info').then(info => {
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
        this.goBack();
    }


    changeCommunity(community) {
        global.community = community;
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    goBack=()=> {
        //let d = new Date();
        //this.setState({ webUri: global.serverurl + '/?page=mypage&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        this.props.navigation.goBack();
    }

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

    _doLogout = () => {
        global.logininfo = undefined;
        AsyncStorage.removeItem('login-info');
        this.props.navigation.replace('Home');
    }
	
	_changeMenu = () => {
        this.props.navigation.navigate('AccountBindingList');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />

                <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2' }}>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['personalinformation']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
					<TouchableHighlight onPress={() => this._changeMenu()} underlayColor={'rgba(0,0,0,0)'}>
						<View style={styles.formRowContainer}>
							<View style={styles.formRow}>
								<View style={styles.formColumn}>
									<Text>{this.pagelang['accountbinding']}</Text>
								</View>
								<View style={styles.formColumn}>
									
								</View>
							</View>
						</View>
					</TouchableHighlight>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['setpassword']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['notification']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['clearcache']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['encourage']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['aboutus']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['recommend']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formColumn}>
                                <Text>{this.pagelang['feedback']}</Text>
                            </View>
                            <View style={styles.formColumn}>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRowContainer}>
                        <TouchableHighlight onPress={()=>this._doLogout()} underlayColor={'rgba(0,0,0,0)'}>
                            <View style={styles.formRow}>
                                
                                    <View style={styles.formColumn} >
                                        <Text style={styles.center}>{this.pagelang['logout']}</Text>
                                    </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                {/*<FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} />*/}
            </View>
        );
    }

}

export default SettingScreen

