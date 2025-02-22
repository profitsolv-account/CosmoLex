"use client"

import { getLatestPost } from '@/lib/queries/wordpress';
import {createContext, useContext, useState, useEffect} from 'react';

const AppContext = createContext({});

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [appData, setAppData] = useState({});

    useEffect(() => {
        (async () => {
            const fpost = await getLatestPost();
            setAppData({
                featuredPost: fpost
            });
        })();
    }, []);

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}
