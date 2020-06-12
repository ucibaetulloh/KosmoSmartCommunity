import {StyleSheet} from 'react-native';

let style = StyleSheet.create({
  dateTouch: {
    width: 142
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    color: '#333'
  },
  placeholderText: {
    color: '#c9c9c9'
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  },

  FormContainer: {
    flex: 1,
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  FormFilterDate: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    marginBottom: 8,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  FormRowFilter:{
    flexDirection:'row'
  },
  FormRowDebtor:{
    flex: 1,
    flexDirection:'row'
  },
  TextPaidHistory:{
    fontSize:16,
    fontWeight:'normal',
    color: '#000',
    alignContent:'center',
    alignItems:"center",
    textAlign:'center'
  },
  formRowContainer:{
    paddingRight:15,
    paddingLeft:15,
    backgroundColor:'#fff',
},

formRow:{
    flex:1,
    flexShrink:1,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#d9d9d9',
    paddingLeft:10,
    paddingRight:10
},
formColumnStart:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  paddingLeft:10,
  paddingBottom:8,
  paddingTop:8,
},
formColumnEnd:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  paddingRight:10,
  paddingBottom:8,
  paddingTop:8,
},
rowFilter:{
  justifyContent:"center",
  paddingRight:20,
  paddingLeft:20,
  alignContent:"center",
  paddingBottom:8
},
buttonFilter:{
    paddingRight:25,
    paddingLeft:20,
    justifyContent:"center",
    alignContent:"center",
    paddingBottom:8
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

FlatListItemStyle: {
  padding: 10,
  fontSize: 14,
  height: 50,
  marginBottom:5,
  marginTop:5
},

container: {
  flex: 1,
  padding: 6,
  height: 150,
  marginLeft:8,
  marginRight:8,
  marginTop: 8,
  marginBottom: 8,
  borderRadius: 5,
  backgroundColor: '#FFF',
  elevation: 2,
},
description: {
  fontSize: 14,
  justifyContent:'center',
  textAlign:'left',
  color: '#000'
},
SelectOption: {
  fontSize: 16,
  justifyContent:'center',
  textAlign:'center',
  color: '#000'
},
descriptionDate: {
  flex:1,
  justifyContent:"center",
  textAlign:'left',
  paddingLeft:10,
  paddingBottom:4,
  fontSize: 14,
},
container_text: {
  flex: 1,
  flexDirection: 'column',
  marginLeft: 10,
  justifyContent: 'center',
},
RowTop:{
  flexDirection:'row',
  borderBottomWidth:1,
  marginBottom:4,
  borderBottomColor:'#d9d9d9',
},
RowDescription:{
  flexDirection:'row'
},
ColumnCategory:{
  flex:1,
  textAlign:'left',
  justifyContent:'center',
  color: '#000'
},
ColumnAmount:{
  flex:1,
  paddingRight:10,
  textAlign:'right',
  justifyContent:'center',
  color: '#000'
},
RowEnd:{
  flexDirection:'row',
  borderTopWidth:1,
  marginTop:4,
  borderTopColor:'#d9d9d9'
},
Column:{
  flex:1,
  marginLeft: 10,
  justifyContent:"center"
},
ColumnDate:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  textAlign:'left',
  paddingLeft:10,
  fontSize: 14,
},
ColumnStatus:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  textAlign:'right',
  fontSize: 14,
  color: '#000',
},
ColumnStartDate:{
  flex:1,
  paddingTop:8,
  justifyContent:"center",
},
ColumnEndDate:{
  flex:1,
  paddingTop:8,
  paddingLeft:20,
  justifyContent:'center'
},
ColumnNoPay:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  textAlign:'left',
  paddingLeft:10,
  fontSize: 14,
  color: '#000',
},
ColumnPay:{
  flex:1,
  marginRight:10,
  justifyContent:"center",
  textAlign:'right',
  fontSize: 14,
  color: '#000',
},
center:{
    textAlign:'center',
    color: '#000',
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor:'#fff'
},
MainColoum: {
  flex: 1,
  marginTop:8,
  justifyContent: 'center',
  backgroundColor:'#fff'
},
});

export default style;