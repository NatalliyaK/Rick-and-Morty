import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Cards from "./components/cards";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='wrapper'>
      <Cards />
  </div>
);
