import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export const BotaoGrande = ({ tipo, texto, icon, onClick }) => {

    let estilo;

    if (tipo == 'primary') {
        estilo = styles.botaoPrimaryGrande
    }
    else if (tipo == 'success') {
        estilo = styles.botaoSuccessGrande;
    }
    else if (tipo == 'danger') {
        estilo = styles.botaoDangerGrande;
    }
    else if (tipo == 'warning') {
        estilo = styles.botaoWarningGrande;
    }

    return (
        <TouchableOpacity style={estilo} onPress={onClick}>
            <Feather name={icon} size={17} style={styles.icon} />
            <Text style={styles.textoBotao}>{texto}</Text>
        </TouchableOpacity>
    );
}


export const BotaoMedio = ({ tipo, texto, icon, onClick }) => {

    let estilo;

    if (tipo == 'primary') {
        estilo = styles.botaoPrimaryMedio
    }
    else if (tipo == 'success') {
        estilo = styles.botaoSuccessMedio;
    }
    else if (tipo == 'danger') {
        estilo = styles.botaoDangerMedio;
    }
    else if (tipo == 'warning') {
        estilo = styles.botaoWarningMedio;
    }

    return (
        <TouchableOpacity style={estilo} onPress={onClick}>
            <Feather name={icon} size={17} style={styles.icon} />
            <Text style={styles.textoBotao}>{texto}</Text>
        </TouchableOpacity>
    );
}


export const BotaoPequeno = ({ tipo, texto, icon, onClick }) => {

    let estilo;

    if (tipo == 'default') {
        estilo = styles.botaoDefaultPequeno
    }
    else if (tipo == 'primary') {
        estilo = styles.botaoPrimaryPequeno
    }
    else if (tipo == 'success') {
        estilo = styles.botaoSuccessPequeno;
    }
    else if (tipo == 'danger') {
        estilo = styles.botaoDangerPequeno;
    }
    else if (tipo == 'warning') {
        estilo = styles.botaoWarningPequeno;
    }

    return (
        <TouchableOpacity style={estilo} onPress={onClick}>
            <Feather name={icon} size={13} style={tipo != 'default' ? styles.icon : styles.iconInverse} />
            <Text style={tipo != 'default' ? styles.textoBotao : styles.textoBotaoInverse}>{texto}</Text>
        </TouchableOpacity>
    );
}

export const BotaoMini = ({ tipo, texto, icon, onClick }) => {

    let estilo;

    if (tipo == 'default') {
        estilo = styles.botaoDefaultMini
    }
    else if (tipo == 'primary') {
        estilo = styles.botaoPrimaryMini
    }
    else if (tipo == 'success') {
        estilo = styles.botaoSuccessMini;
    }
    else if (tipo == 'danger') {
        estilo = styles.botaoDangerMini;
    }
    else if (tipo == 'warning') {
        estilo = styles.botaoWarningMini;
    }

    return (
        <TouchableOpacity style={estilo} onPress={onClick}>
            <Feather name={icon} size={13} style={tipo != 'default' ? styles.icon : styles.iconInverse} />
            <Text style={tipo != 'default' ? styles.textoBotao : styles.textoBotaoInverse}>{texto}</Text>
        </TouchableOpacity>
    );
}






