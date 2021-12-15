import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './views/home'
import { Overview } from './views/overview'
import { Contact } from './views/contact'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <div id='brand'>Divvy</div>
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

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  // padding: 8px;
`

const navStyle = css`
  padding: 8px;
  height: 80px;
  // background: #444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-row: 1;
  border-bottom: 1px solid grey;

  #brand {
    width: 100px;
    font-size: 2em;
    padding-left: 40px;
  }

  .spacer {
    width: 140px;
  }

  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  & > ul > li > a {
    font-size: 1.3em;
    position: relative;
    text-decoration: none;
    padding 0 3px;
    margin: 0 20px;
    height: 100%;
    cursor: pointer;
    color: green;
    transition: color 0.2s ease-in;
  }

  a:hover {
    color: blue;
  }

  a::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: blue;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  a:hover::before {
    transform: scaleX(1);
  }

  & > ul > li > a {
    // border: 1px solid white;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }

  .active {
    color: #green;
  }
`

const contentStyle = css`
  grid-row: 2;
  padding: 8px;
`
