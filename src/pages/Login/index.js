import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, ScrollView, Alert, Text, Vibration, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export default function Login({ navigation }) {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});

    useEffect(() => {
        registerForPushNotificationsAsync();
        const _notificationSubscription = Notifications.addListener(_handleNotification);
    }, []);

    async function registerForPushNotificationsAsync() {

        if (Constants.isDevice) {

            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {

                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;

            }

            if (finalStatus !== 'granted') {
                Alert.alert(
                    "Atenção",
                    "Falha ao recuperar token de recebimento de notificações.",
                    [
                        {
                            text: "OK"
                        }
                    ]
                );
                return;
            }
            const token = await Notifications.getExpoPushTokenAsync();
            setExpoPushToken(token)
        }
        else {
            Alert.alert(
                "Atenção",
                "É necessário usar o dispositivo físico para notificações push.",
                [
                    {
                        text: "OK"
                    }
                ]
            );

        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('pda-messages', {
                name: 'PDA messages',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
              });
        }
    };


    function _handleNotification(notify) {
        Vibration.vibrate();
        setNotification(notify)
    };


    // funcao provida pelo contexto
    const { login } = useContext(AuthContext);


    async function handleLogin() {

        // validações de tela
        if (!usuario) {

            Alert.alert(
                "Atenção",
                "Informe um login.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (!senha) {

            Alert.alert(
                "Atenção",
                "Informe uma senha.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        try {
            setLoading(true);
            const retorno = await login(usuario.trim(), senha.trim(), expoPushToken)

            if (retorno == "false") {

                setLoading(false);

                Alert.alert(
                    "Atenção",
                    "Usuário ou Senha Inválida.",
                    [
                        { text: "OK" }
                    ]
                );
            }
            else if (retorno == "inativo") {

                setLoading(false);

                Alert.alert(
                    "Atenção",
                    "Você foi inativado pelo administrador.",
                    [
                        { text: "OK" }
                    ]
                );
            }

        } catch (err) {
            setLoading(false);
            Alert.alert(
                "Erro",
                "Erro ao efetuar login !",
                [
                    { text: "OK" }
                ]
            );
        }
    }


    /*const sendPushNotification = async () => {

        const message = {
            to: 'ExponentPushToken[r5M2tdGMrHAlaDVaryRzBV]',
            sound: 'default',
            title: 'PDA Informa',
            body: 'Fique em casa por conta do covid-19',
            _displayInForeground: true,
        };

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };*/



    return (

        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#FFF" }}
            keyboardShouldPersistTaps='handled' >
            <View style={styles.container}>

                <View style={styles.containerBody}>

                    <Text style={styles.LoginText}>Seja bem-vindo à PDA!</Text>

                    <Text style={{ fontSize: 18, paddingBottom: 25, color: '#757575' }}>Informe o seu login e senha.</Text>


                    <View style={styles.containerLogin}>
                        <Feather name="user" size={30} style={styles.icon} color={'#3E4095'} />
                        <TextInput
                            style={styles.iptLogin}
                            placeholder="Login"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            maxLength={10}
                            value={usuario}
                            onChangeText={setUsuario}
                        >
                        </TextInput>
                    </View>

                    <View style={styles.containerLogin}>
                        <Feather name="lock" size={30} style={styles.icon} color={'#3E4095'} />
                        <TextInput
                            style={styles.iptLogin}
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            autoCompleteType={'password'}
                            maxLength={10}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                            onSubmitEditing={handleLogin}
                        >
                        </TextInput>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <TouchableOpacity style={styles.botaoWarningGrande} onPress={handleLogin}>
                            {
                                loading ? (<View>
                                    <ActivityIndicator size="large" color="#FFF" />
                                </View>) : (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Feather name={'log-in'} size={17} style={styles.iconRefresh} />
                                            <Text style={styles.textoBotao}>Login</Text>
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




