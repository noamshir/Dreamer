import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { AppHeader } from './cmp/AppHeader.jsx';
import { AppFooter } from './cmp/AppFooter.jsx';
import routes from './routes.js'
import { SignUp } from './cmp/sign/SignUp.jsx';
import { SignIn } from './cmp/sign/SignIn.jsx';

export class App extends React.Component {

    state = {
        isSignUpModalOpen: false,
        isSignInModalOpen: false
    }

    toggleSignUp = () => {
        var { isSignUpModalOpen } = this.state;
        isSignUpModalOpen = !isSignUpModalOpen
        this.setState({ isSignUpModalOpen });
    }
    toggleSignIn = () => {
        var { isSignInModalOpen } = this.state;
        isSignInModalOpen = !isSignInModalOpen
        this.setState({ isSignInModalOpen });
    }

    render() {
        return (
            <div className="main-wrapper">
                {this.state.isSignUpModalOpen && <div onClick={this.toggleSignUp} className="main-screen"></div>}
                {this.state.isSignInModalOpen && <div onClick={this.toggleSignIn} className="main-screen"></div>}
                <AppHeader openSignUpModal={this.toggleSignUp} openSignInModal={this.toggleSignIn} />
                <main className="main-content">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
                {this.state.isSignUpModalOpen && <SignUp closeModal={this.toggleSignUp} openSignIn={this.toggleSignIn} />}
                {this.state.isSignInModalOpen && <SignIn closeModal={this.toggleSignIn} openJoin={this.toggleSignUp} />}
            </div>
        )
    }
}