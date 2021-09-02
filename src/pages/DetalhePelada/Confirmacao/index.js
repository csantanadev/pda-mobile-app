import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function Confirmacao({ route }) {

  const { idPelada } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const cabecalho = () => {
    return (
      <>
        <View style={styles.Saldo}>
          <Text style={styles.textPropertySecao}>Confirmaram presença</Text>
          <TouchableOpacity onPress={getdados}>
            <Feather name="refresh-ccw" size={25} color={'#616161'} />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  // funcao que carrega dados do usuário
  async function getdados() {

    await AsyncStorage.setItem('idPelada', idPelada);

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
                data={data.possivel_presenca_sim}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_ppr_cod}
                renderItem={renderItem}
                ItemSeparatorComponent={RenderSeparatorCompleto}
                ListHeaderComponent={cabecalho}
                ListFooterComponent={() => (
                  <>
                    {
                      data.possivel_presenca_nao &&
                      data.possivel_presenca_nao.length > 0 && (
                        <>
                          <Text style={styles.textPropertySecao}></Text>
                          <Text style={styles.textPropertySecao}>Não Vão comparecer</Text>
                        </>
                      )
                    }
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={data.possivel_presenca_nao}
                      style={styles.Lista}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.pda_ppr_cod}
                      ItemSeparatorComponent={RenderSeparatorCompleto}
                      renderItem={renderItem}
                      ListFooterComponent={() => (
                        <>
                          {
                            data.possivel_presenca_talvez &&
                            data.possivel_presenca_talvez.length > 0 && (
                              <>
                                <Text style={styles.textPropertySecao}></Text>
                                <Text style={styles.textPropertySecao}>Talvez compareça</Text>
                              </>
                            )
                          }
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data.possivel_presenca_talvez}
                            style={styles.Lista}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.pda_ppr_cod}
                            ItemSeparatorComponent={RenderSeparatorCompleto}
                            renderItem={renderItem}
                          />
                        </>
                      )}
                    />
                  </>
                )}
              />
            </>
          )
        }
      </View>
    </View>
  );
}




