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
      list: [],
      names: [],
      searchString: '',
      short: [],
      venueID: [],
      venues: [],
   }

   // updateSearchString = (searchString) => {
   //    if (searchString) {
   //       this.setState({searchString});
   //    } else {
   //       this.setState({searchString: ''});
   //    }
   // }
   //
   // // 717-8629
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
               short:   response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues:  response.data.response.groups[0].items
            }, this.renderMap())

         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }


   initMap = () => {


      var map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 35.52248, lng: -97.619255},
         disableDefaultUI: true,
         scrollwheel: false,
         zoom: 13
      })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow()

      // Display Dynamic Markers
      this.state.venues.map(myVenue => {

         const contentString =
            `<p>${myVenue.venue.name}<br>
            ${myVenue.venue.location.formattedAddress[0]}<br>
            ${myVenue.venue.location.formattedAddress[1]}<br>
            ${myVenue.venue.location.formattedAddress[2]}</p>
            `

         var myMapContainer = []

         // Create A Marker
         var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
            map: map,
            //draggable: true,
            animation: window.google.maps.Animation.DROP,
            //title: myVenue.venue.name,
            icon: {
               url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            }
         })

         myMapContainer.push(marker)

         window.google.maps.event.addListener(infowindow,'closeclick',function(e){
            marker.setAnimation(null);
            //marker.setAnimation(window.google.maps.Animation.BOUNCE);
         });

         // getVenues = () => {
         marker.addListener('click', function() {
            infowindow.setContent(contentString)
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
         });

         marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent(contentString)
         });
         return(true)
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
               {/*{console.log(this.venues)}*/}
            </div>
            <Footer copyrights="&copy 2018 Copyright Text"
                    moreLinks={
                       <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }>
            </Footer>
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
   list:   PropTypes.object,
   markers: PropTypes.array,
   names: PropTypes.object,
   short: PropTypes.object,
   venueID: PropTypes.object,
   venues: PropTypes.object,
}