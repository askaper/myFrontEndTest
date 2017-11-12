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
    const newPizzas = this.state.pizzas;
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

    const filteredPizzas = this.state.pizzas.filter(pizzas => (
      pizzas.toLowerCase().indexOf(this.state.inputText) !== -1));

    return (
      filteredPizzas.map((pizzas, index) => (
        <li className={css(styles.pizzas)} key={index}>{pizzas}</li>
      ))
    )
  }
}

export default FetchPizzas;
