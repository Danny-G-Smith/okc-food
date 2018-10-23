import React, { Component } from 'react'
// import { markers, setInfoWindow } from './MyApi'

class AddButtonTrigger extends Component {
   constructor (props) {
      super(props)

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
      const {list, venueID, markers} = this.props

      return (
         <ol className="venueList">
            {list &&
            list.map((list, idx) => (
               <li key={idx}
                  className={'venueItem button'}
                  id={venueID}
                   role="button" tabIndex="0"
                   onClick={event => markers[idx]}>
                  {list[idx]}
            </li>
         ))}
         </ol>
      )
   }
}

export default AddButtonTrigger


