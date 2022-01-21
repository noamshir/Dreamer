import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from './SearchBar.jsx';
import { Logo } from './Logo.jsx';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
function _AppHeader({ isHome, isExplore, openSignUpModal, openSignInModal }) {
    var headerTransparent = "";
    var color = "";
    var sticky = "not-sticky";
    var searchBar = "show-bar"
    if (isHome) {
        headerTransparent = "header-transparent";
        color = "home-header-color"
        sticky = "sticky"
        searchBar = ""
    }


    return <section className={`main-header ${sticky}`}>
        <div id="Header">
            <header className={`header-package dimerr-header ${headerTransparent} logged-out-homepage-header`}>
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className={`btn-nav ${color}`}><MenuIcon></MenuIcon></button>
                        <NavLink to="/" className={`dimerr-logo ${color} clean-link`}> <Logo /> </NavLink>
                        <div className={`dimerr-header-search-animated ${searchBar}`}>
                            <SearchBar placeholder="Try Logo..." />
                        </div>
                        <nav className={`dimerr-nav ${color} dimerr-nav-right flex`}>
                            <div className="nav-helper"></div>
                            <ul className="flex">
                                <li className="display-from-size-large">  <NavLink className={`clean-link ${color}`} to="/explore">Explore</NavLink></li>
                                <li className="display-from-size-large"><NavLink className={`clean-link ${color}`} to="/addSeller">Become Seller</NavLink></li>
                                <li className="display-from-size-medium"><button className={`clean-btn ${color}`} onClick={() => openSignInModal()}>Sign in</button></li>
                                <li className="display-from-size-small"><button className={`clean-btn join-a ${color}`} onClick={() => openSignUpModal()}>Join</button></li>
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