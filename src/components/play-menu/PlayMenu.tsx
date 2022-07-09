import React, { useContext, useState, useEffect } from 'react'

//CONTEXT
import { AlgoListContext, ActionKind } from 'providers/AlgoListProvider'

//ICONS AND STYLES
import styles from './PlayMenu.module.css'
import { FaPlay, FaPause, FaStop } from "react-icons/fa"

// COMPONENTS TYPES 
export type playStatus = 'reset'|'pause'|'play';
export type level = 'LOCAL'|'SYNC';

export interface PlayMenuProps{
    playStatus: playStatus,
    handleSortSpeed:(n:number) => void,
    sortSpeed:number
}

function PlayMenu(props:PlayMenuProps) {
    /* CONTEXT */
    const {algoListState, dispatch } = useContext(AlgoListContext);
    const { globalPlayStatus } = algoListState;
    const { UPDATE_PLAY_STATUS } = ActionKind;

    /* PROPS */
    const {  playStatus,  handleSortSpeed } = props;

    /* STATE */
    const [localPlayStatus, setlocalPlayStatus] = useState('pause')
    const [inputSpeed, setInputSpeed ] = useState(45)

    /* HANDLERS */
    const onSpeedChange = ( e: React.FormEvent<HTMLInputElement> ) =>{
        setInputSpeed(parseInt(e.currentTarget.value))
    };

    /* USE EFFECTS */
    useEffect(()=>{
        setlocalPlayStatus(playStatus as playStatus);
    }, [ ])

    useEffect(() => {
        handleSortSpeed(inputSpeed);
    }, [inputSpeed])

    useEffect(()=>{
        setlocalPlayStatus(playStatus as playStatus);
    }, [ globalPlayStatus ])

    /* RENDER RULES*/
    const btnActive = `${ styles.syncPlayBtn} ${ styles.active }`;
    const btnPassive = `${ styles.syncPlayBtn } ${ styles.passive }`;

    /* RETRUN */
    return (
        <div className={ styles.syncPlayMenuContainer }> 

            <div className={ styles.speedInputContainer }>
                <h5>Speed:{ inputSpeed } ms</h5> 
                <input 
                    disabled={ localPlayStatus === 'play' ? true : false } 
                    type="range" 
                    className="slider speed-slider" 
                    step="1" 
                    min={3} max={500} 
                    value={ inputSpeed } 
                    onChange={ (e: React.FormEvent<HTMLInputElement>)=> onSpeedChange(e)}
                />
            </div>

            <div className={ styles.syncPlayMenu}>
                <button 
                    className={localPlayStatus === 'reset' ? btnActive:btnPassive   }
                    onClick={ ()=>dispatch({type:UPDATE_PLAY_STATUS, payload:'reset'}) }> 
                    <FaStop/> 
                </button>
                <button 
                    className={localPlayStatus === 'play' ? btnActive:btnPassive  }
                    onClick={ ()=>dispatch({type:UPDATE_PLAY_STATUS, payload:'play'}) }> 
                    <FaPlay/> 
                </button>
                
                <button 
                    className={localPlayStatus === 'pause' ? btnActive:btnPassive    }
                    onClick={ ()=>dispatch({type:UPDATE_PLAY_STATUS, payload:'pause'}) }> 
                    <FaPause/> 
                </button>
            </div>

        </div>
    )
}

export default PlayMenu;