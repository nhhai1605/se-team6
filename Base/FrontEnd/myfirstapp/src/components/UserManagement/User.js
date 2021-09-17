import React, { Component } from "react";
import axios from "axios";
import DefaultUserPic from "../../uploads/team-male.jpg";
import PopUpDetail from "./PopUpDetail";
import PopUpPassword from "./PopUpPassword";

class User extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
        username: this.props.username,
        displayName: "",
        fullName: "",
        profileImage: "",
        userType: "",
        userTypeRequest: "",
        userExist : true,
        seenPassword : false,
        seenDetail: false,
        errors: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    getUserDetails=(username)=>{
        axios.get("http://localhost:8080/api/users/getUser", {params : {username : this.state.username}})
            .then(res => {
            const user = res.data;
            if(user.id == null)
            {
                this.setState({userExist : false});
            }
            else
            {
                this.setState({userExist : true});
            }
            this.setState({username : user.username, displayName : user.displayName, fullName : user.fullName, userType : user.userType, userTypeRequest : user.userTypeRequest});
        })
        .catch(err=>console.log(err))
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }

    togglePopUpPassword = () => 
    {
        this.setState({seenPassword:!this.state.seenPassword});
        this.setState({seenDetail:false});
    };
    togglePopUpDetail = () => 
    {
        this.setState({seenDetail:!this.state.seenDetail});
        this.setState({seenPassword:false});
    };

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount()
    {
        this.getUserDetails(this.state.username);
    };

    render() {
        return (
        <div>
        {   
            this.state.userExist ?
            <>
                <img src={DefaultUserPic}/>
                <h3>Email/Username: {this.state.username}</h3>
                <h3>Display Name: {this.state.displayName}</h3>
                <h3>Full Name: {this.state.fullName}</h3>
                <h3>Current User Type: {this.state.userType}</h3>
                {
                    this.state.userTypeRequest !== "" ?
                    <>
                    <h3>Pending User Type: {this.state.userTypeRequest}</h3>
                    </> : null
                }
                {
                    this.state.username === localStorage.getItem("currentUsername") ?
                    <>
                        <button className="btn btn-outline-primary" onClick={this.togglePopUpDetail} style={{margin:10}}>Change Details</button>
                        <button className="btn btn-outline-primary" onClick={this.togglePopUpPassword} style={{margin:10}}>Change Password</button>
                    </>
                    :
                    <>
                        {
                            localStorage.getItem("currentUsername") != null ?
                            <>
                                <button className="btn btn-outline-primary" style={{margin:10}}>Follow</button>
                            </> : null
                        }
                    </>
                }
                {
                    this.state.seenPassword ?
                    <>
                        <PopUpPassword toggle={this.togglePopUpPassword}/>
                    </>
                    : null
                }
                {
                    this.state.seenDetail ?
                    <>
                        <PopUpDetail toggle={this.togglePopUpDetail}/>
                    </>
                    : null
                }
            </>
            :
            <>
                <h3>404 - Not found!</h3>
            </>
        }
        </div>
        );
    }
}


export default (User);