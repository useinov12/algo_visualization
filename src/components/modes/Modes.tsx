import React, { useContext, useEffect } from 'react'

import { ModeContext } from 'providers/ModeProvider/ModeProvider'

import { MdDarkMode, MdLightMode } from "react-icons/md";
import styles from './Modes.module.css'

type ModesProps = {
    handleCompareMode:(state:boolean)=>void,
    handleSwitchTheme: (theme:string) => void;
    theme: string;
}

const Modes = ( { handleSwitchTheme, theme,  handleCompareMode }:ModesProps ) => {

    const compareMode = useContext(ModeContext);


    const btnActive = `${ styles.button } ${ styles.active }`;
    const btnPassive = `${ styles.button } ${ styles.passive }`;

    return (
        <div className={styles.modesMenu}>

            <div className={styles.modesMenuContent}>
                <div className={styles.switch}>
                    <button 
                        className={compareMode ? btnPassive : btnActive   } 
                        onClick={ () => handleCompareMode(false) }> 
                        Single Mode 
                    </button> 
                    <button 
                        className={ compareMode ? btnActive : btnPassive  }
                        onClick={ ()=>handleCompareMode(true) } > 
                        Compare Mode 
                    </button>
                </div>

                <div className={styles.switch}>

                    <button
                        style={ {fontSize:'1.5rem'} }
                        className={theme==='light' ? btnActive : btnPassive }  
                        onClick={ ()=>handleSwitchTheme('light') }> 
                        <MdLightMode/> 
                    </button>

                    <button 
                        style={ {fontSize:'1.5rem'} }
                        className={theme==='dark' ? btnActive : btnPassive }
                        onClick={ ()=>handleSwitchTheme('dark') }> 
                        <MdDarkMode/> 
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Modes
