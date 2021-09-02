import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import { FormataMoeda } from '../../../utils/';


export default function Financas() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  // funcao que carrega dados do usuário
  async function getdados() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Dashboard/financeiro/');
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
        <View style={styles.card} >
          <Text style={styles.textCard}>{item.mes_str + ' - ' + item.pda_lan_ano}</Text>
          <View style={styles.cardItem}>
            <Text style={[styles.textCard, { color: '#4caf50' }]}>{'Receita'}</Text>
            <Text style={styles.textCard}>{FormataMoeda(item.receita)}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={[styles.textCard, { color: '#f44336' }]}>{'Despesa'}</Text>
            <Text style={styles.textCard}>{FormataMoeda(item.despesa)}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={[styles.textCard, { color: '#5c6bc0' }]}>{'Saldo'}</Text>
            <Text style={styles.textCard}>{FormataMoeda(item.saldo_mes)}</Text>
          </View>
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
                <Text style={styles.textPropertySecao}>Saldo Oficial: {data && data.length > 0 && (FormataMoeda(data[0].saldo_geral))}   </Text>
                <TouchableOpacity onPress={getdados}>
                  <Feather name="refresh-ccw" size={25} color={'#616161'} />
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_lan_mes}
                renderItem={renderItem}
              />
            </>
          )
        }
      </View>
    </View>
  );
}




