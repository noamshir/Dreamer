import React from 'react';
import { Switch, Route } from 'react-router-dom'
<<<<<<< HEAD
import { AppHeader } from './cmp/AppHeader.jsx';
=======
import { AppFooter } from './cmp/AppFooter.jsx';
>>>>>>> 588e95596a2077a58b1964616ab271bccff4fd76
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