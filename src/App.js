import React from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';


class App extends React.Component{


  render() {
    return(

      <Router>
        <BaseRouter />
      </Router>
      
   
    )
  } 
}
export default App;
