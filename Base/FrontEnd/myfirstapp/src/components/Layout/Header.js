import React, { Component, Link, useContext } from 'react'
import setJWTToken from "../../securityUtils/setJWTToken";
import styles from '../styles/Header.module.css';
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
                            <li className="nav-item">
                                <a className="nav-link" href="/cart">
                                    <CartIcon/>
                                    Cart ({<ItemCount/>} items)
                                </a>
                            </li>
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
                </nav>
            </div>
        )
    }
}
export default Header;