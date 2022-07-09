import React, { Dispatch, useReducer} from 'react';
import {AlgoListInterface2, Action, reducer } from './AlgoListReducer';
import { playStatus } from 'components/play-menu/PlayMenu';

const init= {
    currentSingle:'bubble',
    currentList:['none','none','none','none'],
    globalPlayStatus:'pause'as playStatus,
}


export const AlgoListContext = React.createContext<{
    algoListState:AlgoListInterface2, 
    dispatch:Dispatch<Action>}>
    ({
        algoListState:init,
        dispatch:()=>null
    });

type ProviderPorps = {
    children:JSX.Element
};

const AlgoListProvider = ( {children}:ProviderPorps ) => {
    const [state, dispatch] = useReducer( reducer, init )
    return (
        <AlgoListContext.Provider value={ {algoListState:state, dispatch:dispatch} }>
            {children}
        </AlgoListContext.Provider>
    )
};

export default AlgoListProvider;