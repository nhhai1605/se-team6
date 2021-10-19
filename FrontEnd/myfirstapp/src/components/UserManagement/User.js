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
        axios.get("http://localhost:8080/api/users/getUser", {params : {username : username}})
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
        <div >
        {   
            this.state.userExist ?
            <>
                <h1 style={{textAlign:'center', margin:"2%"}}>User Page</h1>
                <div style={{display: 'flex' }} >
                    <div id ="div1" style={{border:"solid black", backgroundColor : 'rgb(242, 242, 242)', borderRadius:'10px', height: '800px',width:'40%', padding:"2%", margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
                        <h2 style={{textAlign:'center'}}>User Detail</h2>
                        <div style={{display: 'flex',justifyContent: 'center'}}>
                        <img src={DefaultUserPic} alt="User's Avatar"/>
                        </div >
                        <h3>Email/Username: {this.state.username} </h3>
                        <h3>Display Name: {this.state.displayName}</h3>
                        <h3>Full Name: {this.state.fullName}</h3>
                        <h3>Current User Type: {this.state.userType}</h3>
                        <h3>Pending User Type: {this.state.userTypeRequest}</h3>
                        {
                    this.state.username === localStorage.getItem("currentUsername") ?
                    <>
                    <div style={{display: 'flex', justifyContent:'initial'}}>

                        <button className="btn btn-secondary"  onClick={this.togglePopUpDetail} style={{margin:'10px', }} title="Click to change user details">Change Details</button>
                        <button className="btn btn-outline-secondary" onClick={this.togglePopUpPassword}style={{margin:'10px',}} >Change Password</button>
                        </div>
                    
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
                    </div>
                        
                
                {
                    this.state.seenPassword ?
                    <>
                        <PopUpPassword toggle={this.togglePopUpPassword} username={this.state.username}/>
                    </>
                    : null
                }
                {
                    this.state.seenDetail ?
                    <>
                        <PopUpDetail toggle={this.togglePopUpDetail} username={this.state.username}/>
                    </>
                    : null
                }
                <div style={{border:"solid black", borderRadius:'10px', height: '800px', width:'60%',padding:"2%",margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
                    <h2 style={{textAlign:'center'}}>User Post</h2>
                    </div>
                </div>
                
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