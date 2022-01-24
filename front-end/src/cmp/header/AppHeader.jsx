import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { SearchBar } from '../SearchBar.jsx';
import { UserProfileImg } from '../profile/UserProfileImg';
import { Logo } from '../Logo.jsx';
import { logout } from '../../store/user.action'
import { setProfile, toggleJoinModal, toggleSignInModal } from '../../store/scss.action.js';
import { useState } from 'react';
import { ProfileMenu } from './ProfileMenu.jsx';

function _AppHeader({ isHome, isBecomeSeller, isScroll, isSearchBar, openSignUpModal, openSignInModal, user, logout, openMenu }) {
    const [isProfileMenu, setMenu] = useState(false);
    var headerTransparent = "";
    var color = "";
    var sticky = "not-sticky";
    var searchBar = "show-bar"
    if ((isHome || isBecomeSeller) && (!isScroll)) {
        headerTransparent = "header-transparent";
        color = "home-header-color"
        sticky = "sticky"
        searchBar = ""
    }
    if ((isHome || isBecomeSeller) && isScroll) {
        sticky = "sticky";
        searchBar = ""
        if (isSearchBar) searchBar = "show-bar"
    }

    function onLogout() {
        logout()
    }
    window.addEventListener('click', (ev) => {
        if (ev.target.className !== "clean-list profile-scroll" && ev.target.className !== "spanclass" && ev.target.className !== "user-img") {
            setMenu(false);
        }
    })
    const onToggleMenu = () => {
        var flag = !isProfileMenu;
        setMenu(flag);
    }
    return <section className={`main-header ${sticky}`}>
        <div id="Header">
            <header className={`header-package dimerr-header ${headerTransparent} logged-out-homepage-header`}>
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className={`btn-nav ${color}`} onClick={() => openMenu()}><MenuIcon className="menu-icon"></MenuIcon></button>
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
                                        <li className="display-from-size-medium"><button className={`clean-btn ${color}`} onClick={() => openSignInModal(true)}>Sign in</button></li>
                                        <li className="display-from-size-small"><button className={`clean-btn join-a ${color}`} onClick={() => openSignUpModal(true)}>Join</button></li>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <li className="display-from-size-small">
                                            <UserProfileImg user={user} isLink={false} toggleMenu={onToggleMenu} ></UserProfileImg>
                                            {isProfileMenu && <ProfileMenu onLogout={onLogout} user={user} closeMenu={onToggleMenu} />}
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
        isBecomeSeller: state.scssModule.isBecomeSeller,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logout,
    openSignInModal: toggleSignInModal,
    openSignUpModal: toggleJoinModal
};


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)