import React  from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function Search({ placeholder, maxLength, onChange }) {


    return (
        <View style={styles.containerSearch}>
            <Feather name="search" size={25} style={styles.lupa} />
            <TextInput
                style={styles.search}
                placeholder={placeholder}
                maxLength={maxLength}
                onChangeText={onChange}
            >
            </TextInput>
        </View>
    );
}




