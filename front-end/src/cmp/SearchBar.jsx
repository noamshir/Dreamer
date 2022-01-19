import { connect } from 'react-redux'
import { useState } from 'react'
import { onSetFilterBy } from '../store/gig.action'



function _SearchBar(props) {
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
        <form onSubmit={onSubmit}>
            <input
                type="search"
                placeholder={`Try "designing business logo"`}
                autoComplete='off'
                value={txt}
                name='txt'
                onChange={handleChange}
            />
            <button>Search</button>
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
