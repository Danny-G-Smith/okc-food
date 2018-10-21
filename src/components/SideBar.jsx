import React, { Component } from 'react'
import VenueList from './VenueList'

class SideBar extends Component {
   constructor (props) {
      super(props)

      // Instance properties
      this.idx = ''
      this.venue = ''
      this.id = 0
      // this.markers = props.markers
      // this.infowindow = props.infowindow
   }

   render () {
      return (
         <div className="sideBar">
            <input  type={"search"}
                    id={"search"}
               placeholder={"Filter Venues"}
                    onChange={(event) => this.props.updateSearchString(event.target.value)}
            />
            <VenueList venues={this.props.venues}
            >
               <li key={this.props.idx}>
                  {...this.props}
               </li>
            </VenueList>
         </div>
      )
   }
}
export default SideBar;

