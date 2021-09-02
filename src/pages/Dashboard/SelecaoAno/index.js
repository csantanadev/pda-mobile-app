import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import RenderSeparatorCompleto from '../../../components/SeparatorCompleto'
import selecao_ano from '../../../assets/selecao_ano.png';

export default function SelecaoAno() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paramQtdJog, setParamQtdJog] = useState(6);


  // funcao que carrega dados do usuário
  async function getdados() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const responseParam = await api.get('Peladas/getQtdJogadores/');
      setParamQtdJog(responseParam.data.valor);

      const response = await api.get('ScoutsPelada/listaMelhoresAno');
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

        <Text style={styles.textNome}>
          {index + 1 + ' - ' + item.pda_jog_apelido}
        </Text>

        <View style={{ flexDirection: 'row' }} >
          <View style={{ width: 100, justifyContent: 'center' }}>
            {index <= paramQtdJog - 1 ? <Image style={styles.img} source={selecao_ano} resizeMode={'contain'} /> : null}
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Text style={[styles.textNome, { paddingVertical: 5 }]}>{item.qtd_votos + ' votos'}</Text>
            <Text style={{ fontSize: 12, color: '#616161' }}>{'Frequência: ' + item.frequencia + '%'}</Text>
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
                <TouchableOpacity onPress={getdados}>
                  <Feather name="refresh-ccw" size={25} color={'#616161'} />
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_jog_cod_escolhido}
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




