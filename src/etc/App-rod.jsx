import React, { Component } from 'react'
import './App.css'

import { Footer, Navbar, NavItem } from 'react-materialize'

// https://www.npmjs.com/package/prop-types
import PropTypes from 'prop-types'; // ES6

// https://www.npmjs.com/package/axios
import axios from 'axios'
import SideBar from './components/SideBar'
import VenueList from './components/VenueList'
import MyApi from './components/MyApi'

require('dotenv').config()

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */


   handleClick = (id) => {
      this.setState(state => {
         const list = state.list.map(venue => {
            if (venue.venue.id === id) {
               venue.popup = true;
            }
            else {
               venue.popup = false;
            }
            return venue;
         })

         return ({list})
      })
   };

   handleInput = (query) => {
      this.setState(({ venues }) => {
         const list = venues.filter(({ venue }) => {
            return venue.name.toLowerCase().includes(query.toLowerCase());
         })

         return ({ list });
      })
   };

   state = {
      address:[[]],
      list: [],
      names: [],
      popup: [false, false, false, false, false, false, false, false, false,false,
              false, false, false, false, false, false, false, false, false,false,
              false, false, false, false, false, false, false, false, false,false],
      searchString: '',
      short: [],
      venueID: [],
      venues: []
   }

   componentDidMount () {
      this.getVenues()
   }

   renderMap = () => {
      loadScript(`${process.env.REACT_APP_google_map}`)
      window.initMap = this.initMap
   }

   getVenues = () => {
      // https://www.npmjs.com/package/dotenv
      // jkkjjjllljlj
      // # with npm
      // npm install dotenv --S
      // require('dotenv').config()
      // There is a quirk here, if we weren't using create-react-app we wouldn't
      // have to place REACT_APP_ in front of the variable.
      //
      const parameters = {
         client_id:     `${process.env.REACT_APP_client_id}`,
         client_secret: `${process.env.REACT_APP_client_secret}`,
         query:         'food', //`${process.env.REACT_APP_food}`,
         intent:        'browse', //`${process.env.REACT_APP_browse}`,
         ll:            '35.522489,-97.619255',
         google_map:    `${process.env.REACT_APP_google_map}`,
         radius:        10000, //`${process.env.REACT_APP_radius}`,
         v:             `${process.env.REACT_APP_v}`
      }
      const explore = 'https://api.foursquare.com/v2/venues/explore?'
      const list    = 'https://api.foursquare.com/v2/venues/'
      const search  = 'https://api.foursquare.com/v2/venues/search?'
      const short   = 'https://api.foursquare.com/v2/venues/'
      const venues  = 'https://api.foursquare.com/v2/venues/'

      //debugger
      axios.get(
         explore + new URLSearchParams(parameters),
         list    + new URLSearchParams(parameters),
         search  + new URLSearchParams(parameters),
         short   + new URLSearchParams(parameters),
         venues  + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               address: response.data.response.groups[0].items.map(element => element.venue.location.formattedAddress),
               list:    response.data.response.groups[0].items,
               names:   response.data.response.groups[0].items.map(element => element.venue.name),
               popup:   response.data.response.groups[0].items.map(element => element.venue.popup),
               short:   response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues:  response.data.response.groups[0].items
            }, this.renderMap())

         })
         .catch(error => {
            //console.log(this.state.popup)
            console.log('ERROR!! ' + error)
         })
   }

   render() {
      return (
         <div className="App">
            <VenueList {...this.state} handleClick={this.handleClick} handleInput={this.handleInput}/>

            {/* Vanilla Google Map */}
             <MyApi {...this.state} handleClick={this.handleClick} />
         </div>
      )
   }
}

function loadScript(url) {
   var index  = window.document.getElementsByTagName("script")[0]
   var script = window.document.createElement("script")
   script.src = url
   script.async = true
   script.defer = true
   index.parentNode.insertBefore(script, index)
}

export default App;

// Runtime type checking for React props and similar objects.
// https://www.npmjs.com/package/prop-types
App.propTypes = {
   list:   PropTypes.object,
   markers: PropTypes.array,
   names: PropTypes.object,
   short: PropTypes.object,
   venueID: PropTypes.object,
   venues: PropTypes.object,
}
