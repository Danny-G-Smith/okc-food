import React, { Component } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import VenueList from './VenueList'

require('dotenv').config()

export default class MyApi extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.map = null        // Component wide access to map
      this.markers = []  // Component wide access to markers
      this.infoWindows = []  // Component wide access to infoWindows
      this.google_map = `${process.env.REACT_APP_google_map}`
      this.center = `${process.env.REACT_APP_center}`
      // this.center_lat  = `${process.env.REACT_APP_center_lat}`
      // this.center_lng  = `${process.env.REACT_APP_center_lng}`
      this.center_lat = parseFloat(`${process.env.REACT_APP_center_lat}`)
      this.center_lng = parseFloat(`${process.env.REACT_APP_center_lng}`)
   }

   state = {
      list: [],
      names: [],
      searchString: '',
      short: [],
      venueID: [],
      venues: [],
   }

   updateSearchString = (searchString) => {
      if (searchString){
         this.setState({ searchString });
      } else {
         this.setState({ searchString:''});
      }
   }

   componentDidMount () {
      this.getVenues()
   }

   renderMap = () => {
      __loadScript(`${process.env.REACT_APP_google_map}`)
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

   // Render the info windows based on list item popup property
   checkForMatch = () => {
      let item

      item.addEventListener("click", function(e) {
         // console.log( e.target )
         if (e.target && e.target.matches("li.venueItem")) {
            //window.google.maps.event.trigger(marker, 'click');
            //console.log("yes", marker )
         } else {
            //console.log("no", marker)
         }
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

   render () {
      return (
         <div className="MyApi">

            {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
            <div id="map"></div>
            <SideBar {...this.state}
                     venues={this.state.names.filter(name => name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
                     updateSearchString={this.updateSearchString}
            >
               {/*<input className="search"/>*/}
               <VenueList {...this.props} />
            </SideBar>

         </div>
      )
   }
}
   const
   __loadScript = (url) => {
      var index = window.document.getElementsByTagName('script')[0]
      var script = window.document.createElement('script')
      script.src = url
      script.async = true
      script.defer = true
      index.parentNode.insertBefore(script, index)
   }
