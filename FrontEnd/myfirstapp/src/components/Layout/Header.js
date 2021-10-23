import React, { Component, useContext } from 'react'
import {CSVLink} from 'react-csv';
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
            username: localStorage.getItem("currentUsername") !== null ? localStorage.getItem("currentUsername") : "",
            displayName: "",
            userType: "",
            userTypeRequest: "",
            errors: {},
            userData : [[]],
            bookData : [[]],
            orderData : [[]],
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
        axios.get(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/getUser`, {params : {username : username}})
            .then(res => {
            const user = res.data;
            this.setState({username : user.username, displayName : user.displayName, userType:user.userType, userTypeRequest:user.userTypeRequest});
        })
        .catch(err=>console.log(err))
    }
    componentDidMount() 
    {
        this.getUserDetails(this.state.username);
        axios.get(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/all`)
        .then(res => {
            const users = res.data;
            this.setState({userData : users});
        }).catch(err => console.log(err))
        axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/all`)
        .then(res => {
          const books = res.data;
          this.setState({bookData : books});
        }).catch(err => console.log(err))
        axios.get(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/all`)
        .then(res => {
          const orders = res.data;
          this.setState({orderData : orders});
        }).catch(err=>console.log(err))
    }
  
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{height:100}}>
                <div className="navbar-header">
                    <a className="navbar-brand" title="Press to go back homepage" style={{fontSize : 40, fontFamily : 'sans-serif', margin:'10px' }} href="/">
                        Bookeroo
                        <i className="fas fa-book" style={{marginLeft : '10px'}}></i>
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
                                    {
                                        // this.state.userType !== "Normal Customer" ?
                                        <>
                                        <li className="nav-item">
                                            <a className="nav-link " href="/post"  title="Post a new post">
                                                Post Books
                                            </a>
                                        </li>
                                        <li>
                                            <a className="nav-link " href="/orderManagement"  title="Go to Order Management Page">
                                                Order Management
                                            </a>     
                                        </li>     
                                        </>   
                                        // : null
                                    }
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" title="Account dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Account
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item"  title="User page where you can change details and password" href={"/user/" + this.state.username}>{this.state.displayName}'s Page</a>
                                        <a className="dropdown-item"  title="Order History Page" href={"/orders"}>Orders</a>
                                        {
                                            this.state.userType==="Admin" ?
                                            <>
                                                <a className="dropdown-item" title="Where you can delete and manage other users"href={"/userManagement"}>User Management</a>
                                                <CSVLink data={this.state.userData} title="Download UserData.csv" filename={"UserData.csv"}>UserData</CSVLink>
                                                <CSVLink data={this.state.bookData} title="Download BookData.csv" filename={"BookData.csv"} >BookData</CSVLink>
                                                <CSVLink data={this.state.orderData} title="Download OrderData.csv" filename={"OrderData.csv"}>OrderData</CSVLink>
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
                                <a title="Go to Cart Page" className="nav-link" href="/cart">
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