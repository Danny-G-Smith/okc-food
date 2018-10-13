import React, { Component } from 'react'
//import {handleListItemClickI} from "../API/"

class VenueItem extends Component {

   // Set the markers based on the list items
   setMarkers = () => {
      const { list } = this.props;

      // Iterate through the list items
      list.forEach(item => {
         // Create new marker with info of current list item
         let marker = new window.google.maps.Marker({
            position: {
               lat: item.venue.location.lat,
               lng: item.venue.location.lng
            },
            map: this.map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            name: item.venue.name,
            popup: item.popup
         })

         this.markers.push(marker);  // Add marker to list
         this.setInfoWindow();       // Create and infoWindow for all of the markers

         // Add marker click event listener
         marker.addListener('click',  _ => {
            this.props.handleClick(item.venue.id);  // Pass event to parent handler
            this.checkInfoWindows();                // Set the appropriate infoWindow
         })
      })
   };

   render () {
      return (
         <div>
            <li className="venueItem button">
               {this.props.name}
            </li>
         </div>
      )
   }
}

export default VenueItem
