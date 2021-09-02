import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import RenderSeparator from '../../components/Separator'
import Search from '../../components/Search';
import api from '../../services/api';
import imgNotFound from '../../assets/imgNotFound.png';
import { baseUrlAvatar } from '../../utils';
import Loading from '../../components/Loading';
import { Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Peladeiros({ navigation, route }) {

  const [peladeiros, setPeladeiros] = useState([]);
  const [peladeirosAux, setPeladeirosAux] = useState([]);
  const [loading, setLoading] = useState(false);


  // funcao que carrega dados do usuário
  async function getPeladeiros() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Jogadores/getJogadoresPerfil/');
      setPeladeiros(response.data);
      setPeladeirosAux(response.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    };
  };


  const searchText = (texto) => {

    let text = texto.toLowerCase()
    let pel = peladeirosAux;

    let filteredName = pel.filter((item) => {
      return item.pda_jog_apelido.toLowerCase().match(text)
    })

    if (!text || text === '') {
      setPeladeiros(peladeirosAux);
    } else if (Array.isArray(filteredName)) {
      setPeladeiros(filteredName);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={styles.headerButons}>
            <View style={styles.headerButonsContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={getPeladeiros}>
                <View>
                  <Feather name="refresh-ccw" size={25} />
                </View>
                <View>
                  <Text style={styles.headerButonsText}>Atualizar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ),
    });
  }, []);


  // semelhante ao load da pagina  
  useEffect(() => {
    getPeladeiros();
  }, []);


  const renderItem = ({ item }, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetalhePeladeiro', { idPeladeiro: item.pda_jog_cod })}>

        <View style={styles.itemLista}>

          <Image style={styles.imgLista}
            source={item.pda_jog_url_avatar == null ? imgNotFound : { uri: baseUrlAvatar.urlAvatar + item.pda_jog_url_avatar }}
          />

          <View style={styles.containerLista} >
            <Text style={styles.textNomeBold}>{item.pda_jog_apelido}</Text>
            <Text style={styles.textNome}>{item.pda_jog_nome}</Text>
          </View>

          <View style={styles.containerListaFim} >
            {item.pda_jog_status == 'A' ?
              <Text style={{
                backgroundColor: '#43a047', color: 'white', borderRadius: 4,
                paddingVertical: 2, paddingHorizontal: 2, fontSize: 12
              }}>ATIVO</Text>
              : item.pda_jog_status == 'M' ?
                <Text style={{
                  backgroundColor: '#f44336', color: 'white', borderRadius: 4,
                  paddingVertical: 2, paddingHorizontal: 2, fontSize: 12
                }}>DM</Text> :
                <Text style={{
                  backgroundColor: '#9e9e9e', color: 'white', borderRadius: 4,
                  paddingVertical: 2, paddingHorizontal: 2, fontSize: 12
                }}>INATIVO</Text>
            }
            <Text style={styles.textProperty}>{item.pda_jog_posicao}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>

      {
        loading && <Loading />
      }

      {
        !loading && (
          <View style={styles.body}>
            <Text style={styles.textPropertySecao}>{peladeiros.length > 0 && peladeiros?.[0].qtd_ativos} Ativos</Text>
            <Search placeholder='Digite o apelido para filtrar' maxLength={36} onChange={searchText} ></Search>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={peladeiros}
              style={styles.Lista}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.pda_jog_cod}
              ItemSeparatorComponent={RenderSeparator}
              renderItem={renderItem}
            />
          </View>
        )
      }

    </View>

  );
}




