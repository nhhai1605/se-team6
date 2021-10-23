import React, { Component } from "react";
import axios from "axios";
import { formatNumber } from '../Store/utils';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("currentUsername"),
      userId: null,
      displayName: "",
      fullName : "",
      userType: "",
      orders: [],
      errors: {},
      orderId: "",
      currentTime: Date.parse(new Date()),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getUserDetails=(username)=>{
    axios.get(`${process.env.REACT_APP_USERS_ENDPOINT}/api/users/getUser`, {params : {username : username}})
        .then(res => {
        const user = res.data;
        this.setState({displayName : user.displayName, fullName : user.fullName, userType : user.userType, userId: user.id});
    })
    .catch(err=>console.log(err))
    }
    
  getOrders=(username)=>
  {
      axios.get(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/getOrders`, {params : {username : username}})
      .then(res => {
      const orders = res.data;
        this.setState({orders:orders});
      })
      .catch(err => console.log(err))
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


  onSubmit(e)
  {
    axios.put(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/updateStatus/` + this.state.orderId + "/Refund")
    .then().catch(err=>this.setState({errors : err.response.data}));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {  orders , currentTime} = this.state;
    return ( 
      <div className="checkout">
        <h1 className="display-4 text-center mt-4">Order History</h1>
        {
          orders.map((order,index) => (
            <div key={order.id} style={{ border: "solid grey", borderRadius: '10px', height: '25%', width: '96%', padding: "2%", margin: "2%", wordWrap: "break-word", overflow: 'auto' }}>
              <h4>Order ID: {order.id}</h4>
              <h4>Total: {formatNumber(order.total)} </h4>
              <h4>Shipping Address: {order.address}</h4>
              <h4>Order Description: {order.description}</h4>
              <h4>Created at: {order.dateString}</h4>{ }
              {
                    order.status === 'Confirm' ?
                    <>
                    <h4>Status: <span style={{ color: 'green' }}>Confirm</span></h4>
                    </>
                    : order.status === 'Reject' ?
                    <>
                    <h4>Status: <span style={{ color: 'red' }}>Reject</span></h4>
                    </>
                    : order.status === 'Refund' ?
                    <>
                    <h4>Status: <span style={{ color: 'orange' }}>Refund</span></h4>
                    </>
                    : 
                    <>
                    <h4>Status: <span style={{ color: 'blue' }}>Pending</span></h4>
                    </>      
                }
              {
                currentTime < Date.parse(order.dateString) + 7200000 && order.status !== 'Refund' ?
                  <>
                    <form onSubmit={this.onSubmit}>
                    <button className="btn btn-danger" onClick={() => this.setState({orderId: order.id})} style={{ margin: 10 }}>Refund</button>
                    </form>
                  </>
                :null
              }
            </div>
          ))
          }
      </div>
    );
  }
}


export default (Checkout);