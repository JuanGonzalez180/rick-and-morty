import React, { createContext, useContext, useState } from 'react';

const defaultValue = {
    items: [],
    setItems: () => {},
};

const ItemContext = createContext(defaultValue);

export const useItemContext = () => {
    return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
    const [characters, setCharacters] = useState(defaultValue.items);

    return (
        <ItemContext.Provider value={{ characters, setCharacters }}>
            {children}
        </ItemContext.Provider>
    );
};
