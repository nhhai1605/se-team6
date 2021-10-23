import React, { Component } from "react";
import styles from "../styles/PopUp.module.css"

import classnames from "classnames";

import axios from "axios";

class PopUpReview extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            username : this.props.username,
            displayName: this.props.displayName,
            bookId : this.props.bookId,
            rating : 0,
            content : "",
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
        e.preventDefault();
        if(this.state.rating === 0)
        {
            this.setState({
                errors: {
                      ...this.state.errors,
                      rating: 'Need to rate!'
                }
            })
        }
        else
        {   
            const newReview = {
                username: this.state.username,
                displayName: this.state.displayName,
                bookId: this.state.bookId,
                rating: this.state.rating,
                content:this.state.content,
            }; 
            axios.post(`${process.env.REACT_APP_REVIEWS_ENDPOINT}/api/reviews/create`, newReview)
            .then(window.location.href="/book/" + this.state.bookId).catch(err=>this.setState({errors : err.response.data}));
        }
    }
    componentDidMount() 
    {
        console.log(this.state.displayName);
        if(this.state.username === null)
        {
            this.setState({username : "Anonymous", displayName: "Anonymous"});
        }
    }
    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { errors } = this.state;
        return (
            <div className={styles.modal_content_preview}>
                <button className={styles.close} onClick={this.handleClick}>&times;</button>
                <div style={{textAlign:'center'}}>
                <h2>Review</h2>
                <br />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4>Rating: </h4>
                        <div className={classnames(styles.rating,{"is-invalid": errors.rating})} style={{textAlign:'center'}} onChange = {this.onChange} > 
                        <input type="radio" name="rating" value="5" id="5" />
                        <label htmlFor="5">☆</label> 
                        <input type="radio" name="rating" value="4" id="4"/>
                        <label htmlFor="4">☆</label>
                        <input type="radio" name="rating" value="3" id="3"/>
                        <label htmlFor="3">☆</label> 
                        <input type="radio" name="rating" value="2" id="2"/>
                        <label htmlFor="2">☆</label> 
                        <input type="radio" name="rating" value="1" id="1"/>
                        <label htmlFor="1">☆</label>
                        </div>
                        {errors.rating && (
                        <div className="invalid-feedback" style={{fontSize:"2vh", margin:'10px'}}>{errors.rating}</div>
                        )}
                    </div>
                    <div className="form-group">
                    <h4>Review Content: </h4>
                    <textarea className= {classnames("form-control form-control-lg", {"is-invalid": errors.content})} 
                    style={{resize : 'none'}} placeholder="Review Content" name="content" value= {this.state.content} onChange = {this.onChange} 
                    rows="4" maxLength="100" required></textarea>
                    {errors.content && (
                    <div className="invalid-feedback">{errors.content}</div>
                    )}
                    </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                </form>
            </div>
        );
    }
}

export default (PopUpReview);