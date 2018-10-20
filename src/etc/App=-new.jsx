import React, { Component } from 'react'
import MyApi from './components/MyApi'
//import VenueList from './components/VenueList'
//import SideBar from './component/SideBar'
import axios from 'axios'
import './App.css'
import PropTypes from 'prop-types'
// https://www.npmjs.com/package/prop-types

require('dotenv').config()

class App extends Component {
   state = {
      center: [],          //  `${process.env.REACT_APP_center}`,
      client_id: [],       //  `${process.env.REACT_APP_client_id}`,
      client_secret: '',   //  `${process.env.REACT_APP_client_secret}`,
      google_map: [],      //  `${process.env.REACT_APP_google_map}`,
      list: [],            //  `${process.env.REACT_APP_list}`,
      radius: [],          //  `${process.env.REACT_APP_radius}`,
      v: [],               //  `${process.env.REACT_APP_v}`,
      venues: [],          //  `${process.env.REACT_APP_venues}`
   }

   updateSearchString = (searchString) => {
      if (searchString) {
         this.setState({searchString})
      } else {
         this.setState({searchString: ''})
      }
   }

   componentDidMount () {
      this.getVenues()
      this.myDebug()
   }

   // renderMap = () => {
   //    __loadScript(`${process.env.REACT_APP_google_map}`)
   //    window.initMap = this.initMap
   // }

   getVenues = () => {

      // this.state.center        =  {lat: 35.52248, lng: -97.619255},
      // this.state.client_id     =  `${process.env.REACT_APP_client_id}`,
      // this.state.client_secret =  `${process.env.REACT_APP_client_secret}`,
      // this.state.google_map    =  `${process.env.REACT_APP_google_map}`,
      // // this.state.list          =
      // this.state.radius        =  `${process.env.REACT_APP_radius}`
      // this.state.v             =  `${process.env.REACT_APP_v}`
      // // this.state.venues        =




      const parameters = {
         client_id:           `${process.env.REACT_APP_client_id}`,
         client_secret:       `${process.env.REACT_APP_client_secret}`,
         query:               'food',                 //`${process.env.REACT_APP_food}`,
         intent:              'browse',               //`${process.env.REACT_APP_browse}`,
         ll:                  '35.522489,-97.619255',
         radius:              10000,                  //`${process.env.REACT_APP_radius}`,
         v:                   `${process.env.REACT_APP_v}`
      }

      const explore  = 'https://api.foursquare.com/v2/venues/explore?'
      const list     = 'https://api.foursquare.com/v2/venues/'
      const search   = 'https://api.foursquare.com/v2/venues/search?'
      const short    = 'https://api.foursquare.com/v2/venues/'
      const venues   = 'https://api.foursquare.com/v2/venues/'

      // https://www.npmjs.com/package/dotenv
      // https://medium.com/@danieljameskay/create-react-app-dotenv-281693a19ecd
      // # with npm
      // npm install dotenv --S
      // require('dotenv').config()
      // There is a quirk here, if we weren't using create-react-app we wouldn't
      // have to place REACT_APP_ in front of the variable.
      //

      axios.get(
         explore + new URLSearchParams(parameters),
         list + new URLSearchParams(parameters),
         search + new URLSearchParams(parameters),
         short + new URLSearchParams(parameters),
         venues + new URLSearchParams(parameters),
      )
         .then(response => {
            this.setState({
               address: response.data.response.groups[0].items.map(element => element.venue.location.formattedAddress),
               list: response.data.response.groups[0].items,
               names: response.data.response.groups[0].items.map(element => element.venue.name),
               short: response.data.response.groups[0].items.map(element => element.venue.categories[0].shortName),
               venueID: response.data.response.groups[0].items.map(element => element.venue.id),
               venues: response.data.response.groups[0].items
               //photos:  response.data.response.photos.items[0].items.map(element => element.venue.categories[0].shortName),
               //photoURLs: [this.state.photoURLs, photoURL]
               //}))
               // prefix:  response.data.response.photos.items[0].map(element => element.prefix),
               // suffix:  response.data.response.photos.items[0].map(element => element.suffix),}, this.renderMap())
            }, this.renderMap())

         })
         .catch(error => {
            this.myDebug()
            console.log('ERROR!! ' + error)
         })
   }

   handleClick =
      (id) => {
         this.setState(state => {
            const list = state.list.map(venue => {
               if (venue.venue.id === id) {
                  venue.popup = true
               }
               else {
                  venue.popup = false
               }
               return venue
            })

            return ( {list} )
         })
      }

   handleInput = (query) => {
      this.setState(({venues}) => {
         const list = venues.filter(({venue}) => {
            return venue.name.toLowerCase().includes(query.toLowerCase())
         })

         return ( {list} )
      })
   }

   render () {
      return (
         <div className="App">
            {/*<VenueList {...this.state} handleClick={this.handleClick} handleInput={this.handleInput}/>*/}

            {/* Vanilla Google Map, and FourSquare */}
            <MyApi {...this.state} handleClick={this.handleClick}/>

         </div>
      )
   }

   myDebug = () => {
      console.log('venues: ' + this.state.venues)
      console.log('list: ' + this.state.list)
      console.log('center: ' + this.state.center)
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

// Runtime type checking for React props and similar objects.
// https://www.npmjs.com/package/prop-types
App.propTypes = {
   list:    PropTypes.object,
   markers: PropTypes.array,
   names:   PropTypes.object,
   short:   PropTypes.object,
   venueID: PropTypes.object,
   venues:  PropTypes.object,
   //photos: PropTypes.object,
   //prefix: PropTypes.object,
   //suffix: PropTypes.object,
}

export default App
