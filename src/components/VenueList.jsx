import React, { Component } from 'react'

class VenueList extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.idx = ''
      this.venue = ''
      this.id = 0
      this.list = []
      this.venueID = ''
      this.markers = []
      // this.infowindow = props.infowindow
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

   // Find the matching infoWindow for the current item
   // match = this.infoWindows
   //    .find(infoWindow =>               // Search the infoWindow list
   //       infoWindow.content              // Check the content string
   //          .includes(this.list.venue.name));  // See if it includes the item name
   //console.log( match );

   render () {
      // props.markers[props.idx].addEventListener("click", function(e) {
      //    window.google.maps.event.trigger(props.markers[props.idx], 'click');
      // })

      // // Get the element, add a click listener...
      // document.getElementById("parent-list").addEventListener("click", function(e) {
      //    // e.target is the clicked element!
      //    // If it was a list item
         {/*if(e.target && e.target.nodeName == "LI") {*/}
            {/*// List item found!  Output the ID!*/}
      //       console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
      //    }
      // });
      //
      // venue.addListener('click', _ => {
      //    this.props.handleClick(item.venue.id);  // Pass event to parent handler
      //    this.checkInfoWindows();                // Set the appropriate infoWindow
      // })


      return (
         <ol className="venueList" id="venueList">
            {this.props.venues &&
            this.props.venues.map((venue, idx) => (
               <li key={idx} className={'venueItem'}
                  onClick={window.google.maps.event.trigger(this.props.markers[this.props.venueID], 'click')}
                     //window.google.maps.event.trigger(this.props.markers[this.props.venueID], 'click')}
                >
                  {venue}
               </li>
            ))}
         </ol>
      )
   }
}

export default VenueList
