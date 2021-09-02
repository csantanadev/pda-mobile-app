import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF'
    },
    body: {
        marginTop: 5,
        paddingHorizontal: 13,
    },
    imgLista: {
        height: 55,
        width: 55,
        borderRadius: 55,
        resizeMode: 'cover',
        marginTop: 5
        //backgroundColor: 'red'
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 13,
    },
    containerLista: {
        marginLeft: 8,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        height: 50
    },
    containerListaFim: {
        marginTop: 10,
        paddingRight: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    scrollView: {
        flex: 1,
    },
    textProperty: {
        paddingTop: 5,
        color: "#616161",
        fontSize: 12
    },
    textNome: {
        fontSize: 12,
        color: "#616161"
    },
    textNomeBold: {
        color: "#616161",
        fontWeight: 'bold',
        fontSize: 15
    },
    textPropertySecao: {
        fontSize: 20,
        marginLeft: 10,
        color: "#616161"
    },
    Lista: {
        paddingTop: 8,
        marginBottom: 100
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

