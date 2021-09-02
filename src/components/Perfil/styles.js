import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flexDirection: 'column',
    },
    containerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    containerTopScore: {
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyTop: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    containerBody: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerBodyItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imgAvatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    imgLista: {
        height: 50,
        width: 50,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    textScoreLabel: {
        fontSize: 11,
        color: "#616161"
    },
    textScore: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    textNormal: {
        paddingTop: 8,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textProperty: {
        paddingTop: 5,
        color: "#616161"
    },
    textPropertySecao: {
        paddingTop: 8,
        fontSize: 20,
        color: "#616161"
    },
    itemMensalidade: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    containerLista: {
        paddingLeft: 14,
        flexDirection: 'column',
        flexGrow: 1
    },
    containerListaFim: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: 14,
        flexDirection: 'column',
        height: 52
    },
    textAtivo: {
        color: "#FFF",
        backgroundColor: "#f44336",
        borderRadius: 10,
        height: 25,
        paddingHorizontal: 10,
        paddingTop: 3,
        alignItems: 'center',
        fontWeight: 'bold'
    }

});

