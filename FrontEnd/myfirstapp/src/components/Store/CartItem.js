import React from 'react';
import DefaultBookPic from "../../uploads/noimage.jpg";

import { useCart } from './useCart';
import { formatNumber } from './utils';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../icons';

const CartItem = ({product}) => {

    const { increase, decrease, removeProduct } = useCart();

    return ( 
        <div className="row no-gutters py-2" styles={{border:5, borderColor:'black', backgroundColor: 'black'}}>
            <div className="col-sm-2 p-2">
                <img
                alt={product.name}
                style={{margin: "auto", maxHeight: "100px"}} 
                src={DefaultBookPic} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">Title: {product.title}</h5>
                <h5 className="mb-1">Author: {product.author}</h5>
                <h6 className="mb-1">Price: {formatNumber(product.price)} </h6>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">Qty: {product.quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                 <button 
                 onClick={() => increase(product)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusCircleIcon width={"20px"}/>
                 </button>

                 {
                     product.quantity > 1 &&
                     <button
                    onClick={() => decrease(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </button>
                 }

                {
                     product.quantity === 1 &&
                     <button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </button>
                 }
                 
            </div>
        </div>
     );
}
 
export default CartItem;