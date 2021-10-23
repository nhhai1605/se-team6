import React, { Component } from "react";
import styles from "../styles/PopUp.module.css"

import classnames from "classnames";

import axios from "axios";

class PopUpPassword extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
        username : this.props.username,
        password: '',
        newPassword: '',
        confirmPassword: '',
        errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleClick = () => {
    this.props.toggle();
    };

    onSubmit(e) 
    {
        const changePasswordRequest = {
            username: this.state.username,
            password: this.state.password,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }; 
        axios.post(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/changePassword`, changePasswordRequest)
        .then().catch(err=>this.setState({errors : err.response.data}));
    }

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;
        return (
            <div className={styles.modal_content_password}>
                <button className={styles.close} onClick={this.handleClick}>&times;</button>
                <div style={{textAlign:'center'}}>
                <h2>Change Password</h2>
                <br />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input 
                        className= {classnames("form-control form-control-lg", {
                            "is-invalid": errors.password
                        }) }
                        type="password"
                        placeholder="Password"
                        name="password"
                        value= {this.state.password}
                        onChange = {this.onChange}
                        

                    /> 
                    {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <input
                        className= {classnames("form-control form-control-lg", {
                            "is-invalid": errors.newPassword
                        }) }
                        type="password"
                        placeholder="New Password"
                        name="newPassword"
                        value= {this.state.newPassword}
                        onChange = {this.onChange}
                        
                    />
                    {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <input
                        className= {classnames("form-control form-control-lg", {
                            "is-invalid": errors.confirmPassword
                        }) }
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value= {this.state.confirmPassword}
                        onChange = {this.onChange}
                        
                    />
                    {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                    </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                </form>
            </div>
        );
    }
}

export default (PopUpPassword);