import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import S3 from "react-aws-s3"

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
      userTypeRequest: "None",
      errors: {},
      userImage: "",
      config: {
        bucketName: "se-team6",
         region: "us-east-1",
         accessKeyId: "AKIAYLQI4NSF75XPLRVA",
         secretAccessKey: "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",
         s3Url: 'https://se-team6.s3.amazonaws.com/'
       },
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onFileChange = (event) => {
    this.setState({
      userImage: event.target.files[0]
    });
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
    axios.post(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/register`, newUser)
      .then(res => { const ReactS3Client = new S3(this.state.config);
        ReactS3Client.uploadFile(this.state.userImage, "user" + res.data.id + ".jpg").then(data => { console.log(data); window.location.href = "/login"; }).catch(err => { console.log(err); window.location.href = "/login"; })
      }).catch(err => this.setState({ errors: err.response.data }));
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
                  <h4>Full Name:</h4>
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
                  <h4>Display Name:</h4>
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
                  <h4>Username:</h4>
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
                <h4>Password:</h4>
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
                <h4>Confirm Password:</h4>
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
                <h4>User Type:</h4>
                <select className="btn btn-outline-primary dropdown-toggle" name="userTypeRequest" style={{marginBottom:10}} onChange={this.onChange}>
                <option value="">Normal Customer</option>
                <option value="Publisher">Publisher</option>
                <option value="Shop Owner">Shop Owner</option>
                <option value="Admin">Admin</option>
                </select>
                </div>
                <div className="form-group">
                  <h4>Avatar:</h4>
                  <input type="file" accept="image/*" name="userImage" onChange = {this.onFileChange}/>
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