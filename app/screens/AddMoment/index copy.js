import React from 'react';
import { StyleSheet, Text, View, PixelRatio, TextInput, Button, Alert, Dimensions, WebView, Picker, DatePickerAndroid, Image, TouchableOpacity, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
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
// require('../../assets/images/user-default-profile.png')

class AddMoment extends React.Component {

  constructor(props) {
    super(props);
    this.pagelang = getPageLang('moment');
    this.globallang = getPageLang('global');

    this.state = {
      title: this.pagelang['title'],
      canGoBack: true,
      canChangeCommunity: false,
      momentid: 0,
			phonenumber: '',
			name: '',
			profilepic: [],
			desc: '',
			gallery: [],
			communityid: 22,
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
    }
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
}

componentDidMount=(props)=>{
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
  // this.props.navigation.goBack();
  this.props.navigation.replace('Home');
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

canBeSubmitted() {
  const { profilepic } = this.state;
  return profilepic.length > 0;
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
          gallery: source.uri,
          data: response.data
        });
        console.log(this.state.profilepic)
      }
    });
}

addMoment=()=>{
    const {desc} = this.state;
    const {gallery} = this.state;
      
    if(desc == null || desc == '' || gallery == [] || gallery == null){
        alert('Please fill the input!');
        return false;
    }
        
    else{
        this.onSubmit();
    }
}

  onSubmit = () => {

      let params = {
        momentid: this.state.momentid,
        phonenumber : this.state.phonenumber,
        desc: this.state.desc,
        communityid: this.state.communityid,
        gallery: this.state.gallery
      }

      console.log(params);

      fetch(global.serverurl + global.webserviceurl + '/app_insert_moment.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: JSON.stringify(params)
      }).then((response) => {
          this.props.navigation.replace('Home');
      }).catch((error) => {
          console.log(error);
      });
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
      <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
      <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#fff' }}>
        <View style={styles.formRowContainer}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={styles.ImageContainer}>
                {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.ImageContainer} source={this.state.ImageSource} resizeMode="stretch"/>
                }
              </View>
            </TouchableOpacity>
            <TextInput
              onChangeText={(text) => this.setState({desc:text})}
              underlineColorAndroid="transparent"
              placeholder="What's on your moment?"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              style={styles.TextInputStyle}
            />
            <TouchableOpacity onPress={this.addMoment} activeOpacity={0.6} style={styles.button} >
            <Text style={styles.TextStyle}> POST MOMENT </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
    </View>
    );
  }

}

export default AddMoment;
