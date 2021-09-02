import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function Scouts() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const cabecalho = () => {
    return (
      <>
        <View style={styles.Saldo}>
          <Text style={styles.textPropertySecao}>Gols da Pelada</Text>
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

  const renderItemGol = ({ item, index }) => {
    return (
      <View style={styles.itemLista}>
        <Text style={[styles.textNome,]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
        <Text style={[styles.textNome,]}>{item.pda_fjg_gol}  {item.pda_fjg_gol == 1 ? ' Gol' : ' Gols'}</Text>
      </View>
    );
  };
  const renderItemAm = ({ item, index }) => {
    return (
      <View style={styles.itemLista}>
        <Text style={[styles.textNome,]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
        <Text style={[styles.textNome, { paddingRight: 35 }]}>{item.pda_fjg_amarelo}</Text>
      </View>
    );
  };
  const renderItemAz = ({ item, index }) => {
    return (
      <View style={styles.itemLista}>
        <Text style={[styles.textNome,]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
        <Text style={[styles.textNome, { paddingRight: 35 }]}>{item.pda_fjg_azul}</Text>
      </View>
    );
  };
  const renderItemVm = ({ item, index }) => {
    return (
      <View style={styles.itemLista}>
        <Text style={[styles.textNome,]}>{index + 1 + ' - ' + item.pda_jog_apelido}</Text>
        <Text style={[styles.textNome, { paddingRight: 35 }]}>{item.pda_fjg_vermelho}</Text>
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
                data={data.gols}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_fjg_cod}
                renderItem={renderItemGol}
                ItemSeparatorComponent={RenderSeparatorCompleto}
                ListHeaderComponent={cabecalho}
                ListFooterComponent={() => (
                  <>
                    {
                      data.amarelo &&
                      data.amarelo.length > 0 && (
                        <>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textPropertySecao}></Text>
                            <Text style={styles.textPropertySecao}>Cartões Amarelo  </Text>
                            <View style={{ backgroundColor: '#ffd600', borderColor: '#000', borderWidth: 0.5 }}><Text>    </Text></View>
                          </View>
                        </>
                      )
                    }
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={data.amarelo}
                      style={styles.Lista}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.pda_fjg_cod}
                      ItemSeparatorComponent={RenderSeparatorCompleto}
                      renderItem={renderItemAm}
                      ListFooterComponent={() => (
                        <>
                          {
                            data.azul &&
                            data.azul.length > 0 && (
                              <>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={styles.textPropertySecao}></Text>
                                  <Text style={styles.textPropertySecao}>Cartões Azul  </Text>
                                  <View style={{ backgroundColor: '#3f51b5', borderColor: '#000', borderWidth: 0.5 }}><Text>    </Text></View>
                                </View>
                              </>
                            )
                          }
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data.azul}
                            style={styles.Lista}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.pda_fjg_cod}
                            ItemSeparatorComponent={RenderSeparatorCompleto}
                            renderItem={renderItemAz}
                            ListFooterComponent={() => (
                              <>
                                {
                                  data.vermelho &&
                                  data.vermelho.length > 0 && (
                                    <>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.textPropertySecao}></Text>
                                        <Text style={styles.textPropertySecao}>Cartões Vermelho  </Text>
                                        <View style={{ backgroundColor: '#d50000', borderColor: '#000', borderWidth: 0.5 }}><Text>    </Text></View>
                                      </View>
                                    </>
                                  )
                                }
                                <FlatList
                                  showsVerticalScrollIndicator={false}
                                  data={data.vermelho}
                                  style={styles.Lista}
                                  showsHorizontalScrollIndicator={false}
                                  keyExtractor={item => item.pda_fjg_cod}
                                  ItemSeparatorComponent={RenderSeparatorCompleto}
                                  renderItem={renderItemVm}
                                />
                              </>
                            )}
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




