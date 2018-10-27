import React, { Component } from 'react'
import './App.css'

import { Footer, Navbar, NavItem } from 'react-materialize'

// https://www.npmjs.com/package/prop-types
import MyApi from './components/MyApi'

require('dotenv').config()

class App extends Component {


   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   render() {
      return (
         <main>
            {/*https://materializecss.com/ documentation*/}
            {/*https://react-materialize.github.io/#/*/}
            <div id='header'>
               {/*<NavItem onClick={() => console.log('test click')}>Getting started</NavItem>*/}
            </div>

            {/*<Toast toast="here you go!">*/}
            {/*Toast*/}
            {/*</Toast>*/}
            <div className="App">
               <MyApi/>
            </div>
            <Footer copyrights="&copy; 2018 Copyright Text"
                    moreLinks={
                       <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }>
            </Footer>
         </main>
      )
   }
}

export default App;

