import React, { Component } from 'react'

class VenueItem extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.idx   = 0
      this.venue = ''
      this.list = ''
      this.id    = 0
   }

   render () {
      return (
            {/*<li  key={this.props.idx} id={this.props.venueID[this.props.idx]} >*/}
               {this.props.venue}
            // </li>
      )
   }
}

export default VenueItem

