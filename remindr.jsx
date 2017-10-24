import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/app';

const root = document.getElementById('root');

const Root = () => (
  <App />
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, root);
});

