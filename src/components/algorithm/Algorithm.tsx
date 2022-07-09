import React, { useContext, useEffect, useState } from 'react'

import { ModeContext } from 'providers/ModeProvider'
import { AlgoListContext, ActionKind } from 'providers/AlgoListProvider'

import { Chart } from 'components/chart';
import { SortAnimationState, SearchAnimationState } from './functions/interfaces'


import styles from './AlgoComponent.module.css';



import AlgoClass from './AlgoClass'

interface AlgoComponentProps{
    algoName:string, 
    unsortedArray:number[],
    sortSpeed:number, 
}

const AlgoComponent = ( props:AlgoComponentProps ) => {
    /* CONTEXT */
    const compareMode = useContext(ModeContext);
    const { algoListState, dispatch } = useContext(AlgoListContext);
    const { UPDATE_PLAY_STATUS } = ActionKind;
    const { globalPlayStatus, currentSingle } = algoListState;


    /* PROPS */
    const { algoName, unsortedArray, sortSpeed } = props;

    /* STATE */
    const [ animationsHash, setAnimationsHash ] = useState(initAnimHash);
    const [ animIdxCount, setAnimIdxCount ] = useState(0);
    const [ localPlayStatus, setLocalPlayStatus ] = useState(globalPlayStatus) 
    const [ localArray, setLocalArray ] = useState([...unsortedArray])
    const [link, setLink ] = useState('')

    /* HANDLERS */
    const handleFinishAnimation = () =>{
        setLocalPlayStatus('pause');
        if(!compareMode)dispatch( {type:UPDATE_PLAY_STATUS, payload:'pause'} );
    };
    const handleReset = () =>{
        setLocalArray([...unsortedArray]);
        setAnimIdxCount(0);
    };
    const getAnimationData = () =>{
        const animationData = (name:string) =>{
            const algorithm = new AlgoClass(name);
            const hash = algorithm.getAnimationHash([...unsortedArray]);
            const algoLink =  algorithm.getLink();
            setAnimationsHash(hash);
            setLink(algoLink);
        }
        if(compareMode)animationData(algoName)
        else animationData(currentSingle);
    }


    /* USE EFFECTS */
    useEffect(()=>{
        getAnimationData();
    }, [])
    useEffect(()=>{
        getAnimationData();
    }, [algoName])

    useEffect(()=>{
        setLocalArray([...unsortedArray])
    }, [ unsortedArray ])

    useEffect( ()=>{
        setLocalPlayStatus(globalPlayStatus)
    }, [compareMode, globalPlayStatus])

    useEffect(()=>{  
        getAnimationData();
    },[ localArray ])

    useEffect(()=>{  
        
        if(localPlayStatus === 'play'){
            const playAnimationID = window.setInterval( ()=>setAnimIdxCount(p => p+1), sortSpeed );
            if(animIdxCount === animationsHash.indexes.length-1)handleFinishAnimation();
            return () => window.clearInterval(playAnimationID);
        };
        if(localPlayStatus === 'reset')handleReset();

    }, [ localPlayStatus, animIdxCount])


    /* RENDER RULES */
    const mode = compareMode ? `${styles.algoComponent} ${styles.compareMode}` : `${styles.algoComponent} ${styles.singleMode}`;

    return (
        <div className={mode} >
            { !compareMode &&  algoName !== 'none' && 
                <div className={styles.infoPlayMenu}>
                    <h5>
                        <a href={link} target='_blank'>{algoName}</a>
                    </h5>
                </div>
            }
            { <Chart
                speed={ sortSpeed }
                type={ algoName}
                data={ localArray }
                animationsHash={ animationsHash }
                animIdxCount={animIdxCount}
            />}
        </div>
    )
}

export default AlgoComponent;


const initAnimHash:SortAnimationState | SearchAnimationState = {
    indexes:[],
    actionHash:{},
    pivotHash:{}, 
    testData:[]
}
