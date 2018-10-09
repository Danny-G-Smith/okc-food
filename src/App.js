import React, { Component } from 'react'
import './App.css'

import { Footer, Navbar, NavItem } from 'react-materialize'

// https://www.npmjs.com/package/prop-types
import PropTypes from 'prop-types'; // ES6

// https://www.npmjs.com/package/axios
import axios from 'axios'
import SideBar from './component/SideBar'
import VenueList from './component/VenueList'

require('dotenv').config()
console.log(`${process.env.REACT_APP_DEV_API_URL}`)

class App extends Component {

   /*
    https://www.youtube.com/watch?v=W5LhLZqj76s&feature=youtu.be
    */

   state = {
      names: [],
      searchString: '',
      short:   [],
      venueID: [],
      venues: [],
   }

   updateSearchString = (searchString) => {
      if (searchString) {
         this.setState({searchString});
      } else {
         this.setState({searchString: ''});
      }
   }

   // 717-8629
   componentDidMount () {
      this.getVenues()
   }

   renderMap = () => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5T8bcDZqx_vYa-ApCWu1hcymdMEmK9ek&callback=initMap')
      window.initMap = this.initMap
   }

   getVenues = () => {
      const explore = 'https://api.foursquare.com/v2/venues/explore?'
      const search  = 'https://api.foursquare.com/v2/venues/search?'
      const venues  = 'https://api.foursquare.com/v2/venues/'
      const short   = 'https://api.foursquare.com/v2/venues/'

      const parameters = {
         client_id:     `${process.env.REACT_APP_client_id}`, // '5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ', //
         client_secret: `${process.env.REACT_APP_client_secret}`, // 'HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK', //
         query:         'food', //`${process.env.REACT_APP_food}`,          // 'food', //
         intent:        'browse', //`${process.env.REACT_APP_browse}`,       // browse, //
         ll:            '35.522489,-97.619255',                  //35.522489, -97.619255
         radius:        10000, //`${process.env.REACT_APP_radius}`,       //10000, //
         v:             `${process.env.REACT_APP_v}`             //'20180908'
      }

      // {console.log(photos)}
      // https://api.foursquare.com/v2/venues/search?client_id=5V3OK3JM0RT0YWWBQR2ZQNB3UJB3V0LM24GQHKEZKBI2EOWQ&client_secret=HYHANVJXDDZKVSHXHVL4XSXXIELLWJVLSM1EHSZB2KTI4XKK&query=food&intent=browse&ll=35.522489,-97.619255&radius=10000&v=20180926
      // Pass props to parent component in React.js


      axios.get(explore + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters),
         short + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues: response.data.response.groups[0].items,
               names: response.data.response.groups[0].items.map(element => element.venue.name),
               short: response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
            }, this.renderMap())
         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }

   initMap = () => {

      // Create A Map
      var map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 35.52248, lng: -97.619255},
         zoom: 13
      })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow()

      // Display Dynamic Markers
      this.state.venues.map(myVenue => {

         var contentString = `${myVenue.venue.name}`

         // Create A Marker
         var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
            map: map,
            title: myVenue.venue.name,
            icon: {
               url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            }
         })

         // Click on A Marker!
         marker.addListener('click', function() {

            // Change the content
            infowindow.setContent(contentString)

            // Open An InfoWindow
            infowindow.open(map, marker)
         })

      })



   }

   render() {
      return (
         <main>
            <div id="map"></div>
         </main>
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
