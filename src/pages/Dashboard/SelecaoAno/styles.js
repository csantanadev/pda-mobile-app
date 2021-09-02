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
        justifyContent: 'flex-end'
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 13,
        height: 50,
        paddingTop: 10
    },
    textNome: {
        fontSize: 15,
    },
    textDivida: {
        fontSize: 15,
        color: 'red',
        marginRight: 50
    },
    textNormal: {
        fontSize: 15,
        color: 'black',
        marginRight: 50
    },
    Lista: {
        marginTop: 15,
        marginBottom: 35
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
    },
    img: {
        height: 20,
        
    },

});

