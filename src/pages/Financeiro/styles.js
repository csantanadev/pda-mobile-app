import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    body: {
        marginTop: 5,
        paddingHorizontal: 13,
    },
    imgLista: {
        height: 50,
        width: 50,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    textApelido: {
        paddingTop: 8,
        color: "#616161",
        fontWeight: 'bold',
        fontSize: 14
    },
    textProperty: {
        paddingTop: 5,
        color: "#616161",
        fontSize: 14
    },
    Lista: {
        paddingTop: 8,
        paddingBottom: 50,
        marginBottom: 182
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 13,
    },
    containerLista: {
        paddingLeft: 13,
        flexDirection: 'column',
        flexGrow: 1
    },
    containerListaFim: {
        paddingLeft: 14,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    containerSearch: {
        paddingTop: 5,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        width: '100%',
        fontSize: 18,
        height: 40,
        flex: 1
    },
    textPG: {
        color: "#FFF",
        backgroundColor: "#43a047",
        borderRadius: 30,
        height: 15,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginTop: 7,
        fontSize: 10
    },
    textAberto: {
        color: "#FFF",
        backgroundColor: "#f44336",
        borderRadius: 30,
        height: 15,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginTop: 7,
        fontSize: 10
    },
    textParcial: {
        color: "#FFF",
        backgroundColor: "#000",
        borderRadius: 30,
        height: 15,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginTop: 7,
        fontSize: 10
    },
    buttonsSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        marginHorizontal: 5,
        justifyContent: 'space-between',
    },
    textbuttonsSearch: {
        color: "#616161",
        backgroundColor: "#eeeeee",
        borderRadius: 20,
        height: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
        fontSize: 15
    },

    textbuttonsSearchSelecionado: {
        color: "#000",
        backgroundColor: "#ffb74d",
        borderRadius: 20,
        height: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 15
    },
    containerMes: {
        paddingTop: 5,
        paddingBottom: 10,
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

