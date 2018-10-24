import React, { Component } from 'react'
import SideBar from 'src/components/SideBar'
import AddButtonTrigger from 'src/components/AddButtonTrigger'

class Template extends Component {
   render () {
      return (
         <div className="container">
            {/*https://developers.google.com/maps/documentation/javascript/tutorial*/}
            <div id="map"  {...this.props.list} {...this.props.idx}></div>
            <SideBar {...this.props}
                     venues={this.state.names.filter(name => name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
                     updateSearchString={this.updateSearchString}
            >
               <input className="search"/>
               <AddButtonTrigger  {...this.state} {...this.state.idx}>
                  <ol className="venueList">
                     {this.props.venues &&
                     this.props.venues.map((venues, idx) => (
                        <li key={this.props.idx}

                            className={'venueItem'}
                            id={venueID}
                            role="button" tabIndex="0"
                            onClick={() => this.props.markers[idx]}
                            {...idx} {...venueID} {...list}
                        >
                           {this.props.venues[idx]}
                        </li>
                     ))}
                  </ol>
               </AddButtonTrigger>
            </SideBar>
         </div>
      )
   }
}

export default Template
