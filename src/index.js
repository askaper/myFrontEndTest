import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import index from './index.css'

// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors

class App extends Component {

  constructor(props) {
    super(props);

    this.updatePizzas = this.updatePizzas.bind(this);
    this.sortPizzas = this.sortPizzas.bind(this);
    this.reversePizzas = this.reversePizzas.bind(this);

    this.state = {
      pizzas: [],
      inputText: '',
      sortSwitch: true
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
    }, 2000)
  }

  updatePizzas(event) {
    this.setState({
      inputText: event.target.value.toLowerCase()
    })
  }

  sortPizzas(event) {
    event.preventDefault();
    this.setState({
      pizzas: this.state.pizzas.sort(),
      sortSwitch: false
    })
  }

  reversePizzas(event) {
    event.preventDefault();
    this.setState({
      pizzas: this.state.pizzas.reverse()
    })
  }

  render() {

    const filteredPizzas = this.state.pizzas.filter((pizzas) => {
      return pizzas.toLowerCase().indexOf(this.state.inputText) !== -1
    })

    const displayedPizzas = filteredPizzas.map((pizzas, index) => {
      return <li className={css(styles.pizzas)} key={index}>{pizzas}</li>
    })

    return (
      <div>
        {/* If there is anything in state, render Pizza stuff, otherwise show splash screen */}
        {this.state.pizzas.length ?
          <div>
            <h1 className={css(styles.heading)}>Pizza Time!</h1>
            <div className={css(styles.searchContainer)}>
              <input className={css(styles.search)} type="text" placeholder={'What would you like?'} value={this.state.inputText} onChange={this.updatePizzas}></input>
            </div>
            <div className={css(styles.buttonContainer)}>{/* I feel this approach for sorting the list isn't the best but the readability is good and behior works as expected */}
              <button className={css(styles.button)} title={'Click me to toggle sorting between ascending and descending alphabet!'}onClick={this.state.sortSwitch ? this.sortPizzas : this.reversePizzas} className={'sort-button'}>Toggle</button>
            </div>
            <div className={'pizza-list'}>
              <ul className={css(styles.list)}>
                {displayedPizzas}
              </ul>
            </div>
          </div>
        : <div className={css(styles.splashBackground)}><h1 className={css(styles.loadingSplash)}>LOADING...</h1></div>}
      </div>
    )
  }
}

const styles = StyleSheet.create({

  splashBackground: {

    '@media (max-width: 600px)': {
      backgroundColor: 'pink'
    },

    backgroundColor: 'black'
  },
  background: {
    color: 'pink'
  },
  buttonContainer: {
    margin: '20px',
    textAlign: 'center'
  },
  button: {
    textAlign: 'center'
  },
  loadingSplash: {
    textAlign: 'center',
    color: '#f3f3f3'
  },
  searchContainer: {
    backgroundImage: 'linear-gradient(180deg, red, red 50%, green 50%, green)',
    textAlign: 'center'
  },
  heading: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  search: {
    margin: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    color: 'red',
  },
  list: {
    listStyle: 'none',
    paddingLeft: '0px',
    textAlign: 'left'
  },
  pizzas: {
    textAlign: 'center'
  }
})

css(styles.globals)

ReactDOM.render(<App />, document.querySelector('#root'))
