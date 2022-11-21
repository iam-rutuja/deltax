import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import ActivateAccount from './auth/Activate-Account';
import PrivateRoute from './auth/PrivateRoute';
import Private from './core/Private';
import AdminRoute from './auth/AdminRoute';
import Admin from './core/Admin';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Lead from './core/Lead';
import CreateLead from './core/CreateLead';
import CreateStatus from './core/CreateStatus';
import UpdateLead from './core/UpdateLead';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/auth/activate/:token' component={ActivateAccount} />
                <PrivateRoute exact path='/private' component={Private} />
                <AdminRoute exact path='/admin' component={Admin} /> 
                <Route exact path="/auth/forgot/password" component={ForgotPassword} /> 
                <Route exact path="/auth/reset/password/:token" component={ResetPassword} /> 
                <Route exact path='/leads' component={Lead} />
                <Route exact path='/create-lead' component={CreateLead} />
                <Route exact path='/create-status' component={CreateStatus} />
                <Route exact path='/lead/:id' component={UpdateLead} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;