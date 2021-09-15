import React, { Component } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, useRouteMatch, useParams, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import Homepage from "./components/Store/Homepage";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import User from "./components/UserManagement/User";

import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";

import SecuredRoute from "./securityUtils/SecureRoute";
import ProductsContextProvider from './components/Store/Context/ProductsContext';
import CartContextProvider from './components/Store/Context/CartContext';

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  }
}
const user = localStorage.getItem("currentUsername");
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ProductsContextProvider>
          <CartContextProvider>
            <Router>
              <div className="App">
                <Header/>
                {
                  //Public Routes
                }
                {
                user ? 
                <>
                  <Route exact path="/" component={Homepage} />
                  <Switch>
                  <Route path={'/user/:usernameString'} children = {<Child/>} />
                  </Switch>
                </>
                :
                <>
                  <Route exact path="/" component={Homepage} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login}/>
                </>

                }
                {
                  //Private Routes
                }          
              </div>
            </Router>
          </CartContextProvider>
        </ProductsContextProvider>
      </Provider>
    );
  }
}

function Child()
{
  let { usernameString } = useParams();
  console.log(usernameString);
  return (
    <div>
      <h3>usernameString: {usernameString}</h3>
    </div>
  );
}
export default App;
