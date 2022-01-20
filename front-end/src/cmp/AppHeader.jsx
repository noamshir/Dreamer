import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from './SearchBar.jsx';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
function _AppHeader({ isHome, isExplore }) {
    var headerTransparent = "";
    var color = "";
    if (isHome) {
        headerTransparent = "header-transparent";
        color = "home-header-color"
    }
    return <section className="main-header sticky">
        <div id="Header">
            <header className={`header-package dreamer-header ${headerTransparent} logged-out-homepage-header`}>
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className={`btn-nav ${color}`}><MenuIcon></MenuIcon></button>
                        <NavLink to="/" className={`dreamer-logo ${color} clean-link`}>Dreamer</NavLink>
                        <div className="dreamer-header-search-animated">
                            <SearchBar />
                        </div>
                        <nav className={`dreamer-nav ${color} dreamer-nav-right flex`}>
                            <div className="nav-helper"></div>
                            <ul className="flex">
                                <li className="display-from-size-large">  <NavLink className={`clean-link ${color}`} to="/explore">Explore</NavLink></li>
                                <li className="display-from-size-large"><NavLink  className={`clean-link ${color}`} to="/addSeller">Become Seller</NavLink></li>
                                <li className="display-from-size-medium"><a href=""  className={`clean-link ${color}`}>Sign in</a></li>
                                <li className="display-from-size-small"><a href="" className={`clean-link join-a ${color}`}>Join</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}

function mapStateToProps({ scssModule }) {
    return {
        isHome: scssModule.isHome,
        isExplore: scssModule.isExplore
    }
}


export const AppHeader = connect(mapStateToProps)(_AppHeader)