import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    
    formContainer:{
        padding:30,
        marginTop:20
    },
    label:{
        marginBottom:6,
        color:'#000'
    },
    pictureContainer: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom: 16,
        elevation: 6
    },
    input:{
        marginBottom:20,
        borderWidth:1,
        borderColor:'#000',
        borderRadius:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:6,
        paddingBottom:6
    },
    registerTextView:{
        marginTop:15, 
        justifyContent:'center', 
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    registerHyperlink:{
        color:'rgb(8,194,223)'
    },
    inputContainer1: {
        borderColor:'#000',
        backgroundColor:'rgba(246,246,246,1)',
        borderRadius:5,
        borderWidth: 1,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
    },
    inputIcon:{
        width:20,
        height:20,
        marginLeft:15,
        justifyContent: 'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        color:'#000',
        borderBottomColor: '#FFFFFF',
        flex:1,
        marginTop:5
    },
    visibilityBtn:
    {
    position: 'absolute',
    right: 4,
    padding: 8
    },
 
    btnImage:
    {
        width:20,
        height:20,
    },
    btnImageIcon:{
        width:20,
        height:20,
    },
    

});
export default styles;
