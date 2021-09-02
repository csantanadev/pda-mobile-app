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
        paddingBottom: 10,
        height: 50,
        paddingTop: 10,
        marginHorizontal: 5,
    },
    textNome: {
        fontSize: 15
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
        marginBottom: 27
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
        paddingLeft: 40,
    },
    headerButonsText: {
        fontSize: 10,
        color: 'green'
    },
    StySelecionado:{
        backgroundColor: '#ffb74d',
        //borderRadius: 8
    }

});

