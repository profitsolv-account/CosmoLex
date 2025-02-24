"use client"

import {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {FeaturedPostType, MenusList} from "@/types";

type AppDataType = {
    menus: MenusList;
    featuredPost: FeaturedPostType,
};

type ContextType = {
    appData: AppDataType
    updateData: (data: Partial<AppDataType>) => void;
}

const emptyAppData = {
    menus: {},
    featuredPost: {
        title: '',
        featuredImage: '',
        altText: '',
        slug: ''
    }
};

const defaultContextValue: ContextType = {
   appData: emptyAppData,
    updateData: () => {}
}

const AppContext = createContext<ContextType>(defaultContextValue);

export const AppContextProvider = ({children}: {children: ReactNode}) => {
    const [appData, setAppData] = useState<AppDataType>(emptyAppData);

    const updateData = useCallback((data: Partial<AppDataType>) => {
        setAppData( appData => ({
            ...appData,
            ...data,

        }))
    }, [setAppData])

    const contextValue: ContextType = {
        appData,
        updateData
    }

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}
