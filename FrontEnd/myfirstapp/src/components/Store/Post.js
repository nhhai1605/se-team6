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
      description : "",
      postImage : "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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
      description: this.state.description,
      error:{}
    };
    axios.post("http://localhost:8081/api/books/create", newBook)
        .then(res => (console.log(res.data.id), window.location.href="/")).catch(err=>this.setState({errors : err.response.data}));
  }

  componentDidMount() 
  {
      this.getUserDetails(this.state.username);
  }

  getUserDetails=(username)=>{
    axios.get("http://localhost:8080/api/users/getUser", {params : {username : username}})
        .then(res => {
        const user = res.data;
        this.setState({displayName : user.displayName});
    })
    .catch(err=>console.log(err))
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

  onFileChange = (event) => {
    this.setState({
      postImage: event.target.files[0]
    });
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
                  <h4>Title:</h4>
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.title
                    }) }
                    placeholder="Title"
                    name="title"
                    value= {this.state.title}
                    onChange = {this.onChange}
                    minLength="6" maxLength="60"
                    required
                  />
                  {errors.title && (
                      <div className= "invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <h4>Author:</h4>
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.author
                    }) }
                    placeholder="Author"
                    name="author"
                    value= {this.state.author}
                    onChange = {this.onChange}
                    minLength="6" maxLength="60"
                    required
                  />
                  {errors.author && (
                      <div className= "invalid-feedback">{errors.author}</div>
                  )}
                </div>
                <div class="form-group">
                  <h4>Description:</h4>
                  <textarea className= {classnames("form-control form-control-lg", {"is-invalid": errors.description}) } 
                  placeholder="Description" name="description" value= {this.state.description} onChange = {this.onChange} 
                  rows="4" minLength="6" maxLength="60" required></textarea>
                </div>
                <div className="form-group">
                  <h4>Quantity:</h4>
                  <input
                    type="number"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.quantity
                    }) }
                    placeholder="Quantity"
                    name="quantity"
                    value= {this.state.quantity}
                    onChange = {this.onChange}
                    minLength="6" maxLength="60" required
                  />
                  {errors.quantity && (
                      <div className= "invalid-feedback">{errors.quantity}</div>
                  )}
                </div>
                <div className="form-group">
                  <h4>Price: (AU$)</h4>
                  <input
                    type="number"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.price
                    }) }
                    placeholder="Price"
                    name="price"
                    value= {this.state.price}
                    onChange = {this.onChange}
                    minLength="6" maxLength="60" required
                  />
                  {errors.price && (
                      <div className= "invalid-feedback">{errors.price}</div>
                  )}
                </div>
                <div className="form-group">
                  <h4>Book Cover:</h4>
                  <input type="file" accept="image/*" name="postImage" onChange = {this.onFileChange}/>
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default(Post);