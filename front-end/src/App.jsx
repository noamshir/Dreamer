import React from 'react';
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'

export class App extends React.Component {

    render() {
        return (
            <div className="app">
                <main className="app-main">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}