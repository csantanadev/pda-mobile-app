import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 13,
  },
  containerBody: {
    paddingTop: 20,
    flexDirection: 'column',
  },
  textProperty: {
    paddingTop: 5,
    color: "#616161"
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#A6B1C2',
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 17,
    color: '#000',
    marginBottom: 11,
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
  botaoGrande: {
    backgroundColor: "#43a047",
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
    height: 100,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});

