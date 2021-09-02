import React, { useState, useContext } from 'react';
import { Text, View, TextInput, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Base64 from 'Base64';
import Loading from '../../components/Loading';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';

import { UserContext } from '../../contexts/UserContext';

export default function AlterarSenha({ navigation }) {

    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [carregando, setCarregando] = useState(false);

    // objeto usuario provido pelo contexto
    const user = useContext(UserContext);


    async function handleSave() {

        // validações de tela
        if (!senha) {

            Alert.alert(
                "Atenção",
                "Informe uma nova senha.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (!senhaConfirmada) {

            Alert.alert(
                "Atenção",
                "Confirme a nova senha.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (senha != senhaConfirmada) {

            Alert.alert(
                "Erro",
                "As senhas não conferem.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        try {

            setCarregando(true);

            const data = {
                codigo: user.pda_jog_cod,
                psw_encript: Base64.btoa(senha)
            }

            const res = await api.post('Login/alterarSenha', data);

            setCarregando(false);

            if (res.data) {
                Alert.alert(
                    "Confirmação",
                    "Senha alterada com sucesso",
                    [
                        {
                            text: "OK", onPress: () => {
                                navigation.goBack()
                            }
                        }
                    ]
                );
            }
        } catch (err) {
            setCarregando(false);
            Alert.alert(
                "Erro",
                "Erro ao atualizar os dados.",
                [
                    { text: "OK", onPress: () => { } }
                ]
            );
        }
    }


    return (

        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#FFF" }}
            keyboardShouldPersistTaps='handled' >
            <View style={styles.container}>

                <View style={styles.containerBody}>
                    <Text style={styles.textProperty}>Nova Senha</Text>
                    <TextInput style={styles.input}
                        placeholder="Nova Senha"
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        autoCompleteType={'password'}
                        maxLength={10}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />
                    <Text style={styles.textProperty}>Confirmar Nova Senha</Text>
                    <TextInput style={styles.input}
                        placeholder="Confirmar Nova Senha"
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        autoCompleteType={'password'}
                        maxLength={10}
                        value={senhaConfirmada}
                        onChangeText={setSenhaConfirmada}
                        secureTextEntry={true}
                        onSubmitEditing={handleSave}
                    />

                    <View style={{ marginTop: 25 }}>
                        <TouchableOpacity style={styles.botaoGrande} onPress={handleSave}>
                            {
                                carregando ? (<View>
                                    <ActivityIndicator size="large" color="#FFF" />
                                </View>) : (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Feather name={'check'} size={17} style={styles.iconRefresh} />
                                            <Text style={styles.textoBotao}>Salvar</Text>
                                        </View>
                                    )
                            }
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        </ScrollView>

    );
}




