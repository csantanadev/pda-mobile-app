import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Picker, Image, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { BotaoPequeno } from '../../components/Botao';
import imgNotFound from '../../assets/imgNotFound.png';
import { baseUrlAvatar } from '../../utils';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { Feather } from '@expo/vector-icons';

export default function EditarPerfil({ navigation, route }) {

    const { perfil } = route.params;
    const [nome, setNome] = useState(perfil.pda_jog_nome);
    const [dataNascimento, setDataNascimento] = useState(perfil.pda_jog_dta_nasc);
    const [celular, setCelular] = useState(perfil.pda_jog_celular);
    const [rg, setRG] = useState(perfil.pda_jog_rg);
    const [posicao, setPosicao] = useState(perfil.pda_jog_posicao);
    const [imgUrl] = useState(perfil.pda_jog_url_avatar);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [carregando, setCarregando] = useState(false);


    const openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            //alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });

    }

    // atualizar o filename
    useEffect(() => {
        if (selectedImage) {
            const uriParts = selectedImage.localUri.split('.');
            const uriPartsIMG = selectedImage.localUri.split('/');
            setFileType(uriParts[uriParts.length - 1]);
            setFileName(uriPartsIMG[uriPartsIMG.length - 1]);
            //setFileName(perfil.pda_jog_cod + '.' + uriParts[uriParts.length - 1]);
        }
    }, [selectedImage, fileName]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <View style={styles.headerButons}>
                        <View style={styles.headerButonsContainer}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={handleSave}>
                                <View>
                                    <Feather name="save" size={25} />
                                </View>
                                <View>
                                    <Text style={styles.headerButonsText}>Salvar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ),
        });
    }, [selectedImage, fileName, uploadFoto]);

    async function uploadFoto() {

        const formData = new FormData();

        formData.append('photo', {
            uri: selectedImage.localUri,
            name: fileName,
            type: `image/${fileType}`,
        });

        const res = await api.post('EditarPerfil/uploadImage/' + perfil.pda_jog_cod, formData,
            {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            });

        const { codigo } = res.data;

        return (codigo == 1);
    }

    async function EditarDados() {

        const data = {
            id: perfil.pda_jog_cod,
            nome: nome,
            data: dataNascimento,
            celular: celular,
            rg: rg,
            posicao: posicao,
            fileName: fileName
        }

        const res = await api.post('EditarPerfil/EditarDadosPerfil', data);

        const { codigo } = res.data;

        return (codigo == 1);
    }

    async function handleSave() {

        try {

            setCarregando(true);

            // opção de troca de imagem
            if (selectedImage != null) {

                const retorno = await uploadFoto();

                if (retorno != 1) {
                    setCarregando(false);
                    Alert.alert(
                        "Erro",
                        "Não foi possível alterar a foto.",
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                    return;
                }
            }

            const retEdit = await EditarDados();

            setCarregando(false);

            if (retEdit) {
                Alert.alert(
                    "Confirmação",
                    `Atualização realizada com sucesso! 
                    \nImportante: A imagem de perfil pode demorar alguns segundos para carregar.`,
                    [
                        {
                            text: "OK", onPress: () => {
                                navigation.navigate('Home', { atualizouPerfil: true });
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
            keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container}>

                {
                    carregando && (<Loading />)
                }

                {
                    !carregando && (
                        <>
                            <View style={styles.containerTop}>
                                {selectedImage == null ? <Image style={styles.imgAvatar} source={imgUrl == null ? imgNotFound :
                                    { uri: baseUrlAvatar.urlAvatar + perfil.pda_jog_url_avatar }}
                                />
                                    :
                                    <Image style={styles.imgAvatar} source={{ uri: selectedImage.localUri }}
                                    />
                                }
                            </View>
                            <View style={styles.containerTopAcoes}>
                                <BotaoPequeno tipo={'default'} texto={'Alterar Foto'} icon={'camera'} onClick={openImagePickerAsync} />

                            </View>


                            <View style={styles.containerBody}>

                                <Text style={styles.textProperty}>Nome Completo</Text>
                                <TextInput style={styles.input}
                                    placeholder="Nome completo"
                                    autoCorrect={false}
                                    maxLength={80}
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                <Text style={styles.textProperty}>Data de Nascimento</Text>
                                <TextInput style={styles.input}
                                    placeholder="Data de nascimento"
                                    maxLength={10}
                                    autoCorrect={false}
                                    value={dataNascimento}
                                    onChangeText={setDataNascimento}
                                />
                                <Text style={styles.textProperty}>Celular</Text>
                                <TextInput style={styles.input}
                                    placeholder="Celular"
                                    autoCorrect={false}
                                    maxLength={20}
                                    value={celular}
                                    onChangeText={setCelular}
                                />
                                <Text style={styles.textProperty}>RG</Text>
                                <TextInput style={styles.input}
                                    placeholder="RG"
                                    autoCorrect={false}
                                    maxLength={20}
                                    value={rg}
                                    onChangeText={setRG}
                                />
                                <Text style={styles.textProperty}>Posição</Text>
                                <View >
                                    <Picker
                                        mode={'dropdown'}
                                        selectedValue={posicao}
                                        onValueChange={(itemValue, itemIndex) => setPosicao(itemValue)}
                                    >
                                        <Picker.Item label="DEFESA" value="DEFESA" />
                                        <Picker.Item label="MEIO" value="MEIO" />
                                        <Picker.Item label="ATAQUE" value="ATAQUE" />
                                    </Picker>
                                </View>


                                <View style={{ marginTop: 20 }}  >
                                    <TouchableOpacity style={{ width: 180 }} onPress={() => { navigation.navigate('AlterarSenha'); }}>
                                        <Text style={{ fontSize: 16, color: '#2196f3' }}>Alterar a minha senha</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>
                        </>
                    )
                }




            </View>
        </ScrollView>


    );
}





