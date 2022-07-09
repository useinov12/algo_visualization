import React, { useContext } from 'react';
import { AlgoListContext, ActionKind, AlgoSection } from  'providers/AlgoListProvider';
import { ModeContext } from  'providers/ModeProvider';

import styles from './SideMenu.module.css';


interface ListBtnProps{
    algo:AlgoSection
}

const ListBtn = ({algo}:ListBtnProps) => {
    /* CONTEXT */
    const compareMode  = useContext(ModeContext);

    const {algoListState, dispatch } = useContext(AlgoListContext);
    const { UPDATE_PLAY_STATUS, ADD_TO_LIST, REMOVE_FROM_LIST,  CHANGE_ALGO } = ActionKind;

    // const currentAlgoListMap :string[] = algoListState.currentList.map( algo => algo.type);
    const currentListMap :string[] = algoListState.currentList.filter( algo => algo !== 'none');

    const isDisplayed = ( algo:string ) :boolean =>   currentListMap.includes(algo) ;

    const diplsayOrRemoveAlgo = (type:string) :void => {
        isDisplayed(type) ? dispatch( {type:REMOVE_FROM_LIST, payload:type} ) : dispatch( {type:ADD_TO_LIST, payload:type} ) ;
    };


    /* HANDLERS */
    const handleAlgoStatusText = ( algo:AlgoSection) :false|JSX.Element => {

        const comingSoon = <h5 className={styles.comingSoon}> coming soon...</h5>;
        const addOrRemoveBtn = (algo:string) => isDisplayed(algo) ? <h5>Remove</h5> : <h5>Add</h5>;
        const textToDisplay = (algo:AlgoSection) => algo.isReady  ? addOrRemoveBtn(algo.type) : comingSoon ;
    
        return compareMode && (textToDisplay(algo));
    };

    const onListBtnClick = (compareMode:boolean, type:string) =>{
        dispatch( {type:UPDATE_PLAY_STATUS, payload:'reset'} );
        if(compareMode) diplsayOrRemoveAlgo(type);
        else dispatch({type:CHANGE_ALGO, payload:type});
    };


    const itemActive = (algo:string) => `${styles.listBtn} ${isDisplayed(algo) ? styles.isActive : '' }`;
    return (
        <button
            onClick={()=> onListBtnClick(compareMode, algo.type) }
            className={itemActive(algo.type)}>
            <p>{ algo.title }</p>
            { handleAlgoStatusText(algo) }
        </button>
    )
}

export default ListBtn
