import React, { useContext, useEffect, useState, } from 'react';

import  { ModeContext }  from 'providers/ModeProvider';
import { AlgoListContext, ActionKind } from  'providers/AlgoListProvider';

import ListBtn from './ListBtn';
import {list} from '../../providers/AlgoListProvider/listSource'

//STYLES AND ICONS
import { MdArrowDropDownCircle } from "react-icons/md";
import styles from './SideMenu.module.css';

const SideMenu = () => {
    /* CONTEXT */
    const compareMode = useContext(ModeContext);
    const {algoListState, dispatch } = useContext(AlgoListContext);
    const { globalPlayStatus } = algoListState;
    const { UPDATE_PLAY_STATUS, CHANGE_LIST } = ActionKind;
    const SORT  = 'sort';
    const SEARCH  = 'search';

    /* STATE */
    const [sideMenuIsOpen, setSideMenuIsOpen] = useState(true);
    const [ currentMenuList, setCurrentMenuList ] = useState(SORT);

    /* HANDLERS */
    const handleSideMenu = (state:any) =>  setSideMenuIsOpen(state);

    const handleSwitchList = () =>{
        const switchTo = currentMenuList === SORT ? SEARCH : SORT; 
        setCurrentMenuList(switchTo)
    }

    const handleMenuList = () =>{
        if(currentMenuList === SORT) return list.sort.map((algo, i)=> renderMenuOption(i, algo))
        if(currentMenuList === SEARCH) return list.search.map((algo, i)=> renderMenuOption(i, algo))
    }
    

    const renderMenuOption = (idx:number, algo:any) =>{
       return  (
        <li key={idx} className={styles.listItem}>
            <ListBtn  algo={algo} />
        </li>)
    }


    /* USE EEFECTS */
    const switchMenuList = () =>{
        const switchTo = currentMenuList === SORT ? SORT : SEARCH ;
        if(globalPlayStatus === 'play')dispatch( {type:UPDATE_PLAY_STATUS, payload:'reset'} );
        dispatch( {type:CHANGE_LIST, payload:switchTo} );
    }

    useEffect(()=>{
        handleSideMenu(true)
    }, [])

    useEffect(() => {
        switchMenuList()
    }, [currentMenuList, compareMode]);

    useEffect(() => {
        switchMenuList()
    }, [currentMenuList]);

    useEffect(()=>{
        if(compareMode)handleSideMenu(true);
    }, [compareMode])



    /* RENDER RULES */
    const smallScreenMenuToggle = sideMenuIsOpen ? `${styles.sideMenu} ${styles.smallOpen}` : `${styles.sideMenu} ${styles.smallClose}`;
    const sortListActive = `${styles.button} ${ currentMenuList === SORT ? styles.active : styles.passive}` ;
    const searchListActive = `${styles.button} ${ currentMenuList === SEARCH ? styles.active : styles.passive}` ;

 


    return (
        <div className={ smallScreenMenuToggle }>

            <div className={styles.smallScreenToggle}>
                <button 
                    onClick={ ()=>handleSideMenu(!sideMenuIsOpen) }
                    className={styles.ArrowPointerBtn} >
                        <MdArrowDropDownCircle className={sideMenuIsOpen ? styles.toggleOpen : styles.toggleClose }/>
                </button>
               <h3 className={styles.toggleTitle}>Algorithms</h3>
            </div>

            <div className={styles.sideMenuContent}>
                <div className={styles.switch}>
                    <button 
                        className={sortListActive} 
                        onClick={handleSwitchList}>Sort algos
                    </button>

                    <button 
                        className={searchListActive} 
                        onClick={handleSwitchList}> Search algos
                    </button>
                </div>

                <ul>
                    { handleMenuList() }   
                </ul>
            </div>
        </div>
    )
}

export default SideMenu