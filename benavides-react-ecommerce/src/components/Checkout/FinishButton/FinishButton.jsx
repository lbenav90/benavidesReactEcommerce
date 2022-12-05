import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './FinishButton.css'

library.add(faSpinner)

const FinishButton = ({ type }) => {
    return (
        <button className='finish-button'>{ type? <FontAwesomeIcon icon="fa-solid fa-spinner" /> : "Hacer pedido"}</button>
    )
}

export default FinishButton