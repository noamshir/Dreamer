import { connect } from 'react-redux'
import { useState } from 'react'
import { onSetFilterBy } from '../store/gig.action'
import SearchIcon from '@mui/icons-material/Search';


function _SearchBar({ placeholder }) {
    const [txt, setTxt] = useState('');

    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value);
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        onSetFilterBy(txt, 'txt');
        // setTxt('');
    }

    return (
        <form
            onSubmit={onSubmit}>
            <div className='search-icon'><SearchIcon /></div>
            <input
                className='search-bar'
                type="search"
                placeholder={placeholder}
                autoComplete='off'
                value={txt}
                name='txt'
                onChange={handleChange}
            />
            <button className='search-btn'>Search</button>
        </form>
    )
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    onSetFilterBy
}

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar)
