import React, { useReducer, useMemo } from 'react';
import { createAction } from '../utils/createAction';

export function usePelada() {

    const [statePelada, dispatch] = useReducer(

        (state, action) => {

            switch (action.type) {

                case 'SET_PELADA':
                    return {
                        ...state,
                        peladaEscolhida: { ...action.payload },
                    };
                default:
                    return state;
            }
        },
        {
            peladaEscolhida: undefined
        },

    );

    const gerenciadorPelada = useMemo(
        () => (
            {
                setPelada: async (idPelada) => {

                    const peladaEscolhida = {
                        pda_pel_cod: idPelada
                    };

                    dispatch(createAction('SET_PELADA', peladaEscolhida));
                }
            }
        ),
        [],
    );

    return { gerenciadorPelada, statePelada };
}