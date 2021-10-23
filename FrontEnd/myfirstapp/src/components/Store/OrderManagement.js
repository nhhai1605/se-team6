import React, { Component } from "react";
import axios from "axios";
import styles from '../styles/BookGrid.module.css';

class OrderManagement extends Component {
    constructor(props){
        super(props);

    this.state = {
        username: localStorage.getItem("currentUsername"),
        orders: [],
        status: "",
        orderId: "",
        errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

    onSubmit(e) {
        axios.put(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/updateStatus/` + this.state.orderId + "/" + this.state.status)
        .then().catch(err => this.setState({ errors: err.response.data }));
    }

  componentDidMount() 
  {
    axios.get(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/getOrdersForSeller`, { params: { username: this.state.username } })
    .then(res => {
        const orders = res.data;
      this.setState({orders : orders});
    }).catch(err=>console.log(err))
  }

  
  onChange(e)
  {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const orders = this.state.orders;
    return (
      <div>
        <h1 className="display-4 text-center">Order Management Page</h1>
        <div className={styles.orderGrid}>
        {
            orders.map(order => (
                <div key={order.id} className="card card-body" style={{borderColor:'black', borderWidth: 2, backgroundColor : 'white'}}>
                <h4>Buyer: <a href={"/user/"+order.username} >{order.username}</a></h4>
                <h4>Decription: {order.description}</h4>
                <h4>Adress: {order.address}</h4>
                <h4>Created At: {order.dateString}</h4>
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
                    order.status === "Pending" ?
                    <>
                    <form onSubmit={this.onSubmit}>
                    <button className="btn btn-success" onClick={() => this.setState({orderId : order.id, status:"Confirm"})} style={{margin:10}}>Confirm</button>
                    <button className="btn btn-danger" onClick={() => this.setState({orderId : order.id, status: "Reject" })} style={{ margin: 10 }}>Reject</button>
                    </form>
                    </>
                    :
                    null
                }

                </div>
            ))
        }
        </div>
      </div>
    );
  }
}

export default(OrderManagement);