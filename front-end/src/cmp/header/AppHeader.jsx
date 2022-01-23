import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { SearchBar } from '../SearchBar.jsx';
import { Logo } from '../Logo.jsx';
import { logout } from '../../store/user.action'


function _AppHeader({ isHome, isScroll, isSearchBar, openSignUpModal, openSignInModal, user, logout }) {
    var headerTransparent = "";
    var color = "";
    var sticky = "not-sticky";
    var searchBar = "show-bar"
    if (isHome && (!isScroll)) {
        headerTransparent = "header-transparent";
        color = "home-header-color"
        sticky = "sticky"
        searchBar = ""
    }
    if (isHome && isScroll) {
        sticky = "sticky";
        searchBar = ""
        if (isSearchBar) searchBar = "show-bar"
    }

    function onLogout() {
        logout()
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
                                {!user?.sellerInfo && <li className="display-from-size-large"><NavLink className={`clean-link ${color}`} to="/becomeSeller">Become a Seller</NavLink></li>}
                                {!user ?
                                    <React.Fragment>
                                        <li className="display-from-size-medium"><button className={`clean-btn ${color}`} onClick={() => openSignInModal()}>Sign in</button></li>
                                        <li className="display-from-size-small"><button className={`clean-btn join-a ${color}`} onClick={() => openSignUpModal()}>Join</button></li>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <li className="display-from-size-medium"><button className={`clean-btn ${color}`} onClick={onLogout}>Logout</button></li>
                                        <li className="display-from-size-small">
                                            <Link className="clean-link" to={`/profile/${user._id}`}>
                                                {user.imgUrl ?
                                                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                                                    : <div style={{ backgroundColor: '#1dbf73' }} className="user-img">
                                                        <span>{user.fullname.charAt(0)}</span>
                                                    </div>}
                                            </Link>

                                        </li>
                                    </React.Fragment>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}

function mapStateToProps(state) {
    return {
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        isScroll: state.scssModule.isScroll,
        isSearchBar: state.scssModule.isSearchBar,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logout
};


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)