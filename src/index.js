import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client_id = `${process.env.REACT_APP_client_id}`;
try {
   if ( client_id === 'undefined' ) {
      throw new Error(
         'The .env environment file is required but does not exist.'
      );
   }
}
catch(e) {
   //window.Materialize.toast('The .env environment file is required but does not exist.', 10000)
   alert('The .env environment file is required but does not exist.')
   console.log(e);
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
