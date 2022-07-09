import React, { useContext, useState, useEffect } from 'react'

import   { AlgoListContext, ActionKind }   from 'providers/AlgoListProvider'
import { ModeContext } from 'providers/ModeProvider'

import { Algorithm } from 'components/algorithm'
import { Inputs } from 'components/inputs'
import { PlayMenu } from 'components/play-menu'

import { createArrayOfLength, createRandomLengthArray } from 'components/inputs/inputFunctions';

//TYPES AND INTERFACES
import { playStatus } from 'components/play-menu/PlayMenu'

//STYLES
import styles from './AlgoList.module.css'

const AlgoList = () => {
    /* CONTEXT */
    const compareMode = useContext(ModeContext);
    const { algoListState, dispatch } = useContext(AlgoListContext);
    const { currentList, currentSingle, globalPlayStatus } = algoListState;
    const { UPDATE_PLAY_STATUS } = ActionKind;

    /* STATE */
    const [ unsortedArray, setUnsortedArray ] = useState([] as number[]);
    const [ arrayLength, setArrayLength] = useState(20);
    const [ sortSpeed, setSortSpeed] = useState(45);

    /* HANDLERS */
    const handleCreateArray = (n?:number) => {
        if(n)setUnsortedArray(createArrayOfLength(n));
        else setUnsortedArray(createRandomLengthArray());
    }
    const handleSortSpeed = (n:number) => setSortSpeed(n);
    const handleLength = (n:number) => setArrayLength(n);

    /* USE EFFECTS */
    useEffect(() => { 
        const resetOnModeChange = () => {
            handleCreateArray();
            dispatch( {type:UPDATE_PLAY_STATUS, payload:'reset'} );
        };
        resetOnModeChange();
    }, [ compareMode ] )

    useEffect(() => {
        const resetOnStopBtn = () => globalPlayStatus === 'reset' && handleCreateArray(arrayLength);
        resetOnStopBtn();
    }, [ globalPlayStatus ])


    /* RENDER RULES */
    return (
        <div className={styles.algoListComponent}>
            
            <div className={styles.listMenu}>
                <Inputs 
                    handleLength={handleLength}
                    handleCreateArray={handleCreateArray}
                />
                <PlayMenu 
                    playStatus={globalPlayStatus as playStatus}
                    handleSortSpeed={handleSortSpeed}
                    sortSpeed={sortSpeed}
                />
            </div>
            
            <div className={ compareMode ? `${styles.algoList} ${styles.compareMode}`:`${styles.algoList} ${styles.singleMode}`} >
                {compareMode && currentList.map( (algo, idx) => 
                    <Algorithm
                        algoName={algo} 
                        key={idx}
                        unsortedArray={unsortedArray}
                        sortSpeed={sortSpeed}
                    />
                )}
                {!compareMode && (
                    <Algorithm
                        algoName={currentSingle} 
                        unsortedArray={unsortedArray}
                        sortSpeed={sortSpeed}
                    />
                )}
            </div>
        </div>
    )
}

export default AlgoList
