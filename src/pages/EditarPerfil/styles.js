import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 13,
    marginBottom: 30
  },
  containerTop: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerTopAcoes: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnFoto: {
    paddingTop: 10
  },
  imgAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: 'cover'
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
  headerButons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
  },
  headerButonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40
  },
  headerButonsText: {
    fontSize: 10
  },
});

