import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import { FormataMoeda } from '../../../utils/';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function DividaAtiva({ navigation }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  // funcao que carrega dados do usuário
  async function getdados() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Dashboard/divida_ativa/');
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
        <Text style={[styles.textNome, { flexGrow: 1 }]}>{item.pda_jog_apelido}</Text>
        <Text style={item.divida_ativa > 0 ? styles.textDivida : styles.textNormal}>{FormataMoeda(item.divida_ativa)}</Text>
        <TouchableOpacity style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('DetalhePeladeiro', { idPeladeiro: item.pda_jog_cod })} >
          <Feather name="search" size={25} color={'#616161'} />
        </TouchableOpacity>
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
                <Text style={styles.textPropertySecao}>Dívida Ativa Total: {data && data.length > 0 && (FormataMoeda(data[0].total))}   </Text>
                <TouchableOpacity onPress={getdados}>
                  <Feather name="refresh-ccw" size={25} color={'#616161'} />
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_jog_cod}
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




