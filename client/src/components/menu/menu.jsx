import React from 'react'
import './style.scss'

const Menu = ({changeColorMode}) => {
  return (
    <div className="menu">
      <div className="menuBar">
      <button onClick={changeColorMode}>change bg</button>
      </div>
    </div>
  )
}

export default Menu