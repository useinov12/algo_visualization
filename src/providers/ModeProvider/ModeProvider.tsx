import React from 'react';

export const ModeContext = React.createContext(true);

type ProviderPorps = {
    value :boolean;
    children:JSX.Element
}

const ModeProvider = ( {value, children}:ProviderPorps) => {
    return (
        <ModeContext.Provider value={value}>
            {children}
        </ModeContext.Provider>
    )
}

export default ModeProvider;
