import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: localStorage.getItem("currentUsername"),
        userId: null,
        displayName: "",
        fullName : "",
        userType: "",
        orders : [],
        errors : {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getUserDetails=(username)=>{
    axios.get("http://localhost:8080/api/users/getUser", {params : {username : username}})
        .then(res => {
        const user = res.data;
        this.setState({displayName : user.displayName, fullName : user.fullName, userType : user.userType, userId: user.id});
    })
    .catch(err=>console.log(err))
    }
    
    getOrders=(username)=>
    {
        axios.get("http://localhost:8083/api/checkout/getOrders", {params : {username : username}})
        .then(res => {
        const orders = res.data;
        this.setState({orders:orders});
        })
        .catch(err=>console.log(err))
    }
  componentDidMount() 
  {
    if(this.state.username === null || this.state.username === "" || this.state.username === undefined)
    {
        window.location.href="/login";
    }
    else 
    {
        this.getUserDetails(this.state.username);
        this.getOrders(this.state.username);
    }
  }  


  onSubmit(e) {
    e.preventDefault();
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const orders = this.state.orders;
    return ( 
      <div className="checkout">
          <h1 className="display-4 text-center mt-4">Order History</h1>
            {
                orders.map(order => (
                  <div key={order.id} style={{border:"solid grey", borderRadius:'10px', height:'25%', width:'96%', padding:"2%",margin:"2%", wordWrap: "break-word", overflow: 'auto'}}>
                    <h4>Total: {order.total} ${order.currency}</h4>
                    <h4>Shipping Address: {order.address}</h4>
                    <h4>Order Description: {order.description}</h4>
                  </div>
                ))
            }
      </div>
    );
  }
}


export default (Checkout);