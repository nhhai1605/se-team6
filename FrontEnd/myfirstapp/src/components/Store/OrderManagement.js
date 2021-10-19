import React, { Component } from "react";
import classnames from "classnames";
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
        orderForSellerId : "",
        errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);

  }

    onSubmit(e) {
        axios.put("http://localhost:8083/api/checkout/updateStatusForSeller/" + this.state.orderForSellerId + "/" + this.state.status)
        .then().catch(err => this.setState({ errors: err.response.data }));
        
    }

    onSubmitDelete(e) {
        axios.delete("http://localhost:8083/api/checkout/deleteOrderForSeller/" + this.state.orderForSellerId)
        .then().catch(err=>this.setState({errors : err.response.data}));
    }

  componentDidMount() 
  {
    axios.get("http://localhost:8083/api/checkout/getOrderForSeller", { params: { username: this.state.username } })
    .then(res => {
        const orders = res.data;
        // console.log(orders)
      this.setState({orders : orders});
    }).catch(err=>console.log(err))
  }

  
  onChange(e)
  {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
      const { errors ,orders} = this.state;
    return (
        <div className={styles.orderGrid}>
        {
            orders.map(order => (
                <div key={order[0]} className="card card-body" style={{borderColor:'black', borderWidth: 2, backgroundColor : 'white'}}>

                <h4>From Order with ID: {order[5]}</h4>
                <h4>Buyer: {order[2]}</h4>
                <h4>Book ID: {order[1]}</h4>
                <h4>Quantity: {order[7]}</h4>
                <h4>Created At: {order[4]}</h4>
                {
                    order[8] === 'Confirm' ?
                    <>
                    <h4>Status: <span style={{ color: 'green' }}>Confirm</span></h4>
                    </>
                    : order[8] === 'Reject' ?
                    <>
                    <h4>Status: <span style={{ color: 'red' }}>Reject</span></h4>
                    </>
                    : order[8] === 'Refund' ?
                    <>
                    <h4>Status: <span style={{ color: 'orange' }}>Refund</span></h4>
                    </>
                    : 
                    <>
                    <h4>Status: <span style={{ color: 'blue' }}>Pending</span></h4>
                    </>      
                }
                {
                    order[8] === "Pending" ?
                    <>
                    <form onSubmit={this.onSubmit}>
                    <button className="btn btn-success" onClick={() => this.setState({orderForSellerId : order[0],orderId: order[5],status:"Confirm"})} style={{margin:10}}>Confirm</button>
                    <button className="btn btn-danger" onClick={() => this.setState({orderForSellerId : order[0],orderId: order[5], status: "Reject" })} style={{ margin: 10 }}>Reject</button>
                    </form>
                    </>
                    :
                    <>
                    <form onSubmit={this.onSubmitDelete}>
                        <button className="btn btn-secondary" onClick={() => this.setState({orderForSellerId : order[0]})} style={{ margin: 10 }}>Delete</button>
                    </form>
                    </>
                }

                </div>
            ))
        }
      </div>
    );
  }
}

export default(OrderManagement);