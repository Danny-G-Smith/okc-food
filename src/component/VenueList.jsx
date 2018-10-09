import React, { Component } from 'react'
import VenueItem from './VenueItem'
// import SquareAPI from "../API/"

class VenueList extends Component {
   render () {
      return (
         <ol className="venueList">
            {this.props.venues &&
            this.props.venues.map((venue, idx) => (
               <VenueItem key={idx} name={venue}
               handleListItemClick={this.props.handleListItemClick}/>
            ))}
         </ol>
      );
   }
}

export default VenueList

