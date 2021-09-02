import React, { useReducer, useMemo, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import Base64 from 'Base64';
import api from '../services/api';
import { createAction } from '../utils/createAction';


export function useAuth() {

    const [state, dispatch] = useReducer(

        (state, action) => {

            switch (action.type) {

                case 'SET_USER':
                    return {
                        ...state,
                        user: { ...action.payload },
                    };
                case 'REMOVE_USER':
                    return {
                        ...state,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...state,
                        loading: action.payload,
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },

    );

    const auth = useMemo(
        () => (
            {
                login: async (login, senha, token) => {

                    const data = {
                        username: login,
                        psw_encript: Base64.btoa(senha),
                        token : token
                    }

                    const res = await api.post('Login/loginMobile', data);
                    const { success, pda_jog_apelido, pda_jog_admin, pda_jog_cod } = res.data;

                    if (success == "true") {

                        const user = {
                            pda_jog_cod: pda_jog_cod,
                            pda_jog_apelido: pda_jog_apelido,
                            pda_jog_admin: pda_jog_admin
                        };

                        await AsyncStorage.setItem('user', JSON.stringify(user));
                        dispatch(createAction('SET_USER', user));

                        return "true";
                    }
                    else if (success == "inativo") {
                        return "inativo";
                    }
                    else {
                        return "false";
                    }
                },

                logout: async () => {
                    await AsyncStorage.removeItem('user');
                    dispatch(createAction('REMOVE_USER'));
                },
            }
        ),
        [],
    );


    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {

            if (user) {
                dispatch(createAction('SET_USER', JSON.parse(user)));
            }
            dispatch(createAction('SET_LOADING', false));
        });

    }, []);

    return { auth, state };



}