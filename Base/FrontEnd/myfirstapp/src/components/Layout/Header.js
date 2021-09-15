import React, { Component, Link, useContext } from 'react'
import setJWTToken from "../../securityUtils/setJWTToken";
import styles from './Header.module.css';
import { CartContext } from '../Store/Context/CartContext';
import {CartIcon} from '../icons';

const ItemCount = () => {
    const {itemCount} = useContext(CartContext);
    return itemCount;
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          itemCount: 0,
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
        localStorage.removeItem("currentDisplayName");
        setJWTToken(false);
    }

    render() {
        const itemCount = this.state.itemCount;
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Bookeroo
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
                <header className={styles.header}>
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        {
                            localStorage.jwtToken ?
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href={"/user/" + localStorage.getItem("currentUsername")}>
                                        {localStorage.getItem('currentDisplayName')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onLogout} href="/">
                                        Logout
                                    </a>
                                </li>
                            </>
                            :
                            <> 
                                <li className="nav-item">
                                    <a className="nav-link " href="/cart">
                                        <CartIcon/>
                                        Cart ({<ItemCount/>} items)
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="/register">
                                        Register
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                </header>
                
            </div>
        </nav>
            </div>
        )
    }
}
export default Header;