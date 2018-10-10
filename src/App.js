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
      photos: [],
      photoURL: [],
      searchString: '',
      short: [],
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
      const photos  = 'https://api.foursquare.com/v2/photos/PHOTO_ID'
      const search  = 'https://api.foursquare.com/v2/venues/search?'
      const short   = 'https://api.foursquare.com/v2/venues/'
      const venues  = 'https://api.foursquare.com/v2/venues/'


      // https://www.npmjs.com/package/dotenv
      // https://medium.com/@danieljameskay/create-react-app-dotenv-281693a19ecd
      // # with npm
      // npm install dotenv --S
      // require('dotenv').config()
      // There is a quirk here, if we weren't using create-react-app we wouldn't
      // have to place REACT_APP_ in front of the variable.
      //
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


      axios.get(
         explore + new URLSearchParams(parameters),
         photos  + new URLSearchParams(parameters),
         search  + new URLSearchParams(parameters),
         short   + new URLSearchParams(parameters),
         venues  + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               //address: response.data.response.groups[0].items.map(element => element.venue.location.formattedAddress),
               names:   response.data.response.groups[0].items.map(element => element.venue.name),
               //photos:  response.data.response.photos.items[0].items.map(element => element.venue.categories[0].shortName),
               short:   response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues:  response.data.response.groups[0].items
               //photoURLs: [this.state.photoURLs, photoURL]
               //}))
               // prefix:  response.data.response.photos.items[0].map(element => element.prefix),
               // suffix:  response.data.response.photos.items[0].map(element => element.suffix),}, this.renderMap())
            }, this.renderMap())
         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }

   initMap = () => {

      // Create A Map - Centered in OKC OK
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
            {/*https://materializecss.com/ documentation*/}
            {/*https://react-materialize.github.io/#/*/}
            <Navbar brand='logo'>
               <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
               <NavItem href='components.html'>Components</NavItem>
            </Navbar>

            {/*<Toast toast="here you go!">*/}
            {/*Toast*/}
            {/*</Toast>*/}
            <div className="App">

               {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
               <div id="map"></div>
               <SideBar {...this.state}
                  venues={this.state.names.filter(name => name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
                  updateSearchString={this.updateSearchString}
               >
                  {/*<input className="search"/>*/}
                  <VenueList/>
               </SideBar>
               {console.log(this.venues)}
               <map></map>
            </div>
            <footer>
               <span className="copyrights=">&copy; 2018 Copyright Text </span>
               <span className="more-links"><a className="grey-text text-lighten-4" href="#!">More Links</a></span>
            </footer>
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

// Runtime type checking for React props and similar objects.
// https://www.npmjs.com/package/prop-types
App.propTypes = {
   venues: PropTypes.object,
   names: PropTypes.object,
   photos: PropTypes.object,
   venueID: PropTypes.object,
   short: PropTypes.object,
   prefix: PropTypes.object,
   suffix: PropTypes.object,
   markers: PropTypes.array,
}
