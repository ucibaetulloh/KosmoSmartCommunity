import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, Image, TouchableHighlight } from 'react-native';

import styles from './style';

import { getPageLang } from '../../languages';


class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.pagelang = getPageLang('loadingscreen');
        this.state = {
            /*data: props.data,
            selectedValue : props.selectedValue,*/
        }
    }

    componentWillReceiveProps=(props)=>{
        //this.setState({data:props.data, selectedValue:props.selectedValue});
        
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.loadingContainer}>
                    <Image source={require('../../assets/images/loading-spinner.gif')} style={styles.spinnerImage}/>
                </View>
            </View>
        )
    }
}

export default LoadingScreen;