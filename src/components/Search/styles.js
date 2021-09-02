import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        width: '100%',
        fontSize: 18,
        height: 40,
        flex: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    lupa: {
        backgroundColor: '#eeeeee',
        height: 40,
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    }
});

