import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Picker } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import calendario from '../../assets/calendario.png';
import Loading from '../../components/Loading';
import api from '../../services/api';
import { BotaoMini, BotaoGrande } from '../../components/Botao';
import { UserContext } from '../../contexts/UserContext';


export default function Peladas({ navigation, route }) {

  const [peladas, setPeladas] = useState([]);  
  const [periodos, setPeriodos] = useState([]);  
  const [selectedValue, setSelectedValue] = useState('00');
  const [loading, setLoading] = useState(false);

  // objeto usuario provido pelo contexto
  const user = useContext(UserContext);

  // goBack com ação 
  useEffect(() => {
    if (route.params?.atualizarPage) {
      handlePesquisa();
    }
  }, [route.params]);


  // load da pagina
  useEffect(() => {
    getPeriodos()
  }, []);


  // efeito para quando setar um período
  useEffect(() => {
    if (selectedValue != '00') {
      handlePesquisa();
    }
  }, [selectedValue]);

  // botao atualizar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={styles.headerButons}>
            <View style={styles.headerButonsContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={
                    ()=> {
                      getPeriodos()
                      handlePesquisa()
                    }}>
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
  }, [selectedValue]);


  async function ConfirmarPresenca(idPelada, opcao) {

    setLoading(true);

    const data = {
      codigo: user.pda_jog_cod,
      cod_pelada: idPelada,
      opcao: opcao
    }
    const res = await api.post('Peladas/confirmarPresenca/', data);

    handlePesquisa();
  }

  async function getPeriodos() {
    try {
      const response = await api.get('Peladas/getPeriodo/');
      setPeriodos(response.data);
    }
    catch (e) {
      setLoading(false);
    };
  }

  async function handlePesquisa() {
    try {
      setLoading(true);
      const response = await api.get('Peladas/getPeladasMobile/' + user.pda_jog_cod + '/' + selectedValue);
      setPeladas(response.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    };
  }

  const renderItem = ({ item }, index) => {
    return (
      <>
        <TouchableOpacity onPress={() => {
          navigation.navigate('DetalhePelada', {
            screen: 'Confirmacao',
            params: { idPelada: item.pda_pel_cod },
          });
        }}>

          <View style={{ flexDirection: 'column' }}>

            <View style={styles.itemLista}>

              <Image style={styles.imgLista} source={calendario} />

              <View style={styles.containerLista} >
                <Text style={styles.textApelido}>{item.pda_pel_data}</Text>
                <Text style={
                  item.pda_ppr_flg_status == 'S' ? { fontSize: 15, fontWeight: 'bold', color: 'green' } :
                    item.pda_ppr_flg_status == 'N' ? { fontSize: 15, fontWeight: 'bold', color: 'red' } :
                      { fontSize: 15, fontWeight: 'bold', color: 'blue' }
                }>
                  {
                    item.pda_ppr_flg_status == 'S' ? 'Eu vou' : item.pda_ppr_flg_status == 'N' ? 'Não vou' : item.pda_ppr_flg_status == 'T' ? 'Talvez' : ''
                  }
                </Text>
              </View>

              <View style={styles.containerListaFim} >

                <Text style={styles.textApelido}></Text>
                {
                  item.pda_pel_status == 'A' ?
                    (<Text style={styles.textAberta}>ABERTA</Text>) :
                    item.pda_pel_status == 'V' ?
                      (<Text style={styles.textVotacao}>EM VOTAÇÃO</Text>) :
                      (<Text style={styles.textFechada}>FECHADA</Text>)
                }
              </View>
            </View>
          </View>
        </TouchableOpacity >

        {
          item.pda_pel_status != 'F' && (
            <View style={[styles.painelAcoes, { marginVertical: 25 }]}>

              {item.pda_pel_status == 'A' && (
                <>
                  <BotaoMini tipo={'success'} texto={'Eu Vou'}
                    icon={'thumbs-up'} onClick={() => { ConfirmarPresenca(item.pda_pel_cod, 'S') }} />
                  <BotaoMini tipo={'danger'} texto={'Não Vou'}
                    icon={'thumbs-down'} onClick={() => { ConfirmarPresenca(item.pda_pel_cod, 'N') }} />
                  <BotaoMini tipo={'primary'} texto={'Talvez'}
                    icon={'help-circle'} onClick={() => { ConfirmarPresenca(item.pda_pel_cod, 'T') }} />
                </>)
              }

              {item.pda_pel_status == 'V' && item.esteve_presente == 'S' && (

                item.ja_votou == 'S' ? <Text style={{ color: 'green', marginLeft: 62 }}>Já enviei minha votação.</Text> :
                  <BotaoGrande tipo={'warning'} texto={'Clique aqui para votar'}
                    icon={'award'} onClick={() => {
                      navigation.navigate('Votacao', { idPelada: item.pda_pel_cod });
                    }} />

              )}

              {item.pda_pel_status == 'V' && item.esteve_presente == 'N' && (
                <Text style={{ color: 'red', marginLeft: 13 }}>Você não pode votar. Você faltou neste dia.</Text>
              )}
            </View>
          )
        }
      </>

    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.body}>

        <Text style={styles.textProperty}>Selecione um mês</Text>
        <View>
          <Picker
            mode={'dropdown'}
            onValueChange={(item, index) => { setSelectedValue(item) }}
            selectedValue={selectedValue}
          >
            <Picker.Item label="Selecione" value="00" />
            {
              periodos.map((periodo)=> {
                return( 
                  <Picker.Item key={periodo.mes}  label={periodo.mes_str+periodo.ano} value={periodo.mes} />
                )
              })
            }            
          </Picker>
        </View>
      </View>


      <View style={styles.body}>

        {
          loading && <Loading />
        }

        {
          !loading && (selectedValue != '00') && (

            <>
              {
                peladas?.length == 0 && (
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                    <Text style={[styles.textProperty, { fontSize: 16 }]}>Não há registros!</Text>
                  </View>
                )
              }


              <FlatList
                showsVerticalScrollIndicator={false}
                data={peladas}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pda_pel_cod}
                //ItemSeparatorComponent={RenderSeparator}
                renderItem={renderItem}
              />
            </>
          )
        }

      </View>
    </View>

  );
}




