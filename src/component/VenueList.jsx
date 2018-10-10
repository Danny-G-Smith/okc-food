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
            {this.props.venues &&
               this.props.venues.map((venue, idx) => (
               <VenueItem key={idx} name={venue}
                       // handleListItemClick={this.props.handleListItemClick}
                       // https://developers.google.com/maps/documentation/javascript/reference/event#event.trigger
                  onClick={() => {window.google.maps.event.trigger('venues', document.getElementsByClassName('venueList')[idx])}}
               />
               ))}
         </ol>
      );
   }
}

export default VenueList
