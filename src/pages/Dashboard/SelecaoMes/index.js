import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function SelecaoMes() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  // funcao que carrega dados do usuário
  async function getdados() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Dashboard/selecao_mes/');
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

  const renderItem = ({ item }, index) => {
    return (
      <View style={styles.itemLista}>
        <Text style={
          Number(item.mes) % 2 == 0 ?
            { backgroundColor: '#e0e0e0', color: 'black', paddingVertical: 2, paddingHorizontal: 2, borderRadius: 5 } :
            { backgroundColor: '#3949ab', color: 'white', paddingVertical: 2, paddingHorizontal: 2, borderRadius: 5 }
        }>{item.mesa}</Text>
        <Text style={[styles.textNome]}>{item.pda_jog_apelido}</Text>
        <Text style={[styles.textNome]}>{item.qtd_votos + ' votos'}</Text>
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
              <View style={styles.Saldo}>
                <TouchableOpacity onPress={getdados}>
                  <Feather name="refresh-ccw" size={25} color={'#616161'} />
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.mesa + item.pda_jog_apelido}
                renderItem={renderItem}
                ItemSeparatorComponent={RenderSeparatorCompleto}
              />
            </>
          )
        }
      </View>
    </View>
  );
}




