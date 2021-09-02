import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Perfil from '../../components/Perfil';
import Loading from '../../components/Loading';

import api from '../../services/api';

export default function DetalhePeladeiro({ navigation, route }) {


  const { idPeladeiro } = route.params;
  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorNetwork, seterrorNetwork] = useState(false);


  // semelhante ao load da pagina  
  useEffect(() => {
    getPerfil();
  }, []);

  // usado para refresh no scrollview    
  const onRefresh = useCallback(() => {
    getPerfil();
  }, []);

  // funcao que carrega dados do usuário
  async function getPerfil() {

    if (loading) {
      return;
    }

    try {
      seterrorNetwork(false);
      setLoading(true);
      const response = await api.get('Jogadores/getPerfil/' + idPeladeiro);
      setPerfil(response.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
      seterrorNetwork(true);
    };
  };


  return (
    <View style={styles.container}>

        {
          loading && <Loading />
        }

        {
          errorNetwork && <ErrorNetwork onclick={getPerfil} />
        }

        {
          !loading && !errorNetwork && (
            <Perfil navigation={navigation} route={route} perfil={perfil} editPerfil={false} />
          )
        }
    </View>

  );
}



