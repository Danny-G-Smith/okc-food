import React, { Component } from 'react'
require('dotenv').config()

export default class MyApi extends Component {
   constructor(props) {
      super(props)

      // Instance properties
      this.map = null;        // Component wide access to map
      this.markers     = [];  // Component wide access to markers
      this.infoWindows = [];  // Component wide access to infoWindows
      this.popup       = [];  // boolean value for inforwindow
      this.google_map  = `${process.env.REACT_APP_google_map}`
      this.center      = `${process.env.REACT_APP_center}`
      // this.center_lat  = `${process.env.REACT_APP_center_lat}`
      // this.center_lng  = `${process.env.REACT_APP_center_lng}`
      this.center_lat  = parseFloat(`${process.env.REACT_APP_center_lat}`);
      this.center_lng  = parseFloat(`${process.env.REACT_APP_center_lng}`);
   }

   componentDidMount = () => {
      this.renderMap();

   };

   // Setup Google map
   renderMap = () => {
      __loadScript(this.google_map)
      window.initMap = this.initMap
   }

   // renderMap = () => {
   //    __loadScript(`${process.env.REACT_APP_google_map}`)
   //    window.initMap = this.initMap
   // }

   // renderMap = () => {
   //    ____loadScript(`https://maps.googleapis.com/maps/api/js?key=${G}&callback=initMap`)
   //    window.initMap = this.initMap;
   // };

   // Initialize Google map
   initMap = () => {

      //const { lat, lng } = this.center;
      const center_lat = this.center_lat;
      const center_lng = this.center_lng;

      this.map = new window.google.maps.Map(document.getElementById('map'), {
         center: { center_lat, center_lng },
         zoom: 13
      })

      this.setMarkers();  // Set markers
   };

   // Set an infoWindow for each marker
   setInfoWindow = () => {
      //Iterate through markers
      this.markers.forEach(marker => {
         // New infoWindow
         let infoWindow = new window.google.maps.InfoWindow();

         // Set content
         infoWindow.setContent(`<p>${marker.name}</p>`);

         // Add to list of infoWindows
         this.infoWindows.push(infoWindow);

         // set all to false
         this.popup.push(false);
      })
   };

   // Render the info windows based on list item popup property
   checkInfoWindows = () => {
      const { list } = this.props;

      // Iterate through the list items
      list.forEach((item, i) => {
         console.log(list)

         // Find the matching infoWindow for the current item
         const match = this.infoWindows
            .find(infoWindow =>               // Search the infoWindow list
               infoWindow.content              // Check the content string
                  .includes(item.venue.name));  // See if it includes the item name

         // If the item popup is true
         if (this.popup[i]) {
            // Open infoWindow
            match.open(this.markers[i].map, this.markers[i]);
         }
         else {
            match.close();  //Otherwise, close it.
         }
      })
   }

   // Set the markers based on the list items
   setMarkers = () => {
      const { list } = this.props;

      // Iterate through the list items
      list.forEach(item => {
         // Create new marker with info of current list item
         let marker = new window.google.maps.Marker({
            position: {
               lat: parseFloat(this.center_lat),
               lng: parseFloat(this.center_lng)
            },
            map: this.map,
            animation: window.google.maps.Animation.DROP,
            name: item.venue.name,
            popup: this.popup
         })

         this.markers.push(marker);  // Add marker to list
         this.setInfoWindow();       // Create and infoWindow for all of the markers

         // Add marker click event listener
         marker.addListener('click', _ => {
            this.props.handleClick(item.venue.id);  // Pass event to parent handler
            this.checkInfoWindows();                // Set the appropriate infoWindow
         })
      })
   };

   // Check the which markers should be rendered
   checkMarkers = () => {
      const { list } = this.props;

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

   // Handle data changes from map
   componentDidUpdate = (props) => {

      // List changes from filtering
      if (this.props.list.length !== props.list.length) {
         this.checkMarkers();  // Change the markers accordingly
      }
      // Possible changes to popup values
      else if (this.props.list !== props.list) {
         this.checkInfoWindows();  // Change the popups accordingly
      }
   }

   render() {
      return (
         <div
            id='map'
            style={{
               height: '100vh',
               width: '100%'
            }}
         ></div>
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
