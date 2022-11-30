import React from 'react'
import './NavButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

library.add(faCaretDown);

const NavButton = ({ category, subcategories }) => {
  return (
    <div className='nav-button'>
        { category } 
        { subcategories && <FontAwesomeIcon icon="fa-solid fa-caret-down" /> }
    </div>
  )
}

export default NavButton