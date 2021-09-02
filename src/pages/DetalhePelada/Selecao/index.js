import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage, Modal } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'
import { BotaoPequeno } from '../../../components/Botao';

import { UserContext } from '../../../contexts/UserContext';

export default function Selecao() {

    const [data, setData] = useState([]);
    const [listaCompleta, setListaCompleta] = useState([]);
    const [meusVotos, setMeusVotos] = useState([]);
    const [modalMeusVotos, setModalMeusVotos] = useState(false);
    const [modalResultadoComp, setResultadoComp] = useState(false);
    const [loading, setLoading] = useState(true);

    // objeto usuario provido pelo contexto
    const user = useContext(UserContext);


    const cabecalho = () => {
        return (
            <>
                <View style={styles.Saldo}>
                    <Text style={styles.textPropertySecao}>Seleção da Rodada</Text>
                    <TouchableOpacity onPress={getdados}>
                        <Feather name="refresh-ccw" size={25} color={'#616161'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.Saldo, { marginVertical: 25 }]}>
                    <BotaoPequeno tipo={'primary'} texto={'Meus Votos'} icon={'star'} onClick={() => { setModalMeusVotos(true) }} />
                    <BotaoPequeno tipo={'primary'} texto={'Apuração'} icon={'bar-chart'} onClick={() => { setResultadoComp(true) }} />
                </View>
            </>
        );
    }

    // funcao que carrega dados do usuário
    async function getdados() {

        const idPelada = await AsyncStorage.getItem('idPelada');

        try {
            setLoading(true);

            const response = await api.get('ScoutsPelada/getScoutsPelada/' + idPelada);
            setData(response.data);

            const responseLista = await api.get('ScoutsPelada/listaVotacaoCompleta/' + idPelada);
            setListaCompleta(responseLista.data);

            const responseMeuVoto = await api.get('ScoutsPelada/meusVotos/' + idPelada + '/' + user.pda_jog_cod);
            setMeusVotos(responseMeuVoto.data);

            setLoading(false);
        }
        catch (e) {
            setLoading(false);
        };
    };

    // semelhante ao load da pagina  
    useEffect(() => {
        getdados();
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemLista}>
                <Text style={[styles.textNome,]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
                <Text style={[styles.textNome,]}>{item.qtd_votos}  {item.qtd_votos == 1 ? ' Voto' : ' Votos'}</Text>
            </View>
        );
    };

    const renderItemMeusVotos = ({ item, index }) => {
        return (
            <View style={styles.itemLista}>
                <Text style={[styles.textNome, { flexGrow: 1 }]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
            </View>
        );
    };

    const renderItemCompleto = ({ item, index }) => {
        return (
            <View style={styles.itemLista}>
                <Text style={[styles.textNome, { flexGrow: 1 }]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
                <Text style={[styles.textNome, { marginRight: 35 }]}>{item.qtd_votos} {item.qtd_votos == 1 ? ' Voto' : ' Votos'}</Text>
                <Text style={[styles.textNome,]}>{item.frequencia + ' %'}</Text>
            </View>
        );
    };




    return (
        <View style={styles.container}>

            <View style={styles.body}>


                <Modal animationType="slide" transparent={false} visible={modalMeusVotos}>
                    <View style={styles.containerModal}>
                        <View style={styles.modalView}>
                            <Text style={[styles.textPropertySecao], { fontSize: 25 }}>Meus Votos</Text>
                            <TouchableOpacity onPress={() => {
                                setModalMeusVotos(!modalMeusVotos);
                            }}>
                                <Feather name="x" size={35} color={'#616161'} />
                            </TouchableOpacity>
                        </View>
                        {
                            meusVotos.length == 0 && (
                                <Text style={{
                                    fontSize: 20, color: '#3949ab',
                                    marginTop: 50
                                }}>Você não recebeu votos nesta pelada.</Text>
                            )
                        }
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={meusVotos}
                            style={styles.Lista}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.pda_jog_apelido}
                            renderItem={renderItemMeusVotos}
                            ItemSeparatorComponent={RenderSeparatorCompleto}
                        />
                    </View>
                </Modal>


                <Modal animationType="slide" transparent={false} visible={modalResultadoComp}>
                    <View style={styles.containerModal}>
                        <View style={styles.modalView}>
                            <Text style={[styles.textPropertySecao], { fontSize: 25 }}>Resultado Completo</Text>
                            <TouchableOpacity onPress={() => {
                                setResultadoComp(!modalResultadoComp);
                            }}>
                                <Feather name="x" size={35} color={'#616161'} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={listaCompleta}
                            style={styles.Lista}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.pda_jog_apelido}
                            renderItem={renderItemCompleto}
                            ItemSeparatorComponent={RenderSeparatorCompleto}
                        />
                    </View>
                </Modal>


                {
                    loading && <Loading />
                }

                {
                    !loading && (
                        <>
                            {data.status_pelada === "F" &&
                                (<FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={data.selecao}
                                    style={styles.Lista}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.pda_jog_cod_escolhido}
                                    renderItem={renderItem}
                                    ItemSeparatorComponent={RenderSeparatorCompleto}
                                    ListHeaderComponent={cabecalho}
                                />)
                            }

                            {data.status_pelada != "F" &&
                                <Text style={
                                    {fontSize: 20, marginTop: 25}
                                }>O resultado da votação só será exibido após fechamento da pelada !</Text>
                            }
                        </>
                    )
                }
            </View>
        </View>
    );
}




