import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';

class FetchPizzas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pizzas: []
    }
  }


  componentDidMount() {
    // "faux loader"
    setTimeout(() => {
      fetch('../pizza.json')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ pizzas: data.pizzas });
        });
    }, 2000);
  }

  
  render() {


  }

}

export default FetchPizzas;
