import React from 'react';
import { View, Text, WebView, Alert, BackHandler } from 'react-native';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import PrepareQuit from '../../components/prepareQuit/index';
import { getPageLang } from '../../languages';
//import config from '../../config';

class NewsScreen extends React.Component {
    /*static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'News'),
        };
    };*/

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('news');

        //this.props.navigation.setParams({ title: this.pagelang['title'] });

        this.state = {
            //title: this.pagelang['title'],
            title: this.pagelang['title'],
            canGoBack: false,
            webUri: global.serverurl + '/?page=newspage&community=' + global.community.code + '&t=' + new Date().getTime(),
            canChangeCommunity: false,
            showCommunityName: true,
            hideTopbar:false,
            hideFooterMenu:false,
            prepareQuit:false
        }

        this.webview = React.createRef();
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = ()=>{
        if(this.state.hideTopbar){
            //go back
            this.webview.goBack();
            return true;
        }else{
            if(this.state.prepareQuit){
                //do quit
                BackHandler.exitApp();
            }else{
                this.setState({prepareQuit: true});
            }
        }
        return true;
    }
    cancelQuit = ()=>{
        this.setState({prepareQuit: false});   
    }

    changeCommunity(community) {

        global.community = community;
        /*let d = new Date();
        if (community.code == "jakartagardencity") {
            this.setState({ webUri: global.serverurl + '/?community=' + community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false });
        } else {
            this.setState({ webUri: global.serverurl + '/?t=' + d.getTime(), title: community.text, canGoBack: false });
        }*/

        /*Alert.alert('title', community, [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });*/
    }

    goBack() {
        let d = new Date();
        //if (global.community.code == "jakartagardencity") {
        this.setState({ webUri: global.serverurl + '/?page=newspage&community=' + global.community.code + '&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        /*} else {
            this.setState({ webUri: global.serverurl + '/?page=newspage&t=' + d.getTime(), title: this.pagelang['title'], canGoBack: false, canChangeCommunity: false });
        }*/
    }

    //----receive on message from webview
    receivePost(param) {
        let jsonParam = JSON.parse(param);
        jsonParam.title = global.community.text;
        this.setState({ title: jsonParam.title, canGoBack: jsonParam.canGoBack, canChangeCommunity: jsonParam.canChangeCommunity, hideTopbar: jsonParam.hideTopbar, hideFooterMenu: jsonParam.hideFooterMenu });

        /*Alert.alert('title', param, [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });*/

    }
    //------------------------------------

    refreshPage = () => {
        let d = new Date();
        this.setState({ webUri: global.serverurl + '/?page=newspage&community=' + global.community.code + '&t=' + d.getTime(), title: community.text, canGoBack: false, canChangeCommunity: true });
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
                <FooterMenu navigation={this.props.navigation} currentMenu={3} refreshPage={this.refreshPage} />
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}

                <View style={{ position: 'absolute', top: (this.state.hideTopbar ? 0 : 30), left: 0, right: 0, bottom: (this.state.hideFooterMenu?0:50), }}>
                    <WebView ref={this.webview} source={{ uri: this.state.webUri }} onMessage={(event) => { this.receivePost(event.nativeEvent.data) }} />
                </View>
                {this.renderFooter()}
                {this.renderPrepareQuit()}
            </View>
        );
    }

}

export default NewsScreen