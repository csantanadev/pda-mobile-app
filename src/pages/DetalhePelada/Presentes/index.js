import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function Presentes() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const cabecalho = () => {
        return (
            <>
                <View style={styles.Saldo}>
                    <Text style={styles.textPropertySecao}>Peladeiros presentes</Text>
                    <TouchableOpacity onPress={getdados}>
                        <Feather name="refresh-ccw" size={25} color={'#616161'} />
                    </TouchableOpacity>
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
                {
                    (item.votou == 'S') && (<Text style={styles.textEnviouVotacao}>ENVIOU VOTAÇÃO</Text>)
                }
            </View>
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
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={data.presenca_efetiva}
                                style={styles.Lista}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.pda_lpr_cod}
                                renderItem={renderItem}
                                ItemSeparatorComponent={RenderSeparatorCompleto}
                                ListHeaderComponent={cabecalho}
                            />
                        </>
                    )
                }
            </View>
        </View>
    );
}




