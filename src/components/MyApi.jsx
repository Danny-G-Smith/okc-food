import React, { Component } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import ErrorBoundary from './ErrorBoundary'

class MyApi extends Component {
   constructor (props) {
      super(props)

      this.state = {
         list: [],
         venues: [],
      }

      // Instance properties
      this.google_map = `${process.env.REACT_APP_google_map}`
   }

   updateSearchString = (searchString) => {
      if (searchString) {
         this.setState({searchString})
      } else {
         this.setState({searchString: ''})
      }
   }

   componentDidMount () {
      window.gm_authFailure = () => {
         alert('ERROR!! \nFailed to get Google map.')
         console.log('ERROR!! \nFailed to get Google map.')
      }

      this.getVenues()
   }

   renderMap = () => {
      __loadScript(`${process.env.REACT_APP_google_map}`)
      window.initMap = this.initMap
   }

   getVenues = () => {

      const parameters = {
         client_id: `${process.env.REACT_APP_client_id}`,
         client_secret: `${process.env.REACT_APP_client_secret}`,
         query: 'food', //`${process.env.REACT_APP_food}`,
         intent: 'browse', //`${process.env.REACT_APP_browse}`,
         ll: '35.522489,-97.619255',
         center: '35.52248, -97.619255',
         google_map: `${process.env.REACT_APP_google_map}`,
         radius: 10000, //`${process.env.REACT_APP_radius}`,
         v: `${process.env.REACT_APP_v}`
      }

      const explore = 'https://api.foursquare.com/v2/venues/explore?'
      const list = 'https://api.foursquare.com/v2/venues/'
      const search = 'https://api.foursquare.com/v2/venues/search?'
      const venues = 'https://api.foursquare.com/v2/venues/'

      axios.get(
         explore + new URLSearchParams(parameters),
         list + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               venues: response.data.response.groups[0].items.map(element => element.venue)
            }, this.renderMap())

         })
         .catch(error => {
            alert('ERROR!! ' + error + '\nFailed to get FourSquare data.')
            console.log('ERROR!! ' + error)
         })

   }

   handleClick = (venue) => {
      const {marker, infoWindow} = venue

      this.state.venues.forEach(({marker: m, infoWindow: i}) => {
         if (m === marker) {
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            infoWindow.open(marker.map, marker)

            window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
               marker.setAnimation(null)
            })
         } else {
            m.setAnimation('none')
            i.close()
         }
      })
   }

   handleInput = (query) => {

      this.setState(({venues}) => {
         const list = venues.filter((venue) => {
            return venue.name.toLowerCase().includes(query.toLowerCase())
         })

         const v = venues.map(venue => {
            if (!list.includes(venue)) {
               venue.marker.setVisible(false)
               venue.infoWindow.close()
            }
            else {
               venue.marker.setVisible(true)
            }
            return venue.marker
         })

         return ( {list} )
      })
   }

   // Initialize Google map
   initMap = () => {
      //const { lat, lng } = this.state.center;
      this.map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 35.52248, lng: -97.619255},
         zoom: 13,
         mapTypeControl: false,
         styles: [
            {
               'featureType': 'administrative',
               'stylers': [
                  {
                     'lightness': 33
                  },
                  {
                     'visibility': 'on'
                  }
               ]
            },
            {
               'featureType': 'landscape',
               'stylers': [
                  {
                     'color': '#efefef'
                  }
               ]
            },
            {
               'featureType': 'poi.park',
               'elementType': 'geometry',
               'stylers': [
                  {
                     'color': '#e3eed3'
                  }
               ]
            },
            {
               'featureType': 'poi.park',
               'elementType': 'labels',
               'stylers': [
                  {
                     'lightness': 20
                  },
                  {
                     'visibility': 'on'
                  }
               ]
            },
            {
               'featureType': 'road',
               'stylers': [
                  {
                     'lightness': 20
                  }
               ]
            },
            {
               'featureType': 'road.arterial',
               'elementType': 'geometry',
               'stylers': [
                  {
                     'color': '#bdcdd3'
                  }
               ]
            },
            {
               'featureType': 'road.highway',
               'elementType': 'geometry',
               'stylers': [
                  {
                     'color': '#83a5b0'
                  }
               ]
            },
            {
               'featureType': 'road.local',
               'elementType': 'geometry',
               'stylers': [
                  {
                     'color': '#ffffff'
                  }
               ]
            },
            {
               'featureType': 'water',
               'stylers': [
                  {
                     'color': '#b5cbe4'
                  },
                  {
                     'visibility': 'on'
                  }
               ]
            }
         ]
      })

      this.setMarkers()  // Set markers
   }

   // Set an infoWindow for each marker
   setInfoWindow = () => {
      this.setState(state => {
         //Iterate through markers
         const venues = state.venues.map(venue => {
            // console.log(venue)
            // New infoWindow
            let infoWindow = new window.google.maps.InfoWindow()

            // Set content
            infoWindow.setContent(
               //`<p>${venue.name}</p>`
               `${'<h3>' + venue.name + '</h3><br>' +
               venue.location.formattedAddress[0] + '<br>' +
               venue.location.formattedAddress[1] + '<br>' +
               venue.location.formattedAddress[2] + '<br>'
                  }`
            )

            // Add to list of infoWindows
            venue.infoWindow = infoWindow
            return venue
         })

         return ( {venues, list: venues} )
      })
   }

   // Set the markers based on the list items
   setMarkers = () => {
      //const { venues, markers } = this.state

      // Iterate through the list items

      this.setState(state => {

         const venues = state.venues.map(item => {

            // Create new marker with info of current list item
            let marker = new window.google.maps.Marker({

               position: {
                  lat: item.location.lat,
                  lng: item.location.lng
               },
               map: this.map,
               store_id: item.venueID,
               animation: window.google.maps.Animation.DROP,
               name: item.name,
               icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
               }
            })

            item.marker = marker  // Add marker to list

            // Add marker click event listener
            marker.addListener('click', _ => {
               this.handleClick(item)  // Pass event to parent handler
               // this.checkInfoWindows()          // Set the appropriate infoWindow
            })

            return item
         })

         return ( {venues} )
      })

      this.setInfoWindow()   // Create and infoWindow for all of the markers
   }

   render () {

      return (
         <div className="MyApi">

            {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
            <div id="map"></div>
            <SideBar
               {...this.state}
               role="application"
               aria-label="map"
               venues={this.state.list}
               updateSearchString={this.updateSearchString}
               handleClick={this.handleClick}
               handleInput={this.handleInput}
            />

         </div>
      )
   }
}

const __loadScript = (url) => {
   var index = window.document.getElementsByTagName('script')[0]
   var script = window.document.createElement('script')
   script.src = url
   script.async = true
   script.defer = true
   index.parentNode.insertBefore(script, index)
}

export default MyApi
