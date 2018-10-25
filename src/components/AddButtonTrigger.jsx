import React, { Component } from 'react'
//import MyApi from './MyApi'

class AddButtonTrigger extends Component {
   constructor (props) {
      super(props)
      //this.AddButtonTrigger = this.AddButtonTrigger.bind(this);

      this.state = {
         query: ''
      }

      // Instance properties
      this.idx = ''           // Component wide access to markers
      this.venueID = ''           // Component wide access to markers
      this.list = []       // Component wide access to markers
      this.markers = []       // Component wide access to markers
   }

   handleChange = (e) => {
      const query = e.target.value;
      this.setState({ query });
      this.props.handleInput(query);
   }

   // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker
   triggerMarker = (idx) => {

      window.google.maps.event.trigger(this.props.markers[idx], "click")
      console.log(this.props.markers[idx])
      //this.props.markers[idx].setAnimation(window.google.maps.Animation.BOUNCE);
   }

   render () {
      //const {list, venueID, venues, idx, markers} = this.props


      return (
         <ol className="venueList">

            {this.props.venues &&
            this.props.venues.map((venues, idx) => (
               <li key={idx}
                   markers={this.props.markers}
                   mymarkers={this.props.mymarkers}
                   className={'venueItem'}
                  id={this.props.venueID}
                  role="button" tabIndex="0"
                  onClick={event => this.triggerMarker(idx)}
               >
                  {this.props.venues[idx]}
               </li>
               ))}
         </ol>
      )
   }
}

export default AddButtonTrigger


