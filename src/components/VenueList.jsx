import React, { Component } from 'react'
import MyApi  from './MyApi'
import AddButtonTrigger  from './AddButtonTrigger'

class VenueList extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.idx = ''
      this.venue = ''
      this.id = 0
      this.list = []
      this.venueID = ''

      //this.state = {addButtonTrigger: idx}

      // This binding is necessary to make `this` work in the callback
      //this.addButtonTrigger = this.addButtonTrigger.bind(this);
   }
   handleClick = (id) => {
      this.setState(props => {
         const list = props.list.map(venue => {
            if (list.venue.id === id) {
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

   // Create an array of all the current list items names
   //const markers = markers.map(item => item.venue.name);


   // Find the matching infoWindow for the current item
   // match = this.infoWindows
   //    .find(infoWindow =>               // Search the infoWindow list
   //       infoWindow.content              // Check the content string
   //          .includes(this.list.venue.name));  // See if it includes the item name
   //console.log( match );

   render () {

      return (
         <AddButtonTrigger />
      )
   }
}

export default VenueList
