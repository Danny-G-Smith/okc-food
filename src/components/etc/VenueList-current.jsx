import React, { Component } from 'react'

export default class VenueList extends Component {
  constructor(props) {
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
  
  render() {
    const { handleClick, list } = this.props;
    return (
      <div style={{
        position: 'absolute',
        zIndex: 1000,
        height: '50%',
        width: '20%',
        left: '5%',
        top: '2%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'darkgrey',
        opacity: 0.90
      }}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          style={{
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 20,
            height: 30
          }}
        />
        <ul style={{
          listStyle: 'none',
          padding: 10,
        }}
        >
          {list.map(({ venue, popup }) => {
            const { id, name } = venue;
            return (<li
              key={id}
              onClick={_ => handleClick(id)}
              style={{
                padding: 10,
                borderBottom: '1px solid grey',
                boxShadow: popup ? '0 0 15px 0 black inset' : ''
              }}
            >
              {name}
            </li>)
          })}
        </ul>
      </div>
    )
  }
}
