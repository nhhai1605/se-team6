import React, { Component } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, useParams, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import Post from "./components/Store/Post";
import OrderManagement from "./components/Store/OrderManagement";
import Popular from "./components/Store/Popular";
import Homepage from "./components/Store/Homepage";
import Cart from "./components/Store/Cart";
import BookPage from "./components/Store/BookPage";

import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import User from "./components/UserManagement/User";
import UserManagement from "./components/UserManagement/UserManagement";
import Checkout from "./components/Payment/Checkout";
import Fail from "./components/Payment/Fail";
import Success from "./components/Payment/Success";
import Orders from "./components/Payment/Orders";

import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";

import ProductsContextProvider from './components/Store/Context/ProductsContext';
import CartContextProvider from './components/Store/Context/CartContext';

import { useCart } from './components/Store/useCart';

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
                <Route exact path="/" component={Homepage} />
                <Route exact path="/popular" component={Popular} />
                <Switch>
                  <Route path={'/user/:usernameString'} children = {<UserPageFunc/>} />
                </Switch>
                <Switch>
                  <Route path={'/book/:bookId'} children = {<BookPageFunc/>} />
                </Switch>
                <Route exact path="/checkout" children={<CheckoutFunc/>}/>
                <Route exact path="/checkout/fail" component={Fail} />
                <Route exact path="/checkout/success" component={Success} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/orders" component={Orders} />
                {
                user ? 
                <>
                  <Route exact path="/userManagement" component={UserManagement} />
                  <Route exact path="/orderManagement" component={OrderManagement} />
                  <Route exact path="/post" component={Post} />
                </>
                :
                <>
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


function UserPageFunc()
{
  let { usernameString } = useParams();
  return (
    <User username={usernameString}/>
  );
}
function BookPageFunc()
{
  let { bookId } = useParams();
  return (
    <BookPage id={bookId}/>
  );
}

function CheckoutFunc() 
{
  const {cartItems} = useCart();
  return (
  <Checkout username={user}  cartItems={cartItems} total={localStorage.getItem("total")}/>
  )
  
}

export default App;
