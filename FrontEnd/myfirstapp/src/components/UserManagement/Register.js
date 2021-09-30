import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";

class Register extends Component {
    constructor(){
        super();

    this.state = {
      username: "",
      fullName: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      userType: "Normal Customer",
      userTypeRequest: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      displayName: this.state.displayName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userType: this.state.userType,
      userTypeRequest: this.state.userTypeRequest
    };
    axios.post("http://localhost:8080/api/users/register", newUser)
        .then(res => {window.location.href="/login"}).catch(err=>this.setState({errors : err.response.data}));
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }


  render() {
      const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.fullName
                    }) }
                    placeholder="Full Name"
                    name="fullName"
                    value= {this.state.fullName}
                    onChange = {this.onChange}
                  />
                  {errors.fullName && (
                      <div className= "invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.displayName
                    }) }
                    placeholder="Display Name"
                    name="displayName"
                    value= {this.state.displayName}
                    onChange = {this.onChange}
                    
                  />
                  {errors.displayName && (
                      <div className= "invalid-feedback">{errors.displayName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    }) }
                    placeholder="Email Address"
                    name="username"
                    value= {this.state.username}
                    onChange = {this.onChange}
                  />
                  {errors.username && (
                      <div className= "invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    }) }
                    placeholder="Password"
                    name="password"
                    value= {this.state.password}
                    onChange = {this.onChange}
                  />
                  {errors.password && (
                      <div className= "invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className= {classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    }) }
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value= {this.state.confirmPassword}
                    onChange = {this.onChange}
                  />
                  {errors.confirmPassword && (
                      <div className= "invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                <div>
                <select className="btn btn-outline-primary dropdown-toggle" name="userTypeRequest" style={{marginBottom:10}} onChange={this.onChange}>
                <option value="">Normal Customer</option>
                <option value="Publisher">Publisher</option>
                <option value="Author">Author</option>
                <option value="Admin">Admin</option>
                </select>
                </div>
                If you already have an account, please <a href = "/login">login</a> here! Other types of user beside Normal Customer will require admin to approve!
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default(Register);