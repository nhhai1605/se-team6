import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

class Post extends Component {
    constructor(props){
        super(props);

    this.state = {
      username: localStorage.getItem("currentUsername"),
      displayName: "",
      title: "",
      author: "",
      quantity: 100,
      price: 100,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newBook = {
      username : this.state.username,
      displayName : this.state.displayName,
      title: this.state.title,
      author: this.state.author,
      quantity: this.state.quantity,
      price: this.state.price,
    };
    axios.post("http://localhost:8081/api/books/create", newBook)
        .then(res => {window.location.href="/"}).catch(err=>this.setState({errors : err.response.data}));
  }

  componentDidMount() 
  {
      this.getUserDetails(this.state.username);
  }

  getUserDetails=(username)=>{
    axios.get("http://localhost:8080/api/users/getUser", {params : {username : this.state.username}})
        .then(res => {
        const user = res.data;
        this.setState({displayName : user.displayName});
    })
    .catch(err=>console.log(err))
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

  render() {
      const { errors } = this.state;
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Post new book</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.title
                    }) }
                    placeholder="Title"
                    name="title"
                    value= {this.state.title}
                    onChange = {this.onChange}
                    minLength="6" maxLength="100"
                    required
                  />
                  {errors.title && (
                      <div className= "invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.author
                    }) }
                    placeholder="Author"
                    name="author"
                    value= {this.state.author}
                    onChange = {this.onChange}
                    minLength="6" maxLength="100"
                    required
                  />
                  {errors.author && (
                      <div className= "invalid-feedback">{errors.author}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.quantity
                    }) }
                    placeholder="Quantity"
                    name="quantity"
                    value= {this.state.quantity}
                    onChange = {this.onChange}
                    minLength="6" maxLength="100" required
                  />
                  {errors.quantity && (
                      <div className= "invalid-feedback">{errors.quantity}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.price
                    }) }
                    placeholder="Price"
                    name="price"
                    value= {this.state.price}
                    onChange = {this.onChange}
                    minLength="6" maxLength="100" required
                  />
                  {errors.price && (
                      <div className= "invalid-feedback">{errors.price}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default(Post);