import React, { Component } from "react";
import axios from "axios";
import styles from '../styles/BookGrid.module.css';
import UserCard from './UserCard';

class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            users: [],
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
        }).catch(err=>console.log(err))
    }
    onSubmit(e)
    {
        e.preventDefault();
    };

    render() {
        const {users} = this.state;
        return (
            <div className={styles.userGrid}>
                {
                    users.map(user => (
                        
                        <UserCard key={user.id} username={user.username}/>
                        
                    ))
                }
            </div>
        );
    }
}


export default (UserManagement);
