import DefaultBookPic from "../../uploads/noimage.jpg";
import { useCart } from './useCart';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from './utils';
import axios from "axios";

const BookItem = ({book}) => {
    const { addProduct, cartItems, increase } = useCart();
    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }
    var url = "";
    try
    {
        url = require("../../BookCover/"+book.id+".jpg");
    }
    catch
    {
        url = require("../../uploads/noimage.jpg");
    }
    return ( 
        <div className="card card-body" style={{borderColor:'black', borderWidth: 2, backgroundColor : 'white'}}>
            <img style={{display: "block", margin: "5% auto 5%", height: "400px",  width: "auto", maxWidth:"300px", wordWrap: "break-word"}} className="img-fluid" src={url} alt={book.id}/><br />
            <h4 className="text-left">ID: {book.id}</h4>
            <h4 className="text-left">Title: {book.title}</h4>
            <h4 className="text-left">Author: {book.author}</h4>
            <h4 className="text-left">Seller: <a href={"/user/"+book.username}>{book.displayName}</a></h4>
            <h4 className="text-left">Quantity: {book.quantity}</h4>
            <h4 className="text-left">Price: {formatNumber(book.price)}</h4>
            <div className="text-right">
                <Link to={"/book/"+book.id} className="btn btn-info m-2">Details</Link>
                {
                    isInCart(book) && 
                    <button 
                    onClick={() => increase(book)}
                    className="btn btn-outline-primary m-2">Add more</button>
                }

                {
                    !isInCart(book) && 
                    <button 
                    onClick={() => addProduct(book)}
                    className="btn btn-primary m-2">Add to cart</button>
                }
            </div>
        </div>
     );
}
export default BookItem;
