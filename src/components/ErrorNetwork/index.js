import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ErrorNetwork({ onclick }) {

    return (
        <View style={styles.container}>

            <Feather name='wifi-off' size={200} style={styles.icon} />
            <TouchableOpacity style={styles.botao} onPress={onclick}>
                <Text style={styles.textoBotao}>Tentar Novamente</Text>
            </TouchableOpacity>

        </View>
    );
}




