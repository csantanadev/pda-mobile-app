import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Loading from '../../components/Loading';
import api from '../../services/api';
import RenderSeparatorCompleto from '../../components/SeparatorCompleto';
import { Feather } from '@expo/vector-icons';

import { UserContext } from '../../contexts/UserContext';

export default function Votacao({ navigation, route }) {

    const [idPelada,] = useState(route.params.idPelada)
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paramQtdJog, setParamQtdJog] = useState(6);

    // objeto usuario provido pelo contexto
    const user = useContext(UserContext);

    // semelhante ao load da pagina  
    useEffect(() => {
        getLista();
    }, []);

    // funcao que carrega dados do usuário
    async function getLista() {

        const data = {
            codigo: user.pda_jog_cod,
            cod_pelada: idPelada
        }

        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const responseParam = await api.get('Peladas/getQtdJogadores/');
            setParamQtdJog(responseParam.data.valor);

            const response = await api.post('Peladas/getJogadoresVotacao/', data);

            // trazendo todos para não selecionado
           /* response.data = response.data.map(item => {
                item.selecionado = false;
                return item;
            });*/

            setLista(response.data);
            setLoading(false);
        }
        catch (e) {
            setLoading(false);
        };
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <View style={styles.headerButons}>
                        <View style={styles.headerButonsContainer}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={EnviarVotacao}>
                                <View>
                                    <Feather name="send" size={25} color={'green'} />
                                </View>
                                <View>
                                    <Text style={styles.headerButonsText}>Enviar Votação</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>)
        });
    }, [lista]); // o método enviar só observou o esatdo atualizado depoiis que eu coloquei o estado no array de observer



    function EnviarVotacao() {

        let filteredName = lista.filter((item) => {
            return (item.selecionado == true)
        })

        if (filteredName.length === 0) {
            setLoading(false);
            Alert.alert(
                "Atenção",
                "Selecione pelo menos 1 peladeiro.",
                [
                    { text: "OK" }
                ]
            );
            return
        }

        if (filteredName.length > paramQtdJog) {
            setLoading(false);
            Alert.alert(
                "Atenção",
                `Selecione no máximo ${paramQtdJog} peladeiros.`,
                [
                    { text: "OK" }
                ]
            );
            return
        }

        Alert.alert(
            "Confirmação",
            "Confirma a votação escolhida ?",
            [
                {
                    text: "SIM", onPress: async () => {

                        setLoading(true);

                        // verificar se pode votar
                        try {
                            const response = await api.get('Peladas/podeVotar/' + idPelada + '/' + user.pda_jog_cod);

                            const { pda_pel_status, ja_votou } = response.data;


                            if (pda_pel_status == 'F') {
                                setLoading(false);

                                Alert.alert(
                                    "Desculpe",
                                    `Você não enviou a votação antes do prazo de encerramento.
                                \nFique atento ao prazo nas próximas votações.`,
                                    [
                                        { text: "OK", onPress: () => { navigation.navigate('Peladas', { atualizarPage: true }) } }
                                    ]
                                );
                            }
                            else if (ja_votou == 'S') {
                                setLoading(false);

                                Alert.alert(
                                    "Desculpe",
                                    "Você já enviou a sua votação.",
                                    [
                                        { text: "OK", onPress: () => { navigation.navigate('Peladas', { atualizarPage: true }) } }
                                    ]
                                );
                            }
                            else {

                                const data = {
                                    codigo: user.pda_jog_cod,
                                    cod_pelada: idPelada,
                                    escolhidos: filteredName
                                }

                                const responseEnvio = await api.post('Peladas/enviarVotacao', data);
                                setLoading(false);

                                Alert.alert(
                                    "Sucesso",
                                    "Votação enviada com sucesso.",
                                    [
                                        { text: "OK", onPress: () => { navigation.navigate('Peladas', { atualizarPage: true }) } }
                                    ]
                                );
                            }

                        }
                        catch (e) {
                            setLoading(false);
                        };
                    }
                },
                { text: "NÃO", onPress: () => { return } }
            ]
        );

    }


    function selectItem(pda_jog_cod) {

        /* 
        solucao 1 - clonando o array e setando o estado direto 

        item.selecionado = !item.selecionado
        lista[index] = item
        const newLista = Array.from(lista)
        setLista(newLista);
        */


       /* solucao 2 - com map */

       const newLista = lista.map(pel => {
            return pel.pda_jog_cod === pda_jog_cod ? { ...pel, selecionado: !pel.selecionado } : pel
        });

        setLista(newLista);  
    }


    const renderItem = ({ item, index }) => {
       
        return (
            <TouchableOpacity onPress={() => { selectItem(item.pda_jog_cod) }}>
                <View style={item.selecionado && styles.StySelecionado}   >
                    <View style={styles.itemLista}>
                        <Text style={[styles.textNome,]}>{item.pda_jog_apelido}</Text>
                        <Text style={[styles.textNome]}>{item.pda_jog_posicao}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (

        <View style={styles.container}>

            <View style={styles.body}>

                {
                    loading && <Loading /> 
                }

                {
                    !loading && (
                        <>
                            <Text style={{
                                fontSize: 15, fontWeight: 'bold',
                                color: '#bdbdbd'
                            }}>Escolha no máximo {paramQtdJog} Jogadores</Text>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={lista}
                                style={styles.Lista}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.pda_jog_cod}
                                ItemSeparatorComponent={RenderSeparatorCompleto}
                                renderItem={renderItem}
                            />
                        </>
                    )
                }

            </View>
        </View>

    );
}




