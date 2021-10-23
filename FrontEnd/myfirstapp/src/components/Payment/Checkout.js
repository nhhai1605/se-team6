import React, { Component } from "react";
import axios from "axios";


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: this.props.username,
        total: this.props.total,
        cartItems: this.props.cartItems,
        itemsString: "",
        method: "Paypal",
        currency: "AUD",
      errors: {},
        orderId : "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() 
  {
    if(this.state.username === null || this.state.username === "" || this.state.username === undefined)
    {
        window.location.href="/login";
    }
    var string = "";
    for(let i = 0; i < this.state.cartItems.length; i++)
    {
      string += this.state.cartItems[i].id + ":" + this.state.cartItems[i].quantity;
      if(i !== this.state.cartItems.length-1)
      {
        string += "/";
      }
    }
    this.setState({ itemsString: string })
    if (this.state.total === 0)
    {
      this.setState({total : 0.1})
    }
  }  


  onSubmit(e) {
    e.preventDefault();
    const order =
    {
        username: this.state.username,
        total: this.state.total,
        currency : this.state.currency,
        method: this.state.method,
        description: this.state.itemsString,
    }
    axios.post(`${process.env.REACT_APP_CHECKOUT_ENDPOINT}/api/checkout/payment`, order)
      .then(res => {
        window.location.href = res.data;
      }).catch(err => this.setState({ errors: err.response.data }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Checkout</h1>

              <form onSubmit={this.onSubmit}>
                
                <div className="form-group">
                    <h4>Total:</h4>
                    <input
                        type="text"
                        className={"form-control form-control-lg"}
                        disabled
                        value= {this.state.total}
                        name="total"
                    />
                </div>  
                <div className="form-group">
                    <h4>Currency:</h4>
                    <input
                        type="text"
                        className={"form-control form-control-lg"}
                        disabled
                        value= {this.state.currency}
                        name="currency"
                    />
                </div>  
                <div className="form-group">
                    <h4>Payment Method:</h4>
                    <input
                        type="text"
                        className={"form-control form-control-lg"}
                        disabled
                        value= {this.state.method}
                        name="method"
                    />
                </div>  
                <input type="submit" className="btn btn-primary btn-block mt-4"/>
              </form>


            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default (Checkout);