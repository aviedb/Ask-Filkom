import React, { Component } from 'react'

import HeaderDesktop from './headerDesktop'
import HeaderMobile from './headerMobile'

export default class Header extends Component {
  render() {
    return(
      <div>
        <HeaderDesktop user={this.props.user}/>
        <HeaderMobile user={this.props.user}/>
      </div>
    )
  }
}
