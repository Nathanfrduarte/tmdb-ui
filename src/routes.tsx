import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import DetailsScreen from './screens/DetailsScreen'
import MainScreen from './screens/MainScreen'

function Routes(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/busca/info/:id' component={DetailsScreen} />
                <Route path='/busca' component={MainScreen} />
                <Redirect to={'/busca'} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes