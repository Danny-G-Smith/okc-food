import React, { Component } from 'react'
import MyApi from './MyApi'

// import { markers, setInfoWindow } from './MyApi'

class AddButtonTrigger extends Component {
   constructor (props) {
      super(props)

      this.state = {
         query: ''
      }
   }

   handleChange = (e) => {
      const query = e.target.value;
      this.setState({ query });
      this.props.handleInput(query);
   }

   state = {
      idx: '',
      names: [],
      list: [],
      short: [],
      venueID: [],
      venues: [],
      venue: '',
   }

   AddButtonTrigger () {
      const {list, idx} = this.props

      console.log('list[idx] ' + list[idx])
      console.log('idx ' + idx)
      window.google.maps.event.trigger(list[idx], 'click')
      //this.props.markers[idx].setAnimation(window.google.maps.Animation.BOUNCE)
   }

   render () {
      const {list, venueID, markers, venues, idx} = this.props

      return (
         <ol className="venueList">
            {this.props.venues &&
             this.props.venues.map((venues, idx) => (
               <li key={this.props.idx}

                   className={'venueItem'}
                  id={venueID}
                  role="button" tabIndex="0"
                  onClick={ () => this.props.markers[idx]}
                  {...idx} {...venueID} {...list}
               >
                  {this.props.venues[idx]}
               </li>
               ))}
         </ol>
      )
   }
}

export default AddButtonTrigger


