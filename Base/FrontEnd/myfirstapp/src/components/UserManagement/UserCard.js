import { Link } from 'react-router-dom';
import DefaultUserPic from "../../uploads/team-male.jpg";
import React, { Component } from "react";
import axios from "axios";

class UserCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            username :this.props.username,
            id : "",
            fullName :"",
            displayName: "",
            userType: "",
            userTypeRequest : "",
            status: "",
            errors : {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getUserDetails=(username)=>{
        axios.get("http://localhost:8080/api/users/getUser", {params : {username : this.state.username}})
            .then(res => {
            const user = res.data;
            this.setState({id:user.id, displayName : user.displayName, fullName : user.fullName, userType : user.userType, userTypeRequest : user.userTypeRequest});
        })
        .catch(err=>console.log(err))
    }

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() 
    {
        this.getUserDetails(this.state.username);
    }
    approveUser=(username)=>
    {

    }
    onSubmit(e)
    {
        e.preventDefault();
        const userRequest = 
        {
            username: this.state.username,
            userType: this.state.userType,
            userTypeRequest: this.state.userTypeRequest,
            status : this.state.status,
        }
        axios.post("http://localhost:8080/api/users/changeUserType", userRequest)
        .then(res => {window.location.href="/userManagement"}).catch(err=>this.setState({errors : err.response.data}));
    };
    render()
    {
        return(
            <form onSubmit={this.onSubmit}>
                <div className="card card-body" style={{borderColor:'grey', borderWidth: 2}}>
                    <img style={{display: "block", margin: "0 auto 10px", maxHeight: "400px"}} className="img-fluid" src={DefaultUserPic} alt=""/><br />
                    <h5 className="text-left">ID: {this.state.id}</h5>
                    <h5 className="text-left">Username: {this.state.username}</h5>
                    <h5 className="text-left">Display Name: {this.state.displayName}</h5>
                    <h5 className="text-left">Full Name: {this.state.fullName}</h5>
                    <h5 className="text-left">User Type Request: {this.state.userTypeRequest}</h5>
                    <button className="btn" onClick={() => this.setState({ status: "Approve" })}  style={{margin:10, backgroundColor:"green", outlineColor:"green",color:'white'}}>Approve</button>
                    <button className="btn" onClick={() => this.setState({ status: "Reject" })} style={{margin:10, backgroundColor:"red", outlineColor:"red",color:'white'}}>Reject</button>
                </div>
            </form>
        )
    }
}
export default UserCard;
