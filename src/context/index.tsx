"use client"

import {createContext, useContext, useState} from 'react';

const AppContext = createContext({});

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [appData, setAppData] = useState({});

    return <AppContext.Provider value={{
        ...appData,
        setAppData
    }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}
