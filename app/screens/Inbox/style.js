import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    
    formRowContainer:{
        marginTop:30,
        paddingRight:15,
        paddingLeft:15,
        backgroundColor:'#fff',
        flexDirection:'row', 
        borderBottomWidth:1, 
        borderBottomColor:'#d9d9d9', 
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:0
    },
    formRow:{
        flex:0,
        flexShrink:1,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#d9d9d9',
        paddingLeft:10,
        paddingRight:10
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
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:1,
        borderColor:'#d9d9d9'
    },
    center:{
        textAlign:'center',
        color:'#dd0000'
    }

});
export default styles;
