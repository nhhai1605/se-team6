import DefaultUserPic from "../../uploads/team-male.jpg";
import React, { Component } from "react";
import axios from "axios";
import styles from '../styles/BookGrid.module.css';

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

    onSubmit(e)
    {
        e.preventDefault();
        if(this.state.status === "Approve" || this.state.status === "Reject")
        {
            const userRequest = 
            {
                username: this.state.username,
                userType: this.state.userType,
                userTypeRequest: this.state.userTypeRequest,
                status : this.state.status,
            }
            axios.post("http://localhost:8080/api/users/changeUserType", userRequest)
            .then(window.location.reload(false)).catch(err=>this.setState({errors : err.response.data}));
        }
        else if(this.state.status === "Delete")
        {
            const idUsernameRequest =
            {
                username : this.state.username,
                id : this.state.id
            }
            axios.post("http://localhost:8080/api/users/deleteUser", idUsernameRequest)
            .then(window.location.reload(false)).catch(err=>this.setState({errors : err.response.data}));
        }
        else
        {
            window.location.href="/user/" + this.state.username;
        }
    };
    render()
    {
        return(
                <div className="card card-body" style={{borderColor:'grey', borderWidth: 2}}>
                    <img style={{display: "block", margin: "0 auto 10px", maxHeight: "400px"}} className="img-fluid" src={DefaultUserPic} alt=""/><br />
                    <h5 className="text-left">ID: {this.state.id}</h5>
                    <h5 className="text-left">Username: {this.state.username}</h5>
                    <h5 className="text-left">Display Name: {this.state.displayName}</h5>
                    <h5 className="text-left">Full Name: {this.state.fullName}</h5>
                    <h5 className="text-left">Current User Type: {this.state.userType}</h5>
                    <h5 className="text-left">User Type Request: {this.state.userTypeRequest}</h5>
                    <form onSubmit={this.onSubmit}>
                    {
                        
                        this.state.userTypeRequest !== "None" ?
                        <>
                            <button className="btn btn-success" onClick={() => this.setState({ status: "Approve" })}  style={{margin:10}}>Approve</button>
                            <button className="btn btn-danger" onClick={() => this.setState({ status: "Reject"})} style={{margin:10}}>Reject</button>
                        </>
                        : null
                    }
                    {
                        this.state.username !== localStorage.getItem("currentUsername") ? 
                        <>
                        <button className="btn" onClick={() => this.setState({ status: "Delete" })} style={{margin:10, borderColor:'grey', background:"grey", color:'white'}}>Delete User</button>
                        </>
                        : null
                    }
                    <button className="btn btn-info" onClick={() => this.setState({ status: "Detail"})} style={{margin:10}}>User Detail</button>
                    </form>
                </div>
            
        )
    }
}
export default UserCard;
