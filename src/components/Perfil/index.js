import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';

import imgCheck from '../../assets/imgcheck.png';
import imgAberto from '../../assets/imgaberto.png';
import imgparcial from '../../assets/imgparcial.png';
import imgNotFound from '../../assets/imgNotFound.png';

import { BotaoPequeno } from '../../components/Botao';
import RenderSeparator from '../../components/Separator'

import { FormataMoeda } from '../../utils/';
import { baseUrlAvatar } from '../../utils';

export default function Perfil({ navigation, perfil, editPerfil }) {

    //console.log(baseUrlAvatar.urlAvatar + perfil.pda_jog_url_avatar)

    const cabecalho = () => {
        return (
            <>
                < View style={styles.containerTop}>
                    <Image style={styles.imgAvatar}
                        source={
                            perfil.pda_jog_url_avatar == null ?
                                imgNotFound :
                                {
                                    uri: baseUrlAvatar.urlAvatar + perfil.pda_jog_url_avatar,
                                    cache: 'reload',
                                }
                                
                        }
                    />
                    <View style={styles.containerTopScore}>
                        <Text style={styles.textScore}>{perfil.gols}</Text>
                        <Text style={styles.textScoreLabel}>Gols</Text>
                    </View>
                    <View style={styles.containerTopScore}>
                        <Text style={styles.textScore}>{perfil.qtd_votos}</Text>
                        <Text style={styles.textScoreLabel}>Votos no ano</Text>
                    </View>
                    <View style={styles.containerTopScore}>
                        <Text style={styles.textScore}>{perfil.perc_frequencia}</Text>
                        <Text style={styles.textScoreLabel}>% de Frequência</Text>
                    </View>
                </View>
                <View style={styles.bodyTop}>
                    <Text style={styles.textNormal}>{perfil.pda_jog_apelido}</Text>
                    {
                        (perfil.pda_jog_status) && (perfil.pda_jog_status == 'M') && (
                            <Text style={styles.textAtivo}>DM</Text>
                        )
                    }
                    {
                        (editPerfil) && (
                            <BotaoPequeno tipo={'primary'} texto={'Editar'}
                                icon={'edit'} onClick={() => { navigation.navigate('EditarPerfil', { perfil }); }} />

                        )
                    }
                </View>

                <Text style={styles.textProperty}>Nome Completo</Text>
                <Text>{perfil.pda_jog_nome}</Text>

                <View style={styles.containerBody}>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Posição</Text>
                        <Text>{perfil.pda_jog_posicao}</Text>
                    </View>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Celular</Text>
                        <Text>{perfil.pda_jog_celular}</Text>
                    </View>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Nascimento</Text>
                        <Text>{perfil.pda_jog_dta_nasc}</Text>
                    </View>
                </View>

                <View style={styles.containerBody}>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Média Gol</Text>
                        <Text>{perfil.media_gols}</Text>
                    </View>

                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Mensalidade</Text>
                        <Text>{FormataMoeda(perfil.pda_tab_valor)}</Text>
                    </View>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Dívida Ativa</Text>
                        <Text style={perfil.divida_ativa > 0 ? { color: 'red', fontWeight: 'bold' } : { color: 'black' }}>
                            {perfil.divida_ativa > 0 ? FormataMoeda(perfil.divida_ativa) : '0'}
                        </Text>
                    </View>
                </View>

                <View style={styles.containerBody}>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Qtd. Amarelo</Text>
                        <Text>{perfil.amarelo}</Text>
                    </View>
                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Qtd. Azul</Text>
                        <Text>{perfil.azul}</Text>
                    </View>

                    <View style={styles.containerBodyItem}>
                        <Text style={styles.textProperty}>Qtd. Vermelho</Text>
                        <Text>{perfil.vermelho}</Text>
                    </View>

                </View>
                <Text style={styles.textPropertySecao}>Mensalidades</Text>

            </>
        );
    }

    const renderItem = ({ item }, index) => {
        return (
            <View style={styles.itemMensalidade}>
                <Image style={styles.imgLista} source={item.str_status == 'ABERTO' ? imgAberto :
                    item.str_status == 'PAGO' ? imgCheck : imgparcial} />

                <View style={styles.containerLista} >
                    <Text style={styles.textProperty}>Mês: {item.pda_lan_mes}</Text>
                    <Text style={styles.textProperty}>Ano: {item.pda_lan_ano}</Text>
                </View>

                <View style={styles.containerLista} >
                    <Text style={styles.textProperty}>Valor: {FormataMoeda(item.pda_lan_valor)}</Text>
                    <Text style={styles.textProperty}>Situação: {item.str_status}</Text>
                </View>
                {
                    item.str_status == 'PARCIAL' && (
                        <View style={styles.containerListaFim} >
                            <Text style={styles.textProperty}>Pagou</Text>
                            <Text style={styles.textProperty}>{FormataMoeda(item.pda_lan_valor_pago)}</Text>
                        </View>
                    )
                }
            </View>);
    }


    return (
        <View style={styles.container}>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={perfil.mensalidades}
                style={styles.Lista}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => 'men' + item.pda_lan_mes + item.pda_lan_ano}
                ItemSeparatorComponent={RenderSeparator}
                renderItem={renderItem}
                ListHeaderComponent={cabecalho}
                ListFooterComponent={() => (
                    <>
                        {
                            perfil.card_amarelo &&
                            perfil.card_amarelo.length > 0 && (
                                <>
                                    <Text style={styles.textPropertySecao}>Dívida Amarelo</Text>
                                </>
                            )
                        }
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={perfil.card_amarelo}
                            style={styles.Lista}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => 'amr' + item.pda_lan_mes + item.pda_lan_ano}
                            ItemSeparatorComponent={RenderSeparator}
                            renderItem={renderItem}
                            ListFooterComponent={() => (
                                <>
                                    {
                                        perfil.card_azul &&
                                        perfil.card_azul.length > 0 && (
                                            <>
                                                <Text style={styles.textPropertySecao}>Dívida Azul</Text>
                                            </>
                                        )
                                    }

                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={perfil.card_azul}
                                        style={styles.Lista}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={item => 'azu' + item.pda_lan_mes + item.pda_lan_ano}
                                        ItemSeparatorComponent={RenderSeparator}
                                        renderItem={renderItem}
                                        ListFooterComponent={() => (
                                            <>
                                                {
                                                    perfil.card_vermelho &&
                                                    perfil.card_vermelho.length > 0 && (
                                                        <>
                                                            <Text style={styles.textPropertySecao}>Dívida Vermelho</Text>
                                                        </>
                                                    )
                                                }

                                                <FlatList
                                                    showsVerticalScrollIndicator={false}
                                                    data={perfil.card_vermelho}
                                                    style={styles.Lista}
                                                    showsHorizontalScrollIndicator={false}
                                                    keyExtractor={item => 'ver' + item.pda_lan_mes + item.pda_lan_ano}
                                                    ItemSeparatorComponent={RenderSeparator}
                                                    renderItem={renderItem}
                                                    ListFooterComponent={() => (
                                                        <>
                                                            {
                                                                perfil.material_pelada &&
                                                                perfil.material_pelada.length > 0 && (
                                                                    <>
                                                                        <Text style={styles.textPropertySecao}>Material da Pelada</Text>
                                                                    </>
                                                                )
                                                            }
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                data={perfil.material_pelada}
                                                                style={styles.Lista}
                                                                showsHorizontalScrollIndicator={false}
                                                                keyExtractor={item => 'mtr' + item.pda_lan_mes + item.pda_lan_ano}
                                                                ItemSeparatorComponent={RenderSeparator}
                                                                renderItem={renderItem}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </>
                                        )}
                                    />
                                </>
                            )}
                        />
                    </>
                )}
            />

        </View>
    );

}
