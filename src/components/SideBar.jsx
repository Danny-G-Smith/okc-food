import React, { Component } from 'react'
import AddButtonTrigger from './AddButtonTrigger'

class SideBar extends Component {
   constructor (props) {
      super(props)

      this.state = {
         query: ''
      }
   }

   handleChange = (e) => {
      const query = e.target.value
      this.setState({query})
      this.props.handleInput(query)
   }

   render() {
      // const { venues, idx } = this.props;
      return (
         <div className="sideBar">
            <input type={'search'}
               tabIndex={0}
               id={'search'}
               placeholder={'Filter Venues'}
               value={this.state.query}
               onChange={this.handleChange}
            />
            <AddButtonTrigger {...this.props} />
         </div>
      )
   }
}
export default SideBar;

