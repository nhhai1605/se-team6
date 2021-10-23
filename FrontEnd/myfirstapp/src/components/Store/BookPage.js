import React, { Component } from "react";
import axios from "axios";
import PopUpReview from "./PopUpReview";
import { formatNumber } from './utils';

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.id,
      title : "",
      author : "",
      description : "",
      price : "",
      quantity : "",
      username: "",
      displayName: "",
      isbn: "",
      rate : "",
      deleteReviewId : null,
      reviews: [],
      type: "",
      seenPopUp : false,
      currentUsername: localStorage.getItem('currentUsername'),
      currentDisplayName : "",
      currentUserType: "",
      category: "",
      bookExist: false,
      config: {
        bucketName: "se-team6",
         region: "us-east-1",
         accessKeyId: "AKIAYLQI4NSF75XPLRVA",
         secretAccessKey: "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",
         s3Url: 'https://se-team6.s3.amazonaws.com/'
       },
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
    this.onSubmitDeleteReview = this.onSubmitDeleteReview.bind(this);
  }

  getBook=(id)=>{
    axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/getBook`, {params : {id : id}})
        .then(res => {
        const book = res.data;
        if(book.id == null)
        {
            this.setState({bookExist : false});
        }
        else
        {
            this.setState({bookExist : true});
        }
        this.setState({category:book.category, type:book.type, isbn:book.isbn, title:book.title, author:book.author, description:book.description, price:book.price, quantity:book.quantity, username:book.username, rate:book.rate, displayName : book.displayName});
    })
    .catch(err=>console.log(err))
  }

  getUserDetails=(username)=>{
      axios.get(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/getUser`, {params : {username : username}})
          .then(res => {
          const user = res.data;
          this.setState({currentUserType : user.userType, currentDisplayName: user.displayName});
      })
      .catch(err=>console.log(err))
  }

  getReviews=(bookId)=>{
    axios.get(`${process.env.REACT_APP_REVIEWS_ENDPOINT}/api/reviews/getReviewsForBook`, {params : {bookId : bookId}})
    .then(res => {
      const reviews = res.data;
      this.setState({reviews : reviews});
    }).catch(err=>console.log(err))
  }
  componentDidMount()
  {
    this.getBook(this.state.id);
    this.getReviews(this.state.id);
    if(this.state.currentUsername !== null)
    {
      this.getUserDetails(this.state.currentUsername);
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onSubmitDelete(e) 
  {
    e.preventDefault();
    axios.delete(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/deleteBook/` + this.state.id)
      .then(res=>{window.location.href='/'
        }).catch(err=>this.setState({errors : err.response.data}));
  }

  onSubmitDeleteReview(e) 
  {
    axios.delete(`${process.env.REACT_APP_REVIEWS_ENDPOINT}/api/reviews/deleteReview/` + this.state.deleteReviewId)
    .then().catch(err=>this.setState({errors : err.response.data}));
    this.setState({deleteReviewId : null});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  togglePopUpReview = () => 
  {
      this.setState({seenPopUp:!this.state.seenPopUp});
  };

  render() {
    const reviews = this.state.reviews;
    return (

      <div>
      {
        this.state.bookExist ?
        <>

          <h1 style={{textAlign:'center', margin:"2%"}}>Book Page</h1>
          <div style={{display: 'flex'}}>
            <div style={{border:"solid black", borderRadius:'10px', height: '900px',width:'30%', padding:"2%", margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
              <h2 style={{textAlign:'center'}}>Detail</h2>
                  <img style={{ display: "block", margin: "5% auto 5%", width: "auto", maxWidth: "400px" }} alt={this.state.id} src={"https://se-team6.s3.amazonaws.com/book" + this.state.id+ ".jpg"} />
              <h3>BookID: {this.state.id}</h3>
              <h3>Title: {this.state.title}</h3>
              <h3>Author: {this.state.author}</h3>
              <h3>ISBN: {this.state.isbn}</h3>
              <h3>Category: {this.state.category}</h3>
              <h3>Poster: <a href={"/user/"+this.state.username}>{this.state.displayName}</a></h3>
                  <h3>Price: {this.state.type === "Share" ? "Book for Share" : formatNumber(this.state.price)}{ this.state.type === "Sell Used" ? "(Used)" : "(New)"}</h3>
              <h3>Quantity: {this.state.quantity}</h3>
              <h3>Description: {this.state.description}</h3>
              <h3>Rate: {parseFloat(this.state.rate).toFixed(1)}/5</h3>
              
              <button className="btn btn-primary" onClick={this.togglePopUpReview}  style={{margin:10}}  title="To add review of book">Add Review</button>
              {
                    this.state.seenPopUp ?
                    <>
                        <PopUpReview toggle={this.togglePopUpReview} bookId={this.state.id} username={this.state.currentUsername} displayName={this.state.currentDisplayName}/>
                    </>
                    : null
                }
              {
                this.state.username === this.state.currentUsername || this.state.currentUserType === "Admin" ?
                <form onSubmit={ e => {if(window.confirm('Are You Sure You Want To Delete?')) {this.onSubmitDelete(e)}} }>
                <button className="btn btn-danger" style={{margin:10}} title="To delete book post">Delete Post</button>
                </form>
                :null
              } 
            </div>

            <div style={{border:"solid black", borderRadius:'10px', height: '900px', width:'52%',padding:"2%",margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
              <h2 style={{textAlign:'center'}}>Review</h2>
              {
                reviews.map(review => (
                  <div key={review.id} style={{border:"solid grey", borderRadius:'10px', height:'25%', width:'96%', padding:"2%",margin:"2%", wordWrap: "break-word", overflow: 'auto'}}>
                    {
                      review.username !== "Anonymous" ?
                      <h5>From:<a href={"/user/"+review.username}>{review.displayName}</a></h5>
                      : 
                      <h5>From: {review.displayName}</h5>
                    }
                    <h5>Rate: {review.rating}/5</h5>
                    
                    <h5>Review Content: {review.content}</h5>
                    {
                      this.state.currentUserType === "Admin" ?
                      <>
                      <form onSubmit={ e => {if(window.confirm('Are You Sure You Want To Delete Review?')) {this.onSubmitDeleteReview(e)}} }>
                        <button className="btn btn-danger" onClick={()=>{this.setState({deleteReviewId : review.id})}}style={{margin:10}}  title="To delete review">Delete Review</button>
                      </form>
                      </>
                      : null
                    }
                  </div>
                ))
              }
              
            </div>
          </div>
        </>
        : 
        <>
            <h1>Error 404 - Book doesn't exist!</h1>
        </>
      }
      </div>
    );
  }
}


export default (BookPage);