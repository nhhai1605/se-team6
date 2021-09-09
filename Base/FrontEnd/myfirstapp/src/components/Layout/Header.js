import React, { Component } from 'react'
import { logout } from "../../actions/securityActions";
 class Header extends Component {
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("currUsername"),
            logout: false
        }
      }
      onLogout = () => {
        this.setState({
          logout: !this.state.logout,
          username: null
        });
      };
    render() {
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
                <form action="/" method="get">
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Search"
                        name="s" 
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        {
                            localStorage.jwtToken ?
                            <>
                                <li className="nav-item">
                                    <a className="nav-link">
                                    {localStorage.getItem('currUsername')}
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
            </div>
        </nav>
            </div>
        )
    }
}
export default Header;