import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF'
    },
    body: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    Saldo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemLista: {
        flexDirection: 'row'
    },
    Lista: {
        marginTop: 15,
        marginBottom: 30
    },
    textPropertySecao: {
        fontSize: 20,
        color: "#616161"
    },
    card: {
        backgroundColor: '#eeeeee',
        flexDirection: 'column',
        marginVertical: 12,
        height: 115,
        width: "100%",
        borderRadius: 20
    },
    textCard: {
        color: '#616161',
        marginTop: 5,
        marginLeft: 10
    },
    cardItem:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 13
    }

});

