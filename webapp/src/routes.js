import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Home } from './views/home'
import { Overview } from './views/overview'
import { Contact } from './views/contact'
import emotionStyles from './style/globalStyles'

const { layoutStyle, navStyle, contentStyle } = emotionStyles

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <img alt='brandLogo' id='brand' src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19.png' />
          <ul>
            <li>
              <NavLink activeClassName='active' exact to='/' >Home</NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' to='/overview'>Overview</NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' to='/contact'>Contact Us</NavLink>
            </li>
          </ul>
          <div className='spacer' />
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Overview} exact path='/overview' />
          <Route component={Contact} exact path='/contact' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter
