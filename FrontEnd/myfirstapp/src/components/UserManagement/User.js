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
        books : [],
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

    getBooks=(username)=>{
        axios.get("http://localhost:8081/api/books/getBooksFromUsername", {params : {username : username}})
            .then(res => {
                const books = res.data;
                this.setState({books : books});
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

        this.getBooks(this.state.username);
    };

    render() {
        const { books } = this.state;
        return (
        <div >
        {   
            this.state.userExist ?
            <>
                <h1 style={{textAlign:'center', margin:"2%"}}>User Page</h1>
                <div style={{display: 'flex' }} >
                    <div id ="div1" style={{border:"solid black", backgroundColor : 'rgb(242, 242, 242)', borderRadius:'10px', height: '900px',width:'40%', padding:"2%", margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
                        <h2 style={{textAlign:'center'}}>User Detail</h2>
                        <div style={{display: 'flex',justifyContent: 'center', marginBottom:50, marginTop:50}}>
                        <img src={DefaultUserPic} alt="User's Avatar"/>
                        </div>

                        <h3>Email/Username: {this.state.username} </h3>
                        <h3>Display Name: {this.state.displayName}</h3>
                        <h3>Full Name: {this.state.fullName}</h3>
                        <h3>Current User Type: {this.state.userType}</h3>
                        <h3>Pending User Type: {this.state.userTypeRequest}</h3>
                        {
                    this.state.username === localStorage.getItem("currentUsername") ?
                    <>
                    <div style={{display: 'flex', justifyContent:'initial'}}>
                        <button className="btn btn-outline-secondary"  onClick={this.togglePopUpDetail} style={{margin:'10px'}} title="Click to change user details">Change Details</button>
                        <button className="btn btn-outline-secondary" onClick={this.togglePopUpPassword}style={{margin:'10px'}}title="Click to change password" >Change Password</button>
                        </div>
                    
                    </>
                    :
                    <>
                        {
                            localStorage.getItem("currentUsername") != null ?
                            <>
                                <button className="btn btn-outline-secondary" style={{margin:10}} title="Click to follow user">Follow</button>
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
                <div style={{border:"solid black", borderRadius:'10px', height: '900px', width:'62%',padding:"2%",margin:"2% 2% 2%", wordWrap: "break-word", display: 'inline-block', overflow: 'auto'}}>
                    <h2 style={{ textAlign: 'center' }}>User Post</h2>
                    {
                        books.map(book => (
                        <div key={book.id} style={{border:"solid grey", borderRadius:'10px', height:'25%', width:'96%', padding:"2%",margin:"2%", wordWrap: "break-word", overflow: 'auto'}}>
                        <h5>Title:  <a href={"/book/"+book.id}>{book.title}</a></h5>
                        <h5>Author: {book.author}</h5>
                        <h5>Price: {book.price}</h5>
                        <h5>Quantity: {book.quantity}</h5>
                        </div>
                        ))
                    }
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