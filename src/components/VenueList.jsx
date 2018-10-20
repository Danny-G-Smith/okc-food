import React, { Component } from 'react'

class VenueList extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.idx = 0
      this.venue = ''
      this.id = 0
   }

   // Find the matching infoWindow for the current item
   // match = this.infoWindows
   //    .find(infoWindow =>               // Search the infoWindow list
   //       infoWindow.content              // Check the content string
   //          .includes(this.list.venue.name));  // See if it includes the item name
   //console.log( match );

   render () {
      return (
         <ol className="venueList" id="venueList">
            {this.props.venues &&
            this.props.venues.map((venue, idx) => (

               <li key={idx} className={'venueItem'} id={this.props.venueID[idx]}>
                  {venue}
               </li>

            ))}
         </ol>
      )
   }
}

export default VenueList
