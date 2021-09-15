import React, { useContext } from 'react';
import { CartContext } from './Context/CartContext';

export const useCart = () => {
   
    const ctx = useContext(CartContext)

    return {
        ...ctx
    }
}