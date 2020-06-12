import React from 'react';
import { StyleSheet, PanResponder, Picker, Text, View, Dimensions, Form, FlatList, ActivityIndicator, Button ,WebView, Image, TouchableHighlight, ScrollView, BackHandler, AsyncStorage } from 'react-native';
import config from '../../config';
import {convertToRupiah} from '../../global';
import { getPageLang } from '../../languages';
import DatePicker from './datepicker';
import styles from './style';
import moment from 'moment';
import HeaderTitle from '../../components/headerTitle/index';
import FooterMenu from '../../components/footerMenu/index';
import LoadingScreen from '../../components/LoadingScreen';
import globalStyles from '../global.style';

class TransactionScreen extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('transaction');

        this.state = {
            title: this.pagelang['title'],
            canGoBack: true,
            canChangeCommunity: false,
            token:'',
            Debtor:'',
  	        UnitCode:'',
            startDate: '',
            endDate: '',
            list:[],
            dataSource:[],
            listUnitCode:[],
            currentUnitCode: '',
            isLoading: true,
            selectedCountry : null,
            showLoading: false,
        }
        // this.countryData = ["India","Pakistan","USA"];
        // this.doFilter = this.doFilter.bind(this);
        console.log(this.state.loginBinding);
    }

    
    _retrieveData = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }
    
    _retrieveDataToken = async (key) => {
        let value = await AsyncStorage.getItem(key);
        return value;
    }

    loadBinding = ()=>{

        // let today = new Date().toISOString().slice(0, 10)
        // this.setState({endDate : today});

        // let priorDate = new Date().toISOString().slice(0, 10)
        // this.setState({startDate : priorDate});

        this._retrieveData('smart-app-id-binding').then(info => {
           
            if(info !== null){
                info = JSON.parse(info)
                console.log(info)
                let current = '';
                if(info.length>0){
                    current = info[0].DebtorAcct+'|'+info[0].LotNo;
                    this.changeUnitCode(info[0].DebtorAcct+"|"+info[0].LotNo);
                    this.doValueDebtor(info[0].DebtorAcct, info[0].LotNo)
                }
                this.setState({listUnitCode: info, currentUnitCode: current});

                this.setState({...this.state, 
                    Debtor: info[0].DebtorAcct,
                    UnitCode: info[0].LotNo
                })
            }  
            else this.props.navigation.replace('AccountBinding');            
        })

        this._retrieveDataToken('smart-app-id-token').then(info => {
            if(info !== null){
                info = JSON.parse(info)
                console.log(info)
                this.setState({...this.state,
                    token: info.access_token
                })
            }
            else this.props.navigation.replace('AccountBinding');
        })

    }

    componentWillMount() {
        this._retrieveData('smart-app-id-binding').then(info => {
            if(info === null)  this.props.navigation.replace('AccountBinding');            
        })

        this._retrieveDataToken('smart-app-id-token').then(info => {
            if(info === null) this.props.navigation.replace('AccountBinding')
        })

        this.loadBinding();
        // this.doShowData();

        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
          onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
          onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
          onPanResponderMove: (e) => console.log('onPanResponderMove'),
          onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
          onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
        });
      }

    componentDidMount=()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.loadBinding();
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

    // goBack=()=> {
    //     this.props.navigation.goBack();
    // }

    doValueDebtor = (Debtor, UnitCode) =>{

        const data = {
            token: this.state.token,
            Debtor: Debtor,
            UnitCode: UnitCode,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };

        fetch(global.serverurl + global.webserviceurl + '/api_modern_history_payment.php',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((response) => {
            
            // alert(JSON.stringify(response));
            console.log(response);
            if (response.status === "OK") {
                if(response.status === "Error"){
                    Alert.alert(this.globallang.alert, this.pagelang.error, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    {this.renderLoading()}
                    this.setState({
                        isLoading: false,
                        dataSource: response.data
                    });
                }
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

    doFilter = () =>{

        const data = {
            token: this.state.token,
            Debtor: this.state.Debtor,
            UnitCode: this.state.UnitCode,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };

        fetch(global.serverurl + global.webserviceurl + '/api_modern_history_payment.php',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // alert(JSON.stringify(response));
            console.log(response);
            if (response.status === "OK") {
                if(response.status === "Error"){
                    Alert.alert(this.globallang.alert, this.pagelang.error, [{ text: this.globallang.ok, onPress: () => console.log('OK Pressed') }], { cancelable: false });
                }else{
                    this.setState({
                        isLoading: false,
                        dataSource: response.data
                    });
                }
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

    renderLoading=()=>{
        if(this.state.showLoading){
            return (
                <LoadingScreen></LoadingScreen>
            )
        }
    }

    changeUnitCode=(value)=>{
        let arr = value.split("|");
        this.doValueDebtor(arr[0], arr[1]);
        this.setState({currentUnitCode: value})
        setTimeout(()=>{
            this.setState({showLoading:false});
        }, 500);
    }

    LoadingScreen = () => {
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                  <Text style={{justifyContent:'center', alignContent:'center', textAlign:'center'}} >Please Wait</Text>
                <ActivityIndicator size="large"/>
              </View>
            );
          }
      }

    UntiCodeList = () =>{
        return( this.state.listUnitCode.map( (x,i) => { 
        return( <Picker.Item label={x.LotNo} key={i} value={x.DebtorAcct+'|'+x.LotNo} />)} ));
    }
      
      RenderItem =({item})=>(
            <View style={styles.container}>
                <View style={styles.RowTop} >
                    <Text style={styles.descriptionDate} >{moment(item.PayDate).format('LLLL')} </Text>
                </View>
                <View style={styles.container_text}>
                    <Text style={styles.description}>
                        Periode: {item.Periode}
                    </Text>
                    <Text style={styles.description}>
                        Debtor Account: {item.DebtorAcct}
                    </Text>
                    <Text style={styles.description}>
                        INV/{item.InvNo}
                    </Text>
                    <View style={styles.RowDescription}>
                    <Text style={styles.ColumnCategory}>Category {item.Category}PKL</Text>
                    <Text style={styles.ColumnAmount} > {convertToRupiah(item.InvAmt)}</Text>
                    </View>
               </View>
               <View style={styles.RowEnd} >
                    <Text style={styles.ColumnNoPay} >PAY/{item.PayNo} </Text>
                    <Text style={styles.ColumnPay} > {convertToRupiah(item.PayAmt)}</Text>
                </View>
            </View>
        )
      

    render(){

        return(
            <View style={globalStyles.screenContainer}>
            <HeaderTitle param={{ title: this.state.title, canGoBack: this.state.canGoBack, canChangeCommunity: this.state.canChangeCommunity, showPointerIcon: false }} change={this.changeCommunity.bind(this)} back={this.goBack.bind(this)} />
            <ScrollView style={{ flex:1, position:'absolute', top:30, bottom:0, left:0, right:0, backgroundColor:'#f2f2f2' }}>
                <View style={styles.FormContainer}>
                    <Text style={styles.TextPaidHistory} >Paid Payment IPKL</Text>
                </View>
                <View style={{backgroundColor:'#fff', flexDirection:'row'}}>
                    <View style={styles.MainContainer}>
                        <Text style={styles.SelectOption}>Select Unit Code :</Text>
                    </View>
                    <View style={styles.MainContainer}>
                    <Picker
                        selectedValue={this.state.currentUnitCode}
                        onValueChange={ (value) => ( this.changeUnitCode(value) )}>
                        { this.UntiCodeList() }
                    </Picker>
                    </View>
                </View>
                <View style={styles.FormFilterDate}>
                    <View style={styles.rowFilter}>
                        <View style={styles.FormRowFilter}>
                            <View style={styles.MainColoum}>
                            <DatePicker
                                date={this.state.startDate}
                                placeholder='Start Date'
                                mode="date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({startDate: date});}}/>
                            </View>
                            <View style={styles.MainColoum}>
                            <DatePicker
                                date={this.state.endDate}
                                placeholder='End Date'
                                mode="date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({endDate: date});}}/>
                            </View>
                            <View style={styles.MainColoum} >
                                <Button
                                    onPress={()=>this.doFilter()}
                                    title={this.pagelang.filter}
                                    color="rgb(8,194,223)"
                                    accessibilityLabel={this.pagelang.filter}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                
                    {/* <View style={{flex: 1, paddingTop: 20}}>
                        <ActivityIndicator  size="large" />
                    </View> */}
                    {this.LoadingScreen()}
                <View style={{backgroundColor:'#f2f2f2' }} >
                    <FlatList
                        data={ this.state.dataSource }
                        // ItemSeparatorComponent = {this.FlatListItemSeparator}
                        renderItem={this.RenderItem}
                        // extraData={this.state}
                        // keyExtractor={(item, index) => index}
                        // keyExtractor={(item) => item.toString()}
                        keyExtractor = { (item, index) => index.toString() }
                    />
                </View>
            </ScrollView>
            {/* <FooterMenu navigation={this.props.navigation} currentMenu={5} refreshPage={this.refreshPage} /> */}
        </View>
        );
    }
}

export default TransactionScreen