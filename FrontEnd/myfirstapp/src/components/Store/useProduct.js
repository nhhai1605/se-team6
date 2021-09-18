import React, { useContext } from 'react';
import { ProductsContext } from './Context/ProductsContext';

export const useProducts = () => {
   
    const ctx = useContext(ProductsContext)

    return {
        ...ctx
    }
}