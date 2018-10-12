import React, { Component } from 'react'
import VenueItem from './VenueItem'
// import SquareAPI from "../API/"

class VenueList extends Component {

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
            animation: window.google.maps.Animation.DROP,
            name: item.venue.name,
            popup: item.popup
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

   render () {
      return (
         <ol className="venueList">
            {this.props.venues &&
            this.props.venues.map((venue, idx) => (
               <VenueItem key={idx} name={venue}
               {...this.props}
               // handleListItemClick={this.props.handleListItemClick}
               />
            ))}
         </ol>
      );
   }
}

export default VenueList
