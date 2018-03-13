import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients)
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Roy Rivera',
        address: {
          street: 'Test Street 23',
          zipCode: '23455',
          country: 'Costa Rica'
        },
        email: 'roy.fita23@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.props.history.push('/');
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {
          (!this.state.loading &&
          <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
          </form>) || <Spinner />
        }
      </div>
    );
  }
}

export default ContactData;
