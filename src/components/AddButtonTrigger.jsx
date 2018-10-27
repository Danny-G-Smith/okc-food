import React, { Component } from 'react'
import { SideNav, SideNavItem, Button } from 'react-materialize'

//import MyApi from './MyApi'

class AddButtonTrigger extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      //this.props.isFixed = true

      // this.options = {
      //    'edge': 'right',
      //
      //    'showOnLarge': 'PropTypes.bool'
      // }
   }

   handleChange = (e) => {
      const query = e.target.value
      this.setState({query})
      this.props.handleInput(query)
   }

   // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker

   render () {

      return (
         <>
            <SideNav className="venueList sidenav fixed"
                     options={{
                        triggerView: 'showOnLarge',
                        showOnLarge: true,
                        edge: 'right',
                        preventScrolling: false,
                        closeOnClick: true,
                        fixed: true,
                        isFixed: true
                     }}
                     trigger={<Button>VENUE</Button>}
            >

               {

                  this.props.venues &&
                  this.props.venues.map((venue, idx) => (
                     <SideNavItem
                        key={idx}
                        className='venueItem'
                        id={venue.id}
                        role="button" tabIndex="0"
                        onClick={_ => this.props.handleClick(venue)}
                     >
                        {venue.name}
                     </SideNavItem>
                  ))}
            </SideNav>

         </>
      )

   }
}

export default AddButtonTrigger
