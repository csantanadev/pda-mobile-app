import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import styles from './styles';

export default function Header({ label, nameIcon }) {

    return (
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <Feather name={nameIcon} size={25} />
                <Text style={styles.headerText}>{label}</Text>
            </View>
        </View>
    );
}




