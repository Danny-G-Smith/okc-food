import React, { Component } from 'react'
import { SideNav, Button } from 'react-materialize'

class AddButtonTrigger extends Component {

   handleChange = (e) => {
      const query = e.target.value
      this.setState({query})
      this.props.handleInput(query)
   }

   render () {

      return (
         <div id="sideBarWrapper">
            <SideNav id="slide-out"
               className="venueList sidenav sidenav-fixed
                          fixed show-on-large"
               options={{
                  triggerView: 'showOnLarge',
                  showOnLarge: true,
                  edge: 'right',
                  preventScrolling: false,
                  closeOnClick: true,
                  fixed: true,
                  isFixed: true
               }}
               // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker
               trigger={<Button className='side-bar-trigger'>VENUE</Button>}
               fixed={true}
            >
               {
                  this.props.venues &&
                  this.props.venues.map((venue, idx) => (
                     <button
                        key={idx}
                        className='venueItem'
                        id={venue.id}
                        tabIndex="0"
                        onClick={_ => this.props.handleClick(venue)}
                     // Add Restraint to sidebar button
                     >
                        {venue.name}
                     </button>
                  ))
               }
            </SideNav>
         </div>
      )
   }
}

export default AddButtonTrigger
