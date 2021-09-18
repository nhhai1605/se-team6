import React, { Component } from "react";
import axios from "axios";
import DefaultUserPic from "../../uploads/team-male.jpg";
import styles from '../styles/BookGrid.module.css';
import UserCard from './UserCard';

class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            users: [],
            numOfRequests: 0,
            erros: {},
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() 
    {
        axios.get("http://localhost:8080/api/users/all")
        .then(res => {
            const users = res.data;
            this.setState({users : users});
            this.updateNumOfRequests();
        }).catch(err=>console.log(err))
    }
    onSubmit(e)
    {
        e.preventDefault();
    };
    updateNumOfRequests()
    {
        this.state.users.map(user => (user.userTypeRequest !== "" ? this.setState({numOfRequests: this.state.numOfRequests + 1}) : console.log("null")));
    }
    render() {
        const {users} = this.state;
        return (
            <div className={styles.p__grid}>
                {
                    this.state.numOfRequests > 0 ?
                    <>
                    {
                        users.map(user => (
                            user.userTypeRequest !== "" ? 
                            <UserCard key={user.id} username={user.username}/>
                            : null
                        ))
                    }
                    </> 
                    : <h1>There are no requests!</h1>
                }
            </div>
        );
    }
}


export default (UserManagement);
