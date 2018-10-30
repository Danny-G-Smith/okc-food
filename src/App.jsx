import React, { Component } from 'react'
import './App.css'

// https://www.npmjs.com/package/prop-types
import MyApi from './components/MyApi'

require('dotenv').config()

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   render() {
      return (
         <>
            <main>
               {/*https://materializecss.com/ documentation*/}
               {/*https://react-materialize.github.io/#/*/}
               <div id='header'>
                  <p>OKC Food</p>
               </div>

               {/*<Toast toast="here you go!">*/}
               {/*Toast*/}
               {/*</Toast>*/}
               <div className="App">
                  <MyApi/>
               </div>
            </main>

            <div className="footer">
               <span className="copyright">&copy; 2018 Copyright Text</span>
               <span className="edu">For Educational Use Only</span>
            </div>
         </>
      )
   }
}

export default App;

