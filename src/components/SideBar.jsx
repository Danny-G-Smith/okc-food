import React, { Component } from 'react'
//import VenueList from './VenueList'
import AddButtonTrigger  from './AddButtonTrigger'

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
      const { venues, idx } = this.props;
      return (
         <div className="sideBar">
            <input  type={"search"}
                    id={"search"}
               placeholder={"Filter Venues"}
                    onChange={(event) => this.props.updateSearchString(event.target.value)}
            />
            <AddButtonTrigger {...this.props}  {...this.props.markers} {...this.props.venueID}/>
         </div>
      )
   }
}
export default SideBar;

