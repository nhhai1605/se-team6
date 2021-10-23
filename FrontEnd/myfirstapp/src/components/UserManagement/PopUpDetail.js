import React, { Component } from "react";
import styles from "../styles/PopUp.module.css"

import classnames from "classnames";

import axios from "axios";

class PopUpDetail extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
        username : this.props.username,
        displayName : "",
        fullName : "",
        userType : "",
        userTypeRequest: "",
        currentOption: "",
        errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleClick = () => {
    this.props.toggle();
    };

    getUserDetails=(username)=>{
        axios.get(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/getUser`, {params : {username : username}})
            .then(res => {
            const user = res.data;
            this.setState({displayName : user.displayName, fullName : user.fullName, userType : user.userType, userTypeRequest : user.userTypeRequest, currentOption: user.userTypeRequest});
        })
        .catch(err=>console.log(err))
    }

    componentDidMount() 
    {
        this.getUserDetails(this.state.username);
    }

    onSubmit(e) 
    {
        const changeDetailRequest = {
            username: this.state.username,
            displayName: this.state.displayName,
            fullName: this.state.fullName,
            userType: this.state.userType,
            userTypeRequest: this.state.currentOption
        }; 
        axios.post(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/changeDetail`, changeDetailRequest).then().catch(err => this.setState({ errors: err.response.data }));
        axios.put(`${process.env.REACT_APP_REVIEWS_ENDPOINT}/api/reviews/changeUserDisplayName/` + this.state.username + "/" + this.state.displayName).then().catch(err=>this.setState({errors : err.response.data}));
        axios.put(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/changeUserDisplayName/` + this.state.username + "/" + this.state.displayName).then().catch(err=>this.setState({errors : err.response.data}));
    }

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        const { errors } = this.state;
        return (
            <div className={styles.modal_content_detail}>
                <button className={styles.close} onClick={this.handleClick}>&times;</button>
                <div style={{textAlign:'center'}}>
                <h2>Change Detail</h2>
                <br />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <h4>Display Name: </h4>
                    <input 
                        className= {classnames("form-control form-control-lg", {
                            "is-invalid": errors.displayName
                        }) }
                        type="text"
                        placeholder="Display Name"
                        name="displayName"
                        value= {this.state.displayName}
                        onChange = {this.onChange}

                    /> 
                    {errors.displayName && (
                    <div className="invalid-feedback">{errors.displayName}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <h4>Full Name: </h4>
                    <input
                        className= {classnames("form-control form-control-lg", {
                            "is-invalid": errors.fullName
                        }) }
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value= {this.state.fullName}
                        onChange = {this.onChange}

                    />
                    {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                    )}

                    <h4>Current User Type: {this.state.userType}</h4>
                    <h4>Pending User Type: {this.state.userTypeRequest}</h4>
                    <select defaultValue={"No Request"} className="btn btn-outline-primary dropdown-toggle mt-3" name="currentOption" style={{marginBottom:10}} onChange={this.onChange}>
                    <option value={this.state.userTypeRequest}>No Request</option>
                    <option value="None">Delete Pending Request</option>
                    {
                        this.state.userType === "Normal Customer" ?
                        <>
                            <option disabled value="Normal Customer">Normal Customer</option>
                            <option value="Publisher">Publisher</option>
                            <option value="Shop Owner">Shop Owner</option>
                        </>
                        :
                        this.state.userType === "Publisher" ?
                        <>
                            <option value="Normal Customer">Normal Customer</option>
                            <option disabled value="Publisher">Publisher</option>
                            <option value="Shop Owner">Shop Owner</option>
                        </>
                        :
                        this.state.userType === "Author" ?
                        <>
                            <option value="Normal Customer">Normal Customer</option>
                            <option value="Publisher">Publisher</option>
                            <option disabled value="Shop Owner">Shop Owner</option>
                        </>
                        : null
                    }
                    </select>
                    </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                </form>
            </div>
        );
    }
}

export default (PopUpDetail);