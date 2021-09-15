import React from 'react';

import CartItem from './CartItem';
import { useCart } from './useCart';
import styles from './BookGrid.module.css';

const CartProducts = () => {

    const { cartItems } = useCart();

    return ( 
        <div className={styles.p__container}>
            <div className="card card-body border-0">

                {
                    cartItems.map(product =>  <CartItem key={product.id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;