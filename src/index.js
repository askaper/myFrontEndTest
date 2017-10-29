import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import reset from './reset.css';
import main from './main.css';

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
      pizzas: this.state.pizzas.sort((a, b) => {
        if (this.state.sortSwitch === true) {
          return a.localeCompare(b)
        } else {
          return b.localeCompare(a)
        }
      }),
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
              <input className={css(styles.search)} type="text"  title={'Filter down your choice of pizza here'} placeholder={'What would you like?'} value={this.state.inputText} onChange={this.updatePizzas}></input>
            </div>
            <div className={css(styles.buttonContainer)}>{/* I feel this approach for sorting the list isn't the best but the readability is good and behior works as expected */}
              <button className={css(styles.button)} title={'Click me to toggle sorting between ascending and descending the alphabet!'} onClick={this.state.sortSwitch ? this.sortPizzas : this.reversePizzas} className={'sort-button'}>Toggle</button>
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
    backgroundColor: 'black',
    position: 'absolute',
    top: '0',
    left: '0'
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
    color: 'white'
  },
  searchContainer: {
    backgroundImage: 'linear-gradient(180deg, white, white 50%, green 50%, green)',
    textAlign: 'center'
  },
  heading: {
    backgroundColor: 'red',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  search: {
    margin: '20px',
    borderRadius: '20px',
    boxShadow: '0px 0px 30px 1px green',
    fontSize: '25px',
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

ReactDOM.render(<App />, document.querySelector('#root'))
