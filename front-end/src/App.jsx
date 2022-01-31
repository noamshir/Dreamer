import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { AppHeader } from './cmp/header/AppHeader.jsx';
import { AppSubHeader } from "./cmp/header/AppSubHeader.jsx";
import { AppFooter } from './cmp/AppFooter.jsx';
import routes from './routes.js'
import { SignUp } from './cmp/sign/SignUp.jsx';
import { SignIn } from './cmp/sign/SignIn.jsx';
import { connect } from 'react-redux';
import { setScroll, setSearchDisplay, toggleJoinModal, toggleSignInModal } from './store/scss.action.js';
import { Menu } from './cmp/Menu.jsx';
import { UserMsg } from './cmp/UserMsg.jsx';
import { NotificationMenu } from "./cmp/header/NotificationMenu";
class _App extends React.Component {

    state = {
        isMenuOpen: false,
        isNotificationMenu: false,
        notificationUser: null,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }


    handleScroll = (ev) => {
        if (document.documentElement.scrollTop > 30) {
            this.props.setScroll(true);
            if (document.documentElement.scrollTop >= 255)
                this.props.setSearchDisplay(true);
            else this.props.setSearchDisplay(false);
        }
        else {
            this.props.setScroll(false);
        }
    }
    toggleModals = () => {
        toggleJoinModal();
        toggleSignInModal();
    }
    toggleMenu = () => {
        var { isMenuOpen } = this.state;
        isMenuOpen = !isMenuOpen;
        this.setState({ isMenuOpen });
    }

    setNotificationMenu = () => {
        this.setState(prevState => {
            return { ...prevState, isNotificationMenu: !prevState.isNotificationMenu }
        })
    }

    render() {
        const { user } = this.props
        const { isMenuOpen } = this.state;
        return (
            <div className="main-wrapper">
                {this.props.isJoinModal && <div onClick={() => this.props.toggleJoinModal()} className="main-screen"></div>}
                {this.props.isModalSign && <div onClick={() => this.props.toggleSignInModal()} className="main-screen"></div>}
                {isMenuOpen && <div onClick={this.toggleMenu} className="main-screen"></div>}
                <AppHeader openMenu={this.toggleMenu} />
                {!this.props.isBecomeSeller && <AppSubHeader />}
                <Menu closeMenu={this.toggleMenu} menuOpen={isMenuOpen} setNotificationMenu={this.setNotificationMenu} />
                <main className="main-content">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
                <UserMsg />
                {this.props.isJoinModal && <SignUp />}
                {this.props.isModalSign && <SignIn />}
                {this.state.isNotificationMenu && <div className="notification-full-page"><NotificationMenu user={user} setNotificationMenu={this.setNotificationMenu} /></div>}
            </div>
        )
    }
}

function mapStateToProps({ userModule, scssModule }) {
    return {
        user: userModule.user,
        isBecomeSeller: scssModule.isBecomeSeller,
        isJoinModal: scssModule.isJoinModal,
        isModalSign: scssModule.isModalSign
    }
}

const mapDispatchToProps = {
    setScroll,
    setSearchDisplay,
    toggleJoinModal,
    toggleSignInModal
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App);