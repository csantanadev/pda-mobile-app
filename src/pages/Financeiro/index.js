import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Picker, Alert } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import RenderSeparator from '../../components/Separator'
import receita from '../../assets/receita.png';
import despesa from '../../assets/despesa.png';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import api from '../../services/api';
import { FormataMoeda } from '../../utils/';


export default function Financeiro({ navigation }) {

  const [lancamentos, setLancamentos] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [lancamentosAux, setLancamentosAux] = useState([]);
  const [selectedValue, setSelectedValue] = useState('00');
  const [selectedTipo, setSelectedTipo] = useState('T');
  const [loading, setLoading] = useState(false);


  const searchText = (texto) => {

    let text = texto.toLowerCase()
    let lan = lancamentosAux;

    let filteredName = lan.filter((item) => {
      return (item.pda_jog_apelido && item.pda_jog_apelido.toLowerCase().match(text)) ||
        item.pda_tlc_descricao && item.pda_tlc_descricao.toLowerCase().match(text)
    })

    if (!text || text === '') {
      setLancamentos(lancamentosAux);
    } else if (Array.isArray(filteredName)) {
      setLancamentos(filteredName);
    }
  }

  useEffect(() => {

    if ((selectedValue != '00') && (selectedTipo != null)) {
      handlePesquisa();
    }


  }, [selectedValue, selectedTipo]);

  // load da pagina
  useEffect(() => {
    getPeriodos()
  }, []);


  // botao atualizar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={styles.headerButons}>
            <View style={styles.headerButonsContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={
                  () => {
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
  }, [selectedValue, selectedTipo]);



  async function getPeriodos() {
    try {
      const response = await api.get('Financeiro/getPeriodo/');
      setPeriodos(response.data);
    }
    catch (e) {
      setLoading(false);
    };
  }

  function ExibirDetalhes(item) {
    Alert.alert(
      "Dados do Lançamento",
      `\nLançamento: ${item.pda_tlc_descricao} 
      \nData da Ocorrência: ${item.pda_lan_data_ocorrencia} 
      \nValor: ${FormataMoeda(item.pda_lan_valor)} 
      \nData Pagamento: ${item.pda_lan_data_pagamento == null ? '' : item.pda_lan_data_pagamento} 
      \nValor Pagamento: ${FormataMoeda(item.pda_lan_valor_pago)} 
      \nObservação: ${ item.pda_lan_obs == null ? '' : item.pda_lan_obs} 
      `,
      [
        { text: "OK", onPress: () => { } }
      ]
    );
  }

  async function handlePesquisa() {

    /* if (loading) {
       return;
     }*/

    try {
      setLoading(true);
      setLancamentos([]);
      setLancamentosAux([]);
      const response = await api.get('Financeiro/getLancamentosMobile/' + selectedValue + '/' + selectedTipo);
      setLancamentos(response.data);
      setLancamentosAux(response.data);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    };
  }


  const renderItem = ({ item }, index) => {
    return (
      <TouchableOpacity onPress={() => { ExibirDetalhes(item) }}>

        <View style={styles.itemLista}>

          <Image style={styles.imgLista} source={item.pda_lan_operacao == 'P' ? receita : despesa} />

          <View style={styles.containerLista} >
            <Text style={styles.textApelido}>{item.pda_tlc_descricao}</Text>
            <Text style={styles.textProperty}>{item.pda_lan_operacao == 'P' ?
              item.pda_jog_apelido :
              FormataMoeda(item.pda_lan_valor)}</Text>
          </View>

          <View style={styles.containerLista} >
            {
              item.pda_lan_operacao == 'P' ?
                <Text style={styles.textApelido}>{FormataMoeda(item.pda_lan_valor)}</Text> :
                <Text style={styles.textApelido}></Text>
            }
            {
              item.pda_lan_operacao == 'P' ?
                <Text style={styles.textProperty}>{item.pda_lan_data_pagamento}</Text> :
                <Text style={styles.textApelido}></Text>
            }
          </View>

          <View style={styles.containerListaFim} >

            {
              item.pda_lan_operacao == 'D' ?
                <Text style={styles.textProperty}>{item.pda_lan_data_pagamento}</Text> :
                <Text style={styles.textApelido}></Text>
            }

            {
              item.str_status == 'PAGO' ?
                (<Text style={styles.textPG}>PG</Text>) :
                item.str_status == 'ABERTO' ?
                  (<Text style={styles.textAberto}>ABERTO</Text>) :
                  (<Text style={styles.textParcial}>PARCIAL</Text>)
            }
          </View>

        </View>
      </TouchableOpacity >
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.body}>

        <Text style={styles.textProperty}>Selecione um mês</Text>
        <View>
          <Picker
            mode={'dropdown'}
            onValueChange={(item, index) => {
              setLoading(true);
              setSelectedValue(item);
            }
            }
            selectedValue={selectedValue}
          >
            <Picker.Item label="Selecione" value="00" />
            {
              periodos.map((periodo) => {
                return (
                  <Picker.Item key={periodo.mes} label={periodo.mes_str + periodo.ano} value={periodo.mes} />
                )
              })
            }
          </Picker>
        </View>
      </View>

      {

        (selectedValue) && (selectedValue != '00') && (

          <View style={styles.body}>

            <View style={styles.buttonsSearch}>
              <TouchableOpacity onPress={
                () => {
                  setLoading(true);
                  setSelectedTipo('T');
                }
              } >

                <Text style={
                  selectedTipo == 'T' ?
                    styles.textbuttonsSearchSelecionado : styles.textbuttonsSearch
                }>Todos</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={
                () => {
                  setLoading(true);
                  setSelectedTipo('P');
                }
              }>

                <Text style={selectedTipo == 'P' ?
                  styles.textbuttonsSearchSelecionado : styles.textbuttonsSearch
                }>Receitas</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={
                () => {
                  setLoading(true);
                  setSelectedTipo('D');
                }
              }>
                <Text style={selectedTipo == 'D' ?
                  styles.textbuttonsSearchSelecionado : styles.textbuttonsSearch
                }>Despesas</Text>
              </TouchableOpacity>
            </View>
            <Search placeholder='Digite algo para filtrar' maxLength={36} onChange={searchText} ></Search>
          </View>
        )
      }


      <View style={styles.body}>

        {
          loading && <Loading />
        }

        {
          !loading && (selectedValue != '00') && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={lancamentos}
              style={styles.Lista}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.pda_lan_cod}
              ItemSeparatorComponent={RenderSeparator}
              renderItem={renderItem}
            />
          )
        }

        {
          !loading && (selectedValue != '00') && (lancamentos?.length == 0) && (
            <Text style={{
              alignItems: 'center', fontSize: 16, marginLeft: '30%',
              color: '#616161'
            }}>Não há registros!</Text>
          )
        }

      </View>
    </View>

  );
}




