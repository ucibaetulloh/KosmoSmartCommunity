import React from 'react';
import { View, Text, Alert, BackHandler, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
import config from '../../config';
import globalStyles from '../global.style';

class MarketplaceScreen extends React.Component {
    

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('marketplace');
        global.community = { code: "", text: "" };

        this.state = {
            //title: this.pagelang['title'],
            title: this.pagelang['title'],
            canGoBack: false,
            webUri: global.serverurl + '/?page=marketplace&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false,
            hideTopbar:false,
            hideFooterMenu:false,
            prepareQuit:false
        }

        this.webview = null;
        /*Alert.alert('title', global.community, [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });*/
    }

    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
        
    }
    

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this._retrieveData('smart-app-id-login').then(info => {
            if(info !== null) {
                this.setState({loginInfo: JSON.parse(info)});
                console.log(info);
            } 
            else this.props.navigation.replace('Login');            
        })
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    handleBackPress = () => {
        if (this.state.canGoBack) {
            this.webview.goBack();
            return true;
        } else {
            this.props.navigation.replace('Home');
            return true;
        }
      };

    changeCommunity(community) {
        global.community = community;
    }

    goBack() {
        let d = new Date();
        //if (global.community.code == "jakartagardencity") {
        this.setState({ webUri: global.serverurl + '/?page=marketplace&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        /*} else {
            this.setState({ webUri: global.serverurl + '/?page=newspage&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        }*/
    }

    //----receive on message from webview
    receivePost(param) {
        let jsonParam = JSON.parse(param);
        // jsonParam.title = global.community.text;

        this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack, canChangeCommunity: jsonParam.canChangeCommunity, hideTopbar: jsonParam.hideTopbar, hideFooterMenu: jsonParam.hideFooterMenu });
        // this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack, canChangeCommunity: jsonParam.canChangeCommunity, hideTopbar: jsonParam.hideTopbar, hideFooterMenu: jsonParam.hideFooterMenu });

        // Alert.alert('title', param, [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        // { text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });

    }
    //------------------------------------

    refreshPage = () => {
        let d = new Date();
        this.setState({ webUri: global.serverurl + '/?page=marketplace&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
    }

    renderHeader=()=>{
        if(!this.state.hideTopbar){
            return (
                <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, communityList: this.state.communityList }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            )
        }
    }

    renderFooter=()=>{
        if(!this.state.hideFooterMenu){
            return(
                <FooterMenu navigation={this.props.navigation} currentMenu={4} refreshPage={this.refreshPage} />
            )
        }
    }
    renderPrepareQuit=()=>{
        if(this.state.prepareQuit){
            return (
                <PrepareQuit started={this.state.prepareQuit} cancel={this.cancelQuit} />
            )
        }
    }

    onErrorWebview() {
        //alert('testing');
    }

    render() {

        const injectedJavascript = `(function() {
            window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
        };
        })()`

        const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); '

        return (
            <View style={globalStyles.screenContainer}>
                {this.renderHeader()}
                <View style={{ position: 'absolute', top: (this.state.hideTopbar ? 0 : 50), left: 0, right: 0, bottom: (this.state.hideFooterMenu?0:50), }}>
                    <WebView
                        ref={ref => this.webview = ref} 
                        source={{ uri: this.state.webUri }} 
                        onMessage={(event) => { this.receivePost(event.nativeEvent.data) }} 
                        renderError={() => this.onErrorWebview()} 
                        injectedJavaScript={INJECTEDJAVASCRIPT+injectedJavascript}
                        messagingEnabled={true}
                        useWebKit={true}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </View>
                {this.renderFooter()}
                {/* {this.renderPrepareQuit()} */}
            </View>
        );
    }

}

export default MarketplaceScreen