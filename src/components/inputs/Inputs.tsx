import React, { useContext, useState, useEffect } from 'react';


import { AlgoListContext, ActionKind } from 'providers/AlgoListProvider'
// import { ActionKind } from  'providers/AlgoListProvider';

import styles from './Inputs.module.css';

interface InputsProps{
    handleLength:(n:number) => void,
    handleCreateArray:(n?:number) => void,
};

const Inputs = ({ handleLength, handleCreateArray } :InputsProps) => {
    /* CONTEXT */
    const { dispatch } = useContext(AlgoListContext);
    const { UPDATE_PLAY_STATUS } = ActionKind;

    /* STATE */
    const [inputLength, setInputLength ] = useState(60);

    /* HANDLERS */
    const onLengthChange = (e: React.FormEvent<HTMLInputElement> ) =>{
        setInputLength(parseInt(e.currentTarget.value))
    };

    const onCreateArray = (length?:number) =>{
        dispatch({type:UPDATE_PLAY_STATUS, payload:'reset'});
        length ? handleCreateArray(length) : handleCreateArray();
    };

    /* USE EFEFCTS */
    useEffect(() => {
        handleLength(inputLength);
    }, [inputLength])


    /* RENDER */
    return(
        <div className={ styles.inputsSync }>

                <div className={ styles.lengthInputContainer }>
                    <h5>Input length: { inputLength } </h5>  
                    <input 
                        disabled={ false }
                        type="range" 
                        className="slider" 
                        step="1" 
                        min={6} max={150} 
                        value={ inputLength }  
                        onChange={ (e: React.FormEvent<HTMLInputElement>)=> onLengthChange(e)}
                    />
                </div>

                <div className={styles.btnContainer}>

                    <button
                        className={ styles.inputBtn }
                        disabled={ false } 
                        onClick={ () => onCreateArray(inputLength) }> 
                        GENERATE 
                    </button>

                    <h5>OR</h5>

                    <button
                        className={ styles.inputBtn }
                        disabled={ false }
                        onClick={ ()=> onCreateArray() }> 
                        GENERATE RANDOM 
                    </button>

                </div>
        </div>)
}

export default Inputs;
