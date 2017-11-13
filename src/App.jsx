import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FetchPizzas from './FetchPizzas.jsx';
import { StyleSheet, css } from 'aphrodite';
import reset from './reset.css';

// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch
// is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors

const styles = StyleSheet.create({

  backgroundImage: {
    display: 'flex',
    background: "url('./src/img/pizza.jpg')",
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    justifyContent: 'space-around',
  },

  content: {
    backgroundColor: '#c1a9a9',
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: '30px',
    maxWidth: '50%',
  },

  buttonContainer: {
    flex: '1',
    margin: '20px',
    textAlign: 'center',
    borderRadius: '30px',
  },

  button: {
    border: '0',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px 1px black',
    color: '#8b6a61',
    padding: '10px',
    appearance: 'none',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    borderRadius: '10px',
    textAlign: 'center',
  },

  splashBackground: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },

  loadingSplash: {
    fontSize: '100px',
    fontFamily: 'Lobster',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  },

  searchContainer: {
    flex: '1',
    textAlign: 'center',
    borderRadius: '30px',
  },

  headingContainer: {
    '@media(max-width: 580px)': {
      fontSize: '20px',
      height: '70px',
      borderRadius: '20px',
    },
    flex: '1',
    verticalAlign: 'middle',
    justifyContent: 'space-around',
    height: '100px',
    fontSize: '50px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    borderRadius: '30px',
  },

  heading: {
    marginTop: '25px',
    fontFamily: 'Lobster',
  },

  search: {
    '@media(max-width: 580px)': {
      fontSize: '10px',
    },
    margin: '20px',
    borderRadius: '20px',
    boxShadow: '0px 0px 30px 1px black',
    fontSize: '20px',
    textAlign: 'center',
    color: '#000',
  },

  list: {
    fontFamily: 'sans-serif',
    flex: '1',
    listStyle: 'none',
    paddingLeft: '0px',
    borderRadius: '30px',
    textAlign: 'left',
    marginBottom: '20px',
  },

  pizzas: {
    textAlign: 'center',
  },

});

class App extends Component {
  constructor(props) {
    super(props);

    this.updatePizzas = this.updatePizzas.bind(this);
    this.sortPizzas = this.sortPizzas.bind(this);
    this.reversePizzas = this.reversePizzas.bind(this);

    this.state = {
      inputText: '',
      sortSwitch: true
    };
  }

  updatePizzas(event) {
    this.setState({
      inputText: event.target.value.toLowerCase(),
    });
  }

  sortPizzas(event) {
    event.preventDefault();

    this.props.pizzas.sort((c, b) => {
      if (this.state.sortSwitch === true) {
        return c.localeComapare(b)
      } else {
        return b.localeCompare(c);
      }
    })
    this.setState({
      sortSwitch: false
    })
  }

  // sortPizzas(event) {
  //   event.preventDefault();
  //   this.setState({
  //     pizzas: this.props.pizzas.sort((c, b) => {
  //       if (this.state.sortSwitch === true) {
  //         return c.localeCompare(b);
  //       }
  //       return b.localeCompare(c);
  //     }),
  //     sortSwitch: false,
  //   });
  // }

  reversePizzas(event) {
    event.preventDefault();
    this.props.pizzas.reverse()
  }

  render() {
    const filteredPizzas = this.props.pizzas.filter(pizzas => (
      pizzas.toLowerCase().indexOf(this.state.inputText) !== -1));

    return (
      <div>
        {/* If there is anything in state, render Pizza stuff, otherwise show splash screen */}
        {this.props.pizzas.length ?
          <div className={css(styles.backgroundImage)}>
            <div className={css(styles.content)}>
              <div className={css(styles.headingContainer)}>
                <h1 className={css(styles.heading)}>Pizza Time!</h1>
              </div>
              <div className={css(styles.searchContainer)}>
                <input
                  className={css(styles.search)}
                  type="text"
                  title="Filter down your choice of pizza here"
                  placeholder="What would you like?"
                  value={this.state.inputText}
                  onChange={this.updatePizzas}
                />
              </div>
              <div className={css(styles.buttonContainer)}>
                <button
                  className={css(styles.button)}
                  title="Click me to toggle sorting between ascending and descending the alphabet!"
                  onClick={this.state.sortSwitch ? this.sortPizzas : this.reversePizzas}
                >Sort Your Pizzas!
                </button>
              </div>
              <div className={css(styles.list)}>
                <ul>
                  {filteredPizzas.map((pizzas, index) => (
                    <li className={css(styles.pizzas)} key={index}>{pizzas}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        : <div className={css(styles.splashBackground)}>
          <h1 className={css(styles.loadingSplash)}>LOADING...</h1>
          </div>}
      </div>
    );
  }
}

export default App;
