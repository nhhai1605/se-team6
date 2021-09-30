import React, { Component } from "react";
import axios from "axios";

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
      username : "",
      rate : "",
      currentUsername: localStorage.getItem('currentUsername'),
      currentUserType: "",
      bookExist: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
  }

  getBook=(id)=>{
    axios.get("http://localhost:8081/api/books/getBook", {params : {id : this.state.id}})
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
        this.setState({title:book.title, author:book.author, description:book.description, price:book.price, quantity:book.quantity, username:book.username, rate:book.rate});
    })
    .catch(err=>console.log(err))
  }

  getUserDetails=(username)=>{
      axios.get("http://localhost:8080/api/users/getUser", {params : {username : this.state.currentUsername}})
          .then(res => {
          const user = res.data;
          this.setState({currentUserType : user.userType});
      })
      .catch(err=>console.log(err))
  }
  componentDidMount()
  {
    this.getBook(this.state.id);
    this.getUserDetails(this.state.currentUsername);
  }

  onSubmit(e) {
    e.preventDefault();
  }
  onSubmitDelete(e) {
    e.preventDefault();
    console.log("delete");
    const idTitleRequest =
    {
      id : this.state.id,
      title : this.state.title
    }
    axios.post("http://localhost:8081/api/books/deleteBook", idTitleRequest)
    .then(window.location.href="/").catch(err=>this.setState({errors : err.response.data}));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var url = "";
    try
    {
        url = require("../../BookCover/"+this.state.id+".jpg");
    }
    catch
    {
        url = require("../../uploads/noimage.jpg");
    }
    return (
      <div style={{textAlign:'center'}}>
        {
            this.state.bookExist ?
            <>
                <h1>Book Page</h1>
                <img style={{display: "block", margin: "0 auto 10px", height: "400px"}} src={url}  alt={this.state.id}/>
                <h3>BookID: {this.state.id}</h3>
                <h3>Title: {this.state.title}</h3>
                <h3>Author: {this.state.author}</h3>
                <h3>Username: {this.state.username}</h3>
                <h3>Price: {this.state.price}</h3>
                <h3>Quantity: {this.state.quantity}</h3>
                <h3>Description: {this.state.description}</h3>
                <h3>Rate: {this.state.rate}</h3>
                {
                  this.state.username === this.state.currentUsername || this.state.currentUserType === "Admin" ?
                  <form onSubmit={this.onSubmitDelete}>
                  <button className="btn btn-danger" style={{margin:10}}>Delete Post</button>
                  </form>
                  :null
                }
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