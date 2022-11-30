import { Link } from 'react-router-dom'
import NavButton from '../NavButton/NavButton'
import './DropdownCategory.css'

const DropdownCategory = ({ category, subcategories }) => {
    return (
        <div className='dropdown-subcategories'>
            { subcategories.map((sub) => {
                return (
                    <Link to={`/category/${category.toLowerCase()}/${sub.toLowerCase()}`} key={sub} >
                        <NavButton category={sub} subcategories={false}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default DropdownCategory