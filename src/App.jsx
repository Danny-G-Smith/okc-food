import React, { Component } from 'react'
import './App.css'
import MyApi from './components/MyApi'
import ErrorBoundary from './components/ErrorBoundary'

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   render () {

      return (
         <>
            <ErrorBoundary>
               <main>
                  {/*https://materializecss.com/ documentation*/}
                  {/*https://react-materialize.github.io/#/*/}
                  <div id='header' tabIndex='0'>
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
                  <span className="copyright">&copy; 2018 Copyright</span>
                  <span className="edu">For Educational Use Only</span>
               </div>
            </ErrorBoundary>
         </>
      )
   }
}

export default App

