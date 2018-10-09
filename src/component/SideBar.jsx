import React, { Component } from 'react'
import VenueList from './VenueList'

class SideBar extends Component {
   render () {
      return (
         <div className="sideBar">
            <input  type={"search"}
                    id={"search"}
               placeholder={"Filter Venues"}
                    onChange={(event) => this.props.updateSearchString(event.target.value)}
            />
            <VenueList venues={this.props.venues}
                       handleListItemClick={this.props.handleListItemClick}/>
         </div>
      )
   }
}
export default SideBar;

