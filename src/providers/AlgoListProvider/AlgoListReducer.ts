
import { list } from './listSource';

export function reducer(state:AlgoListInterface2, action:Action):AlgoListInterface2 {
    const { UPDATE_PLAY_STATUS, ADD_TO_LIST, REMOVE_FROM_LIST, CHANGE_LIST, CHANGE_ALGO } = ActionKind;
    const {type, payload} = action;

    const copy = [...state.currentList];
    const algo = [...list.sort, ...list.search].find(alg => alg.type === payload)!;

    switch(type){

        case UPDATE_PLAY_STATUS: 
            return { ...state,  globalPlayStatus:payload };

        case ADD_TO_LIST:
            const idx = state.currentList.indexOf('none')
            copy[idx] = algo.type;
            return {...state, currentList:copy}

        case REMOVE_FROM_LIST : 
            const i = state.currentList.indexOf(algo?.type!);
            copy[i] = 'none';
            return { ...state, currentList:copy }

        case CHANGE_LIST : 
            const newSortArray = new Array(list.sort.length).fill('none')
            const newSearchArray = new Array(list.search.length).fill('none')
            const fillBlank = payload === 'sort' ? newSortArray : newSearchArray;
            return {...state, currentSingle:'none', currentList:fillBlank };

        case CHANGE_ALGO : 
            return {...state, currentSingle:payload }

        default:
            console.log( `Unhandled action type ${type}`);
            return state;
    }
}


/* ACTIONS TYPES*/
export enum ActionKind{
    UPDATE_PLAY_STATUS = 'updatePlayStatus',
    ADD_TO_LIST = 'addToList',
    REMOVE_FROM_LIST = 'removeFromList',
    REMOVE_ALL_FROM_LIST = 'removeAllFromList',
    CHANGE_LIST = 'changeList',
    CHANGE_ALGO = 'changeAlgo'
}

export type Action = {
    type:ActionKind,
    payload:string
}

export interface AlgoListInterface2 {
    currentSingle:string,
    currentList:string[],
    globalPlayStatus:string,
}

