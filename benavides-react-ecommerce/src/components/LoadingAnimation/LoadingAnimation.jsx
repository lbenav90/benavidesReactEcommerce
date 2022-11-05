import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './LoadingAnimation.css'

library.add(faSpinner)

const LoadingAnimation = () => {
    return (
        <div className='loading-animation'>
            <div className="loading-container">
                <FontAwesomeIcon icon="fa-solid fa-spinner" />
                <span className='loading-text'>Cargando</span>
            </div>
        </div>
    )
}

export default LoadingAnimation