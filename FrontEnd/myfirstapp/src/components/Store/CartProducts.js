import React from 'react';

import CartItem from './CartItem';
import { useCart } from './useCart';
import styles from '../styles/BookGrid.module.css';

const CartProducts = () => {

    const { cartItems } = useCart();

    return ( 
        <div>
                {
                    cartItems.map(product =>  <div className="card card-body mb-3 border border-dark rounded" ><CartItem key={product.id} product={product}/></div>)
                }
        </div>

     );
}
 
export default CartProducts;