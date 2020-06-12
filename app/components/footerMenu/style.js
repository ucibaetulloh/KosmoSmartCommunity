import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#ffffff'
  },
  menuView: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center'
  },
  menuItem: {
    alignItems: "center",
  },
  image: {
    flex:1
  },
  activelink: {
    color: 'rgb(102,174, 188)',
    fontSize:12
  },
  nonactivelink: {
    fontSize:12
  }

});
export default styles;
