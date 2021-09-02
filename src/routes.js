import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';

import Home from './pages/Home';
import Peladeiros from './pages/Peladeiros';
import Peladas from './pages/Peladas';
import Financeiro from './pages/Financeiro';
import EditarPerfil from './pages/EditarPerfil';
import Header from './components/Header';
import AlterarSenha from './pages/AlterarSenha';
import DetalhePeladeiro from './pages/DetalhePeladeiro';
import Login from './pages/Login';
import Confirmacao from './pages/DetalhePelada/Confirmacao';
import Scouts from './pages/DetalhePelada/Scouts';
import Selecao from './pages/DetalhePelada/Selecao';
import Presentes from './pages/DetalhePelada/Presentes';
import Financas from './pages/Dashboard/Financas';
import DividaAtiva from './pages/Dashboard/DividaAtiva';
import ArtilheiroMes from './pages/Dashboard/ArtilheiroMes';
import SelecaoMes from './pages/Dashboard/SelecaoMes';
import ArtilheiroAno from './pages/Dashboard/ArtilheiroAno';
import SelecaoAno from './pages/Dashboard/SelecaoAno';
import MediaGols from './pages/Dashboard/MediaGols';
import Frequencia from './pages/Dashboard/Frequencia'
import Disciplinados from './pages/Dashboard/Disciplinados'
import Indisciplinados from './pages/Dashboard/Indisciplinados'
import Aniversariantes from './pages/Dashboard/Aniversariantes';
import Dashboard from './pages/Dashboard';
import Votacao from './pages/Votacao';

// controles de contexto com hooks de auth e user
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';
import { useAuth } from './hooks/useAuth';


// Pilha de navegacao da minha Home
const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <HomeStack.Screen name="Home" component={Home}
                options={{
                    headerTitle: () => <Header label={'Meu Perfil'} nameIcon={'user'} />,
                   // headerShown: false,
                }} 
            />
            <HomeStack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: 'Ajuste o seu Perfil' }} />
            <HomeStack.Screen name="AlterarSenha" component={AlterarSenha} options={{ title: 'Altere a sua Senha' }} />
        </HomeStack.Navigator>
    );
}

// Pilha de navegacao dos Peladeiros
const PeladeirosStack = createStackNavigator();
function PeladeirosStackScreen() {
    return (
        <PeladeirosStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <PeladeirosStack.Screen name='Peladeiros' component={Peladeiros}
                options={{
                    headerTitle: () => <Header label={'Peladeiros'} nameIcon={'users'} />
                }}
            />
            <PeladeirosStack.Screen name="DetalhePeladeiro" component={DetalhePeladeiro} options={{ title: 'Detalhes do Perfil' }} />
        </PeladeirosStack.Navigator>
    );
}

// Abas no topo do detalhe da Pelada
const TabTopPel = createMaterialTopTabNavigator();
function TabTopPeladas() {
    return (
        <TabTopPel.Navigator initialRouteName='Confirmacao' lazy={true} tabBarOptions={{
            scrollEnabled: true,
            indicatorStyle: { backgroundColor: '#FF9800' },
            labelStyle: { textTransform: 'none', fontWeight: 'bold' }
        }} >
            <TabTopPel.Screen name="Confirmacao" component={Confirmacao} options={{ title: 'Confirmação' }} />
            <TabTopPel.Screen name="Presentes" component={Presentes} options={{ title: 'Presentes' }} />
            <TabTopPel.Screen name="Scouts" component={Scouts} options={{ title: 'Scouts' }} />
            <TabTopPel.Screen name="Selecao" component={Selecao} options={{ title: 'Seleção' }} />
        </TabTopPel.Navigator>
    );
}

// Pilha de navegacao das Peladas
const PeladasStack = createStackNavigator();
function PeladasStackScreen() {
    return (
        <PeladasStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <PeladasStack.Screen name='Peladas' component={Peladas}
                options={{
                    headerTitle: () => <Header label={'Peladas'} nameIcon={'calendar'} />
                }} />
            <PeladasStack.Screen name="DetalhePelada" component={TabTopPeladas} options={{ title: 'Detalhes da Pelada' }} />
            <PeladasStack.Screen name="Votacao" component={Votacao} options={{ title: 'Escolha os melhores' }} />
        </PeladasStack.Navigator>
    );
}


// Pilha de navegacao do Financeiro
const FinanceiroStack = createStackNavigator();
function FinanceiroStackScreen() {
    return (
        <FinanceiroStack.Navigator >
            <FinanceiroStack.Screen name='Financeiro' component={Financeiro}
                options={{
                    headerTitle: () => <Header label={'Financeiro'} nameIcon={'dollar-sign'} />
                }}
            />
        </FinanceiroStack.Navigator>
    );
}

// Pilha de navegacao do dashboard
const DashboardStack = createStackNavigator();
function DashboardStackScreen() {
    return (
        <DashboardStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <DashboardStack.Screen name='Dashboard' component={Dashboard}
                options={{
                    headerTitle: () => <Header label={'Dashboard'} nameIcon={'pie-chart'} />
                }}
            />
            <DashboardStack.Screen name="Fincancas" component={Financas} options={{ title: 'Finanças' }} />
            <DashboardStack.Screen name="DividaAtiva" component={DividaAtiva} options={{ title: 'Dívida Ativa' }} />
            <DashboardStack.Screen name="ArtilheiroMes" component={ArtilheiroMes} options={{ title: 'Artilheiros do Mês' }} />
            <DashboardStack.Screen name="SelecaoMes" component={SelecaoMes} options={{ title: 'Seleção do Mês' }} />
            <DashboardStack.Screen name="ArtilheiroAno" component={ArtilheiroAno} options={{ title: 'Artilheiros do Ano' }} />
            <DashboardStack.Screen name="SelecaoAno" component={SelecaoAno} options={{ title: 'Seleção do Ano' }} />
            <DashboardStack.Screen name="MediaGols" component={MediaGols} options={{ title: 'Média de Gols' }} />
            <DashboardStack.Screen name="Frequencia" component={Frequencia} options={{ title: '% de Frequência' }} />
            <DashboardStack.Screen name="Disciplinados" component={Disciplinados} options={{ title: 'Disciplinados' }} />
            <DashboardStack.Screen name="Indisciplinados" component={Indisciplinados} options={{ title: 'Indisciplinados' }} />
            <DashboardStack.Screen name="Aniversariantes" component={Aniversariantes} options={{ title: 'Aniversariantes' }} />
            <DashboardStack.Screen name="DetalhePeladeiro" component={DetalhePeladeiro} options={{ title: 'Detalhes do Perfil' }} />
        </DashboardStack.Navigator>
    );
}

// Criação das minhas tabs de navegacao
const Tab = createBottomTabNavigator();

// Pilha de navegacao do Login
const LoginStack = createStackNavigator();
function LoginStackScreen() {
    return (
        <LoginStack.Navigator screenOptions={{ headerShown: false }} >
            <LoginStack.Screen name='Login' component={Login} />
        </LoginStack.Navigator>
    );
}

export default function Routes() {

    // desestruturando do meu hook o auth e o estado
    const { auth, state } = useAuth();


    return (
        <AuthContext.Provider value={auth}>
            <NavigationContainer>
                {
                    state.loading ? (
                        <View></View>
                    ) :
                        state.user ? (
                            <UserContext.Provider value={state.user}>

                                <Tab.Navigator tabBarOptions={
                                    {
                                        activeTintColor: '#FF9800',
                                        inactiveTintColor: 'black',
                                        // activeBackgroundColor: '#FF9800',
                                        labelStyle: {
                                            fontWeight: 'bold'
                                        }
                                    }} >
                                    <Tab.Screen name="Home" component={HomeStackScreen}
                                        options={{
                                            tabBarLabel: 'Meu Perfil',
                                            tabBarIcon: ({ color }) => (
                                                <Feather name='user' size={18} color={color} />
                                            ),
                                        }}
                                    />
                                    <Tab.Screen name="Peladeiros" component={PeladeirosStackScreen}
                                        options={{
                                            tabBarLabel: 'Peladeiros',
                                            tabBarIcon: ({ color }) => (
                                                <Feather name='users' size={18} color={color} />
                                            ),
                                        }}
                                    />

                                    <Tab.Screen name="Peladas" component={PeladasStackScreen}
                                        options={{
                                            tabBarLabel: 'Peladas',
                                            tabBarIcon: ({ color }) => (
                                                <Feather name='calendar' size={18} color={color} />
                                            ),
                                        }}

                                    />
                                    <Tab.Screen name="Financeiro" component={FinanceiroStackScreen}
                                        options={{
                                            tabBarLabel: 'Financeiro',
                                            tabBarIcon: ({ color }) => (
                                                <Feather name='dollar-sign' size={18} color={color} />
                                            ),
                                        }}
                                    />
                                    <Tab.Screen name="Dashboard" component={DashboardStackScreen}
                                        options={{
                                            tabBarLabel: 'Dashboard',
                                            tabBarIcon: ({ color }) => (
                                                <Feather name='pie-chart' size={18} color={color} />
                                            ),
                                        }}
                                    />
                                </Tab.Navigator>

                            </UserContext.Provider>

                        ) :
                            (
                                <LoginStackScreen />
                            )
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}



