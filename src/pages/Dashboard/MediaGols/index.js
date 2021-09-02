import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'

export default function MediaGols() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // funcao que carrega dados do usuário
  async function getdados() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Dashboard/media_gols');
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
        <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.textNome, { paddingVertical: 5 }]}>{item.gols + ' gols em '}</Text>
            <Text style={[styles.textNome,]}>{item.qtd + ' jogos'}</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#616161' }}>{'Média: ' + item.media_gols}</Text>
        </View>
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




