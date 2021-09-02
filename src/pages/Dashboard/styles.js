import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 13,
        paddingVertical: 13
    },
    contentItens: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //marginTop: 20,
        marginVertical: 13
    },
    cardItem: {
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        height: 120,
        width: 120,
        borderRadius: 20
    },
    img: {
        marginTop: 20,
        height: 40,
    },
    label: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: 'bold'
    }
});

