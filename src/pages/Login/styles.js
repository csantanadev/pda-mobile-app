import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingTop: Constants.statusBarHeight + 50,
  },
  containerBody: {
    paddingTop: 20,
    flexDirection: 'column',
  },
  textProperty: {
    paddingTop: 5,
    color: "#616161"
  },
  LoginText: {
    fontSize: 30,
    //opacity: 0.8,
    color: '#3E4095',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  icon: {
    backgroundColor: '#f5f5f5',
    height: 50,
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  containerLogin: {
    paddingTop: 5,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iptLogin: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    fontSize: 18,
    height: 50,
    flex: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  botaoWarningGrande: {
    backgroundColor: "#FF9800",
    borderRadius: 5,
    flexDirection: "row",
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRefresh: {
    color: "#FFF",
    fontSize: 18,
    paddingRight: 5,
  },
  textoBotao: {
    fontSize: 15,
    color: '#FFF',
  },
  img: {
    marginTop: 20,
    height: 100,
  },

});

