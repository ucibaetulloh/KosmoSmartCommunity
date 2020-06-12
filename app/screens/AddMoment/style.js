import { StyleSheet } from 'react-native'
import { PixelRatio} from 'react-native';

const styles = StyleSheet.create({
    
    formRowContainer:{
        paddingRight:15,
        paddingLeft:15,
        paddingTop: 20,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
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
    formColumn2:{
        flex:1,
        paddingTop:15,
        paddingBottom:15,
        paddingRight:0,
        alignItems:"flex-end"
    },
    formColumnAlignRight:{
        textAlign:'right',
        color:'#000',
        fontSize:14
    },
    picture:{
        width:100,
        height:100,
        borderRadius:60,
        borderWidth:1,
        borderColor:'#d9d9d9'
    },
    formContainer:{
        padding:20,
        backgroundColor:'#fff'
    },
    label:{
        marginBottom:4,
        marginTop:4
    },
    input:{
        marginBottom:20,
        borderWidth:1,
        borderColor:'#d9d9d9',
        borderRadius:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:8,
        paddingBottom:8
    },
    select:{
        marginBottom:20,
        borderWidth:1,
        borderColor:'#d9d9d9',
        borderRadius:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:8,
        paddingBottom:8,
    },
    selectLabel:{
        marginBottom:20,
        paddingTop:8,
        paddingBottom:8,
        
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        width:120,
        height:120,
        borderRadius:80,
        borderWidth:1,
        borderColor:'#d9d9d9'
      },
    selectText:{
        alignSelf:'flex-start'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingTop: 20
      },
    
      ImageContainer: {
        width: 300,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    
      },
    
      TextInputStyle: {
        justifyContent: "flex-start",
        textAlign:'left',
        height: 100,
        width: '90%',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#9B9B9B',
        paddingTop: 10,
        paddingLeft:10,
        marginTop:20
      },

      textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
    
      button: {
        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
      },
    
      TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
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
    },
    textAreaContainer: {
        borderColor: 'rgb( 51, 51, 51)',
        borderWidth: 1,
        margin:4,
        padding: 5,
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
      ImageContainer: {
        width: 300,
        height: 200,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    
      },
      headerTitle: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        //backgroundColor: '#007aff',
        backgroundColor: '#f2f2f2',
        elevation: 5,
        borderBottomWidth: 0,
        zIndex: 150
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
        padding:0
    },
    textTitle: {
        color: '#000000',
        fontSize: 18,
        
    },
    leftContainer: {
        alignItems: 'center',
        width: 70
    },
    backButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    backButtonText: {
        color: '#379afb'
    },
    middleContainer: {
        alignItems: "center"
    },
    rightContainer: {
        alignItems: "center",
        width: 70
    },
    pointerImg:{
        height:20,
        width:20,
        resizeMode: 'contain',
        marginRight: 4
    }

    

});
export default styles;