import React from "react";

import { Link } from 'react-router-dom';

const Fail = () =>
{
    return (
        <div className="checkoutfail">
          <div className="text-center mt-5">
          <h1>Check Out</h1>
              </div>
                  <div className="row no-gutters justify-content-center">
                      <div className="col-sm-9 p-3">
                          
                          <div className="h4 p-3 text-center text-danger">
                              <p>Checkout Failed! Try again</p>
                              <Link to="/" className="btn btn-outline-danger">Back to Homepage</Link>
                          </div>
                          
                      </div>
              </div>
        </div>
    );
}



export default Fail;