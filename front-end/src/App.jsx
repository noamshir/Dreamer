import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { AppHeader } from './cmp/AppHeader.jsx';
import { AppFooter } from './cmp/AppFooter.jsx';
import routes from './routes.js'

export class App extends React.Component {

    render() {
        return (
            <div className="main-wrapper">
                <AppHeader />
                <main className="main-content">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
            </div>
        )
    }
}