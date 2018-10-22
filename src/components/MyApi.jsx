import React, { Component } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import VenueList from './VenueList'

require('dotenv').config()

export default class MyApi extends Component {
   constructor(state) {
      super(state)
      this.addButtonTrigger = this.addButtonTrigger.bind(this);

      // Instance properties
      this.map = null        // Component wide access to map
      this.markers = []  // Component wide access to markers
      this.list = [] //
      this.infoWindows = []  // Component wide access to infoWindows
      this.google_map = `${process.env.REACT_APP_google_map}`
      this.center = `${process.env.REACT_APP_center}`
      this.center_lat = parseFloat(`${process.env.REACT_APP_center_lat}`)
      this.center_lng = parseFloat(`${process.env.REACT_APP_center_lng}`)
   }

   state = {
      idx: '',
      markers: [],
      names: [],
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
      const short = 'https://api.foursquare.com/v2/venues/'
      const venues = 'https://api.foursquare.com/v2/venues/'

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
            }, this.renderMap())

         })
         .catch(error => {
            console.log('ERROR!! ' + error)
         })
   }

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

   // Initialize Google map
   initMap = () => {
      //const { lat, lng } = this.state.center;
      this.map = new window.google.maps.Map(document.getElementById('map'), {
         center: {lat: 35.52248, lng: -97.619255},
         zoom: 13
      })

      this.setMarkers();  // Set markers
      //this.setButtons();  // Set buttons
   };

   // Set an infoWindow for each marker
   setInfoWindow = () => {
      //Iterate through markers
      this.markers.forEach(marker => {
         // New infoWindow
         let infoWindow = new window.google.maps.InfoWindow();

         // Set content
         infoWindow.setContent(
            `<p>${marker.name}</p>`);

         // Add to list of infoWindows
         this.infoWindows.push(infoWindow)
      })
   };

   // Render the info windows based on list item popup property
   checkInfoWindows = () => {
      const { list } = this.state;

      // Iterate thorugh the list items
      list.forEach((item, i) => {

         // Find the matching infoWindow for the current item
         const match = this.infoWindows
            .find(infoWindow =>               // Search the infoWindow list
               infoWindow.content              // Check the content string
                  .includes(item.venue.name));  // See if it includes the item name

         // // If the item popup is true
         // if (item.popup) {
         //    // Open infoWindow
         //    match.open(this.markers[i].map, this.markers[i]);
         // }
         // else {
         //    match.close();  //Otherwise, close it.
         // }
      })
   }

   // Set the markers based on the list items
   setMarkers = () => {
      const { list, markers } = this.state;

      // Iterate through the list items
      list.forEach(item => {

         // Create new marker with info of current list item
         let marker = new window.google.maps.Marker({

            position: {
               lat: item.venue.location.lat,
               lng: item.venue.location.lng
            },
            map: this.map,
            animation: window.google.maps.Animation.DROP,
            name: item.venue.name,
            popup: item.popup
         })

         this.markers.push(marker);  // Add marker to list
         this.setState({markers});

         this.setInfoWindow();   // Create and infoWindow for all of the markers

         // Add marker click event listener
         marker.addListener('click', _ => {
            this.handleClick(item.venue.id);  // Pass event to parent handler
            this.checkInfoWindows();          // Set the appropriate infoWindow
         })
      })
      // if (markers) {
      //    this.setState({markers});
      // } else {
      //    this.setState({markers: ''});
      // }

   };

   // Check the which markers should be rendered
   checkMarkers = () => {
      const { list } = this.state;

      // Create an array of all the current list items names
      const listNames = list.map(item => item.venue.name);

      // Iterate through the markers
      this.markers.forEach(marker => {

         // If the current marker does not match one of the list items
         if (!listNames.includes(marker.name)) {
            marker.setVisible(false);     // Remove it

            // Find the matching infoWindow
            this.infoWindows
               .find(infoWindow =>         // Search the list of infoWindows
                  infoWindow.content        // Compare the content string
                     .includes(marker.name)) // with the current marker's name
               .close();                   // Ensure that infoWindow is closed
         }
         else {
            marker.setVisible(true);      // Otherwise, make the marker visible
         }
      })
   }

   setButtons = () => {
      const { venues, idx, markers } = this.props;
      console.log('markers: ' + this.state.markers)
      venues &&
      venues.map((venue, idx) => (
         this.addButtonTrigger()
      ))
   }

   addButtonTrigger = (idx) => {
      window.google.maps.event.trigger(this.state.markers[idx], "click")
      this.state.markers[idx].setAnimation(window.google.maps.Animation.BOUNCE);
   }

   // Handle data changes from map
   // componentDidUpdate = (state) => {
   //
   //    // List changes from filtering
   //    if (this.state.list.length !== state.list.length) {
   //       this.checkMarkers();  // Change the markers accordingly
   //    }
   //    // Possible changes to popup values
   //    else if (this.state.list !== state.list) {
   //       this.checkInfoWindows();  // Change the popups accordingly
   //    }
   // }

   render () {
      return (
         <div className="MyApi">

            {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
            <div id="map"> </div>
            <SideBar {...this.state}
                     venues={this.state.names.filter(name => name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
                     updateSearchString={this.updateSearchString}
            >
               {/*<input className="search"/>*/}
               <VenueList {...this.state}/>
            </SideBar>

         </div>
      )
   }
}


const __loadScript = (url) => {
   var index = window.document.getElementsByTagName("script")[0]
   var script = window.document.createElement("script")
   script.src = url
   script.async = true
   script.defer = true
   index.parentNode.insertBefore(script, index)
}
