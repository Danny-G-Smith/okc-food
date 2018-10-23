import React, { Component } from 'react'
import { markers, setInfoWindow } from './MyApi'

class AddButtonTrigger extends Component {
   constructor (props) {
      super(props)
      //this.AddButtonTrigger = this.AddButtonTrigger.bind(this)

      // Create an array of all the current list items names
      //const markersID = this.markers.map(item => item.venue.id);
   }

   // initMap = () => {
   //    //const { lat, lng } = this.state.center;
   //    this.map = new window.google.maps.Map(document.getElementById('map'), {
   //       center: {lat: 35.52248, lng: -97.619255},
   //       zoom: 13
   //    })

   //    this.setMarkers();  // Set markers
   //    this.setButtons();  // Set buttons
   // };

   AddButtonTrigger (venueID, idx, markers, maps) {
      console.log(venueID)
      window.google.maps.event.trigger(this.props.venues.venue[idx], 'click')
      //this.props.markers[idx].setAnimation(window.google.maps.Animation.BOUNCE)
   }

   render () {
      const {venues, map, venue, venueID, idx, venueItem, AddButtonTrigger} = this.props

      return (
         <ol className="venueList">
            {venues && venues.map((venues, venueID) => (
               <li key={idx} className={'venueItem button'} id={venueID[idx]}
                   onClick={this.AddButtonTrigger.bind(this, venueID[idx])}>
                  {venues}
               </li>
            ))}
         </ol>
      )
   }
}

export default AddButtonTrigger


