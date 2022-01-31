import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SearchBar } from '../SearchBar.jsx';
import { UserProfileImg } from '../profile/UserProfileImg';
import { Logo } from '../Logo.jsx';
import { logout, setMsg, addNotification, setUser } from '../../store/user.action'
import { toggleJoinModal, toggleSignInModal } from '../../store/scss.action.js';
import { ProfileMenu } from './ProfileMenu.jsx';
import { NotificationMenu } from './NotificationMenu.jsx';
import {
    socketService,
    SOCKET_EMIT_USER_CONNECTED,
    SOCKET_EMIT_JOIN,
    SOCKET_EMIT_LEAVE,
} from "../../services/socket.service";

function _AppHeader({ isHome, isBecomeSeller, isScroll, isSearchBar, openSignUpModal, openSignInModal, user, logout, openMenu, setMsg, addNotification, setUser }) {
    const [isProfileMenu, setMenu] = useState(false);
    const [isNotificationMenu, setNotificationMenu] = useState(false);
    var headerTransparent = "";
    var color = "";
    var sticky = "not-sticky";
    var searchBar = "show-bar";
    useEffect(() => {
        if (!user) return;
        socketService.emit(SOCKET_EMIT_JOIN, user._id)
        turnOnSockets();
        return () => {
            turnOffSockets();
        }
    }, [user])

    const turnOffSockets = () => {
        socketService.off(user._id)
        socketService.off('order status')
        socketService.off('order received')
        socketService.off('add-review-msg')
        socketService.off('find-user')
        socketService.emit(SOCKET_EMIT_LEAVE, user._id)
    }

    const turnOnSockets = () => {
        socketService.on(user._id, () => {
            socketService.emit(SOCKET_EMIT_USER_CONNECTED, user._id);
        });
        socketService.on('order status', (msg) => onShowMsg(msg))
        socketService.on('order received', (msg) => onShowMsg(msg))
        socketService.on('add-review-msg', ({ notification, ownerId }) => {
            if (ownerId !== user._id) return;
            setMsg(notification);
            var updatedUser = user;
            if (!updatedUser.notifications) updatedUser.notifications = []
            updatedUser.notifications = [...updatedUser.notifications, notification];
            setUser(updatedUser);
        })
    }

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
    const onShowMsg = (msg) => {
        if (msg.sender._id === user._id) return;
        setMsg(msg);
        addNotification(user, msg);
    }
    const onLogout = async () => {
        await logout(user);
        turnOffSockets();
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

    const toggleNotificationModal = () => {
        setNotificationMenu(!isNotificationMenu)
    }
    if (user) {
        socketService.on("find-user", (userid) => {
            if (user._id === userid) socketService.emit("user-connection", userid);
        })
        socketService.emit("set-user-socket", user._id);
    }
    return <section className={`main-header ${sticky}`}>
        <div id="Header">
            <header className={`header-package dimerr-header ${headerTransparent} logged-out-homepage-header`}>
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <div className="btn-nav-wrapper">
                            {user?.notifications?.length && <div className='notification-dot'></div>}
                            <button className={`btn-nav ${color}`} onClick={() => openMenu()}><MenuIcon className="menu-icon"></MenuIcon></button>
                        </div>
                        <NavLink to="/" className={`dimerr-logo ${color} clean-link`}> <Logo /> </NavLink>
                        <div className={`dimerr-header-search-animated ${searchBar}`}>
                            <SearchBar placeholder="Find Services" />
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
                                        <li className='messages display-from-size-medium'>
                                            <div className="icon" onClick={toggleNotificationModal}>
                                                {user?.notifications?.length && <div className='notification-dot'></div>}
                                                <NotificationsIcon />
                                            </div>
                                            {isNotificationMenu && <NotificationMenu user={user} setNotificationMenu={setNotificationMenu} />}
                                        </li>
                                        <li className="display-from-size-small profile-container">
                                            <UserProfileImg user={user} isLink={false} toggleMenu={onToggleMenu} dotClass='dot-bottom' ></UserProfileImg>
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
        {isNotificationMenu && <div className='notification-screen' onClick={() => {
            setNotificationMenu(false)
        }}> </div>}
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
    setMsg,
    addNotification,
    openSignInModal: toggleSignInModal,
    openSignUpModal: toggleJoinModal,
    setUser
};


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)