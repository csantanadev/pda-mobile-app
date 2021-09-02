import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Perfil from '../../components/Perfil';
import Loading from '../../components/Loading';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function Home({ navigation, route }) {

  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(false);


  // funcao logout provida pelo contexto
  const { logout } = useContext(AuthContext);

  // objeto usuario provido pelo contexto
  const user = useContext(UserContext);


  // goBack de Editar perfil com atualização
  useEffect(() => {
    if (route.params?.atualizouPerfil) {
      getPerfil();
    }
  }, [route.params]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={styles.headerButons}>

            <View style={styles.headerButonsContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={getPerfil}>
                <View>
                  <Feather name="refresh-ccw" size={25} />
                </View>
                <View>
                  <Text style={styles.headerButonsText}>Atualizar</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.headerButonsContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { logout() }}>
                <View>
                  <Feather name="log-out" size={25} />
                </View>
                <View>
                  <Text style={styles.headerButonsText}>Sair</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ),
    });
  }, [navigation, logout]);


  // semelhante ao load da pagina  
  useEffect(() => {
    getPerfil();
  }, [user]);


  // funcao que carrega dados do usuário
  async function getPerfil() {

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('Jogadores/getPerfil/' + user.pda_jog_cod);
      setPerfil(response.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    };
  };


  return (
    <View style={styles.container}>

      {
        loading && <Loading />
      }

      {
        !loading && (

          <Perfil navigation={navigation} perfil={perfil} editPerfil={true} />

        )
      }

    </View>

  );
}



