import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from './styles';
import financas_dash from '../../assets/financas_dash.png';
import divida_ativa from '../../assets/divida_ativa.png';
import artilheiros from '../../assets/artilheiros.png';
import selecao_mes from '../../assets/selecao_mes.png';
import selecao_ano from '../../assets/selecao_ano.png';
import media_gols from '../../assets/media_gols.png';
import frequencia from '../../assets/frequencia.png';
import disciplinados from '../../assets/disciplinados.png';
import indisciplinados from '../../assets/indisciplinados.png';
import aniversariantes from '../../assets/aniversariantes.png';
import sobre from '../../assets/sobre.png';

export default function Dashboard({ navigation }) {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={{ marginBottom: 20 }} >
                <View style={styles.contentItens}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Fincancas') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={financas_dash} resizeMode={'contain'} />
                            <Text style={styles.label}>Finanças</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('DividaAtiva') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={divida_ativa} resizeMode={'contain'} />
                            <Text style={styles.label}>Dívida Ativa</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('ArtilheiroMes') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={artilheiros} resizeMode={'contain'} />
                            <Text style={styles.label}>Artilheiros do Mês</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentItens}>

                    <TouchableOpacity onPress={() => { navigation.navigate('SelecaoMes') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={selecao_mes} resizeMode={'contain'} />
                            <Text style={styles.label}>Seleção do mês</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('ArtilheiroAno') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={artilheiros} resizeMode={'contain'} />
                            <Text style={styles.label}>Artilheiros do Ano</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('SelecaoAno') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={selecao_ano} resizeMode={'contain'} />
                            <Text style={styles.label}>Seleção do Ano</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles.contentItens}>
                    <TouchableOpacity onPress={() => { navigation.navigate('MediaGols') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={media_gols} resizeMode={'contain'} />
                            <Text style={styles.label}>Média de Gols</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Frequencia') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={frequencia} resizeMode={'contain'} />
                            <Text style={styles.label}>% Frequência</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Disciplinados') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={disciplinados} resizeMode={'contain'} />
                            <Text style={styles.label}>Disciplinados</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentItens}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Indisciplinados') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={indisciplinados} resizeMode={'contain'} />
                            <Text style={styles.label}>Indisciplinados</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Aniversariantes') }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={aniversariantes} resizeMode={'contain'} />
                            <Text style={styles.label}>Aniversariantes</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Contato para apps.",
                            "carlossantana.desenv@gmail.com",
                            [
                                { text: "OK", onPress: () => { } }
                            ]
                        );
                    }}>
                        <View style={styles.cardItem}>
                            <Image style={styles.img} source={sobre} resizeMode={'contain'} />
                            <Text style={styles.label}>Sobre o app</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>

    );
}



