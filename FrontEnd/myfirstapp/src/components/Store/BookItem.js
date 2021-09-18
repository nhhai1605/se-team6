import DefaultBookPic from "../../uploads/noimage.jpg";
import { useCart } from './useCart';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from './utils';


const BookItem = ({book}) => {
    
    const { addProduct, cartItems, increase } = useCart();
    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }
    return ( 
        <div className="card card-body" style={{borderColor:'grey', borderWidth: 2}}>
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "400px"}} className="img-fluid" src={DefaultBookPic} alt=""/><br />
            <h6 className="text-left">ID: {book.id}</h6>
            <h6 className="text-left">Title: {book.title}</h6>
            <h6 className="text-left">Author: {book.author}</h6>
            <h6 className="text-left">Quality: {book.quality}</h6>
            <h6 className="text-left">Price: {formatNumber(book.price)}</h6>
            <div className="text-right">
                <Link  to="/" className="btn btn-link btn-sm mr-2">Details</Link>
                {
                    isInCart(book) && 
                    <button 
                    onClick={() => increase(book)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(book) && 
                    <button 
                    onClick={() => addProduct(book)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                }
            </div>
        </div>
     );
}
export default BookItem;
