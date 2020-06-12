import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    
    formRowContainer:{
        padding:10,
        marginTop:20
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
    },
    container: {
        flex: 1,
        padding: 8,
        height: 'auto',
        margin:10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 8,
        borderWidth:0.5
    },
    container_text: {
        flex: 1,
      
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'center',
    },
    description: {
        fontSize: 13.5,
        color: '#000'
    },

    RowDescription:{
        flexDirection:'row'
      },
      ColumnLeft:{
        flex:1,
        color: '#000',
        textAlign:'left',
        justifyContent:'center'
      },
      ColumnRight:{
        flex:1,
        color: '#000',
        paddingRight:10,
        textAlign:'right',
        justifyContent:'center'
      },

});
export default styles;
