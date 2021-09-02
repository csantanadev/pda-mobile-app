import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function Loading() {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color="#616161" />
            <Text style={styles.textLoading}>Carregando...</Text>
        </View>
    );

}
