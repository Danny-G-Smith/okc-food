import React, { Component } from 'react'
//import App from '../App'

class VenueList extends Component {

   // Set an infoWindow for each marker
   setInfoWindow = () => {
      //Iterate through markers
      this.markers.forEach(marker => {
         // New infoWindow
         let infoWindow = new window.google.maps.InfoWindow()

         // Set content
         infoWindow.setContent(`<p>${marker.name}</p>`)

         // Add to list of infoWindows
         this.infoWindows.push(infoWindow)
      })
   }

   // Render the info windows based on list item popup property
   checkInfoWindows = () => {
      const {list} = this.props

      // Iterate thorugh the list items
      list.forEach((item, i) => {

         // Find the matching infoWindow for the current item
         const match = this.infoWindows
            .find(infoWindow =>               // Search the infoWindow list
               infoWindow.content              // Check the content string
                  .includes(item.venue.name))  // See if it includes the item name

         // If the item popup is true
         if (item.popup) {
            // Open infoWindow
            match.open(this.markers[i].map, this.markers[i])
         }
         else {
            match.close()  //Otherwise, close it.
         }
      })
   }

   // Set the markers based on the list items
   setMarkers = () => {
      const {list} = this.props

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

         this.markers.push(marker)  // Add marker to list
         this.setInfoWindow()       // Create and infoWindow for all of the markers

         // Add marker click event listener
         marker.addListener('click', _ => {
            this.props.handleClick(item.venue.id)  // Pass event to parent handler
            this.checkInfoWindows()                // Set the appropriate infoWindow
         })
      })
   }

   render () {
      return (
         <ol className="venueList">
            {this.props.venues &&
             this.props.venues.map((venue, idx) => {
               //{/*<VenueItem key={idx} name={venue}*/}
               //{/*{...this.props}*/}
               // handleListItemClick={this.props.handleListItemClick}
               // />
            })}
         </ol>
      )
   }
}

export default VenueList
