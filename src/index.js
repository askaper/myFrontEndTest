import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors


class App extends Component {

  constructor(props) {
    super(props);

    this.updatePizzas = this.updatePizzas.bind(this);

    this.state = {
      pizzas: [],
      inputText: ''
    }
  }

  componentDidMount() {
    //set a timer for the 'splash screen for the sake of loading json data because loading time is in single digit miliseconds'
    setTimeout(() => {
      fetch('../pizza.json')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server')
          }
          return response.json()
        })
        .then((data) => {
          this.setState({ pizzas: data.pizzas })
        })
    }, 1000)
  }

  updatePizzas(event) {
    this.setState({
      inputText: event.target.value
    })
  }


  render() {
    //loops through array and assigns its index as the key for react

    let filteredPizzas = this.state.pizzas.filter((pizzas) => {
      return pizzas.toLowerCase().indexOf(this.state.inputText) !== -1
    })

    // const pizzaList = filteredPizzas.map((pizzas, index) => {
    //   return <li key={index}>{pizzas}</li>
    // })

    return (
      <div>
        {/* If there is anything in state, render Pizza stuff, otherwise show splash screen */}
        {this.state.pizzas.length ?
          <div>
            <h1>Pizza Time!</h1>
            <div className={'input-field'}>
              <input type="text" placeholder={'What would you like?'} value={this.state.inputText} onChange={this.updatePizzas}></input>
            </div>
            <div className={'pizza-list'}>
              <ul>
                {filteredPizzas.map((pizzas, index) => { return <li key={index}>{pizzas}</li>})}
              </ul>
            </div>
          </div>
        : <div><h1 className={'loading-splah'}>...LOADING</h1></div>}

      </div>

    )
  }

}

ReactDOM.render(<App />, document.querySelector('#root'))
