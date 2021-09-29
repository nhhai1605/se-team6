import React, { Component, Link, useContext } from 'react'
import setJWTToken from "../../securityUtils/setJWTToken";
import styles from '../styles/Header.module.css';
import { CartContext } from '../Store/Context/CartContext';
import {CartIcon} from '../icons';
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const ItemCount = () => {
    const {itemCount} = useContext(CartContext);
    return itemCount;
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("currentUsername") !== null ?  localStorage.getItem("currentUsername") : "",
            displayName: "",
            userType: "",
            userTypeRequest: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
      }
    
    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }
    
    onLogout()
    {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("currentUsername");
        setJWTToken(false);
    }

    getUserDetails=(username)=>{
        axios.get("http://localhost:8080/api/users/getUser", {params : {username : this.state.username}})
            .then(res => {
            const user = res.data;
            this.setState({username : user.username, displayName : user.displayName, userType:user.userType, userTypeRequest:user.userTypeRequest});
        })
        .catch(err=>console.log(err))
    }
    componentDidMount() 
    {
        this.getUserDetails(this.state.username);
    }
  
    render() {
        const itemCount = this.state.itemCount;
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary" style={{height:100}}>
                <div className="navbar-header">
                    <a className="navbar-brand" style={{fontSize : 30}} href="/">
                        Bookeroo
                    </a>
                </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={styles.header} id="mobile-nav">
                        <ul className="nav navbar-nav" style={{float:'right'}}>
                            {
                                localStorage.jwtToken ?
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link " href="/post">
                                            Post
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Account
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item"  href={"/user/" + this.state.username}>{this.state.displayName}'s Page</a>
                                        {
                                            this.state.userType==="Admin" ?
                                            <>
                                             <a className="dropdown-item"  href={"/userManagement"}>User Management</a>
                                            </>:null
                                        }
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" onClick={this.onLogout} href="/">Logout</a>
                                        </div>
                                    </li>
                                </>
                                :
                                <> 
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Account
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/login">
                                            Login
                                        </a>
                                        <a className="dropdown-item" href="/register">
                                            Register
                                        </a>
                                        </div>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                <a className="nav-link" href="/cart">
                                    <CartIcon/>
                                    Cart ({<ItemCount/>} items)
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;