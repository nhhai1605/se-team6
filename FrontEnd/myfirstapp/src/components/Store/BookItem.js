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
        <div className="card card-body" style={{borderColor:'black', borderWidth: 2, backgroundColor : 'white'}}>
            <img style={{display: "block", margin: "5% auto 5%", height: "400px",  width: "auto", maxWidth:"300px", wordWrap: "break-word"}} className="img-fluid" src={"https://se-team6.s3.amazonaws.com/book" + book.id + ".jpg"} alt={book.id}/><br />
            <h4 className="text-left">ID: {book.id}</h4>
            <h4 className="text-left">Title: {book.title}</h4>
            <h4 className="text-left">Author: {book.author}</h4>
            <h4 className="text-left">ISBN: {book.isbn}</h4>
            <h4 className="text-left">Rate: {parseFloat(book.rate).toFixed(1)}/5</h4>
            <h4 className="text-left">Category: {book.category}</h4>
            <h4 className="text-left">Seller: <a href={"/user/"+book.username}>{book.displayName}</a></h4>
            <h4 className="text-left">Quantity: {book.quantity > 0 ? book.quantity : 'Sold out'}</h4>
            <h4 className="text-left">Price: {book.type === "Share" ? "Book for Share" : formatNumber(book.price)}</h4>
            <div className="text-right">
                <Link to={"/book/" + book.id} className="btn btn-info m-2" title="Click to get more details about book">Details</Link>
                {
                    Number(book.quantity) > 0 ?
                    <>
                    {
                        isInCart(book) && 
                        <button 
                        onClick={() => increase(book)}
                        className="btn btn-outline-primary m-2" title="Click to add more books">Add more</button>
                    }
                    {
                        !isInCart(book) && 
                        <button 
                        onClick={() => addProduct(book)}
                        className="btn btn-primary m-2" title="Click to add a book to cart">Add to cart</button>
                    }
                    </>
                    :
                    <button className="btn btn-danger m-2" title="Books are out of stock" disabled>Sold out</button>
                }
            </div>
        </div>
     );
}
export default BookItem;
