import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage';


import  { ModeProvider }  from 'providers/ModeProvider';
import { AlgoListProvider } from 'providers/AlgoListProvider'

import { Modes } from 'components/modes';
import { SideMenu } from 'components/side-menu';
import { AlgoList } from 'components/algoList';
 
//STYLES
import './App.css';

const App = () => {

    const defaultDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;

    const [theme, setTheme ] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')
    const [compareMode, setCompareMode ] = useState(false);

    const handleSwitchTheme = (theme:string) =>  setTheme(theme);
    const handleCompareMode = (state:boolean) => setCompareMode(state);

    
    return (
        <ModeProvider  value={compareMode} >
            <div className="App" data-theme={theme}>
            
                <Modes 
                    handleSwitchTheme={handleSwitchTheme} 
                    handleCompareMode={handleCompareMode}
                    theme={theme}
                />
                <AlgoListProvider>
                    <div className='main-content'>
                        <SideMenu/>
                        <AlgoList/>
                    </div>
                </AlgoListProvider>
            </div>
        </ModeProvider>
    )
}

export default App
