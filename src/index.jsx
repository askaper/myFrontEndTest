import React from 'react';
import { render } from 'react-dom';
import FetchPizzas from './FetchPizzas.jsx';
import reset from './reset.css';



const Root = () => {
  return (
    <FetchPizzas />
  )
};

render(<Root />, document.querySelector('#root'));
