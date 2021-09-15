import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import DefaultUserPic from "../../uploads/team-male.jpg";
import { useParams } from "react-router-dom";

class User extends Component {
    constructor(props){
        super(props);

    this.state = {
      username: this.props.username,
      fullName: this.props.fullName,
      displayName: this.props.displayName,
      profileImage: this.props.profileImage,
      password: this.props.password,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
    fetchUserDetails=(username)=>{
        axios.get("http://localhost:8080/users/getUser/"+username,{
            headers: {
                "content-type": "application/json"
            }
        }).then(res=>{
            console.log(res);
            this.setState({username:res.data.results[0].username});
            this.setState({profileImage:res.data.results[0].profileImage})
        })
        .catch(err=>console.log(err))
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
        username: this.state.username,
        fullName: this.state.fullName,
        oldPassword: this.state.password,
        newPassword: this.state.password,
        confirmPassword: this.state.confirmPassword
        };
    }


    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        this.fetchUserDetails(this.state.user_id);
    }

    render() {
        return (
        <div>
        <img src={DefaultUserPic}/>
        <h3>Email: {}</h3>
        <h3>Display name: {localStorage.getItem("currentDisplayName")}</h3>
        </div>
        );
    }
}


export default (User);