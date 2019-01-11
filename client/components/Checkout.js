import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendOrder} from '../reducers/cart';

const dummyData = {
  name: 'Able Baker',
  address: '123 Main Street, Anytown, NY 12345'
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.loginRedirect = this.loginRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const path = 'checkout/thankyou';
    this.props.sendOrder(this.props.cart);
    this.props.history.push(path);
  }
  loginRedirect() {
    let path = `login`;
    this.props.history.push(path);
  }
  render() {
    const {cart} = this.props;
    const isLoggedIn = false; // This must be linked to the state
    return (
      <table>
        <thead>
          <tr>
            <th>Personal Information</th>
            <th>{dummyData.name}</th>
          </tr>
          <tr>
            <th>Shipping and Billing Address</th>
            <th>{dummyData.address}</th>
          </tr>
          <tr>
            <th>Your order</th>
          </tr>
          {cart &&
            cart.map(product => (
              <tr key={product.id}>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>1</th>
                <th>{product.price}</th>
              </tr>
            ))}

          {isLoggedIn && (
            <tr>
              <th>
                <button>Checkout as Guest</button>
                <button onClick={this.loginRedirect}>Log in</button>
              </th>
            </tr>
          )}
          {!isLoggedIn && (
            <tr>
              <th>
                <button onClick={this.handleSubmit}>Complete</button>
              </th>
            </tr>
          )}
        </thead>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => ({
  sendOrder: order => dispatch(sendOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
