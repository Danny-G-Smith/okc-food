import React, { Component } from 'react'
//import MyApi from './MyApi'

class AddButtonTrigger extends Component {

   handleChange = (e) => {
      const query = e.target.value;
      this.setState({ query });
      this.props.handleInput(query);
   }

   // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker

   render() {

      return (
         <ol className="venueList">

            {this.props.venues &&
            this.props.venues.map((venue, idx) => (
               <li
                  key={idx}
                  className='venueItem'
                  id={venue.id}
                  role="button" tabIndex="0"
                  onClick={ _ => this.props.handleClick(venue) }
               >
                  {venue.name}
               </li>
            ))}
         </ol>
      )
   }
}

export default AddButtonTrigger
