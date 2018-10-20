import React, { Component } from 'react'
import VenueList from './VenueList'

class SideBar extends Component {
   render (props) {
      return (
         <div className="sideBar">
            <input  type={"search"}
                    id={"search"}
               placeholder={"Filter Venues"}
                    onChange={(event) => this.props.updateSearchString(event.target.value)}
            />
            <VenueList venues={this.props.venues}{...this.props}
            >
               <li key={this.props.idx}>
               {this.props.venues[this.props.idx]}
               </li>
            </VenueList>
         </div>
      )
   }
}
export default SideBar;

