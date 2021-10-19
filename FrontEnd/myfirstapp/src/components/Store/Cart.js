import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from './useCart';
import { formatNumber } from './utils';
import CartItem from './CartItem';

const Cart = () => {

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useCart();
    
    return ( 
        <div >
            <div className="text-center mt-5">
                <h1>Your Cart</h1>
            </div>

            <div className="row no-gutters justify-content-center">
                <div className="col-sm-9 p-3">
                    {
                        cartItems.length > 0 ?
                        cartItems.map(product =>  <div key={product.id} className="card card-body mb-3 border border-dark rounded" ><CartItem key={product.id} product={product}/></div>) 
                        :
                        <div className="h4 p-3 text-center text-muted">
                            Your cart is empty
                        </div>
                    }

                    { checkout && 
                        <div className="h4 p-3 text-center text-success">
                            <p>Checkout successfull!</p>
                            <Link to="/" className="btn btn-outline-success">Buy More</Link>
                        </div>
                    }
                </div>
                {
                    cartItems.length > 0 && 
                    <div className="col-sm-3 p-3">
                        <div className="card card-body border border-dark rounded">
                            <p className="mb-1">Total Items</p>
                            <h4 className=" mb-3 txt-right">{itemCount}</h4>
                            <p className="mb-1">Total Payment</p>
                            <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                            {
                                localStorage.setItem("total",total)
                            }
                            <hr className="my-4"/>
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-primary mb-2 ml-2" onClick={handleCheckout}  title="To checkout and proceed to payment">Checkout</button>
                                <button type="button" className="btn btn-outline-primary mb-2 ml-2" onClick={clearCart} title="To clear cart items">Clear</button>
                            </div>

                        </div>
                    </div>
                }
                
            </div>
        </div>
     );
}
 
export default Cart;