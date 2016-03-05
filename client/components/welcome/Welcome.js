import React from 'react'
import {Jumbotron} from 'react-bootstrap'

export default class Welcome extends React.Component {
  render() {
    return (
      <Jumbotron className='jumbotron'>
        <span className='welcomeText'>local host</span>
      </Jumbotron>
    )
  }
}
