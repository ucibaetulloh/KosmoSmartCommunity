import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import IntroScreen from './screens/IntroScreen/index';
import HomeScreen from './screens/Home/index';
import NewsScreen from './screens/News/index';
import MarketplaceScreen from './screens/Marketplace/index';
import MyPageScreen from './screens/MyPage/index';
import Profile from './screens/Profile';
import Company from './screens/Company';
import Order from './screens/Order';
import Payment from './screens/Payment';
import Message from './screens/Massage';
import Setting from './screens/Setting';
import Other from './screens/Other';
import Login from './screens/Login';
import Entertainment from './screens/Entertainment';
import Register from './screens/Register';
import CodeOTP from './screens/CodeOTP';
import AccountBinding from './screens/AccountBinding';
import AccountBindingList from './screens/AccountBindingList';
import Inbox from './screens/Inbox';
import LinkAccount from './screens/LinkAccount';
import Password from './screens/Password';
import ForgotPass from './screens/ForgotPass';
import ResetPass from './screens/ResetPass';
import Transaction from './screens/Transaction';
import About from './screens/About';
import AddMoment from './screens/AddMoment';
import RegisterOTP from './screens/RegisterOTP';

const RootStack = createStackNavigator(
  {
    IntroScreen: {screen: IntroScreen},
    Home: { screen: HomeScreen },
    News: { screen: NewsScreen },
    Marketplace: { screen: MarketplaceScreen },
    MyPage: { screen: MyPageScreen },
    Profile: { screen: Profile },
    Company: { screen: Company},
    Order: { screen: Order},
    Payment: { screen: Payment},
    Message: { screen: Message},
    Setting: { screen: Setting },
    Other: { screen: Other},
    Login: { screen: Login },
    Entertainment: { screen: Entertainment },
    Register: { screen: Register },
    CodeOTP: {screen: CodeOTP},
	  AccountBinding: { screen: AccountBinding },
    AccountBindingList: { screen: AccountBindingList },
    Inbox: { screen: Inbox},
    LinkAccount: { screen: LinkAccount},
    Password: { screen: Password},
    ForgotPass: { screen: ForgotPass},
    ResetPass: { screen: ResetPass},
    Transaction: { screen: Transaction},
    About: { screen: About},
    AddMoment: { screen: AddMoment},
    RegisterOTP: {screen: RegisterOTP},
  },
  {
    headerMode: 'none',
    initialRouteName: 'IntroScreen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0066ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
      },
    }
  });

const AppContainer = createAppContainer(RootStack);
export default AppContainer;