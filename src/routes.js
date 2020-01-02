import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './account/Login';
import Signup from './account/Signup';
import ForgotPassword from './account/ForgotPassword'
import DashboardComponent from './components/dashboard';
import ResetPasswordConfirm from './account/ResetPasswordConfirm';
import ForgotPasswordConfirmed from './account/ForgotPasswordConfirmed'




const BaseRouter = () => {
    return (
        <div> 
            <Route exact path='/login/'  component={Login}/> 
            <Route exact path='/signup/'  component={Signup}/> 
            <Route exact path='/forgot-password/'  component={ForgotPassword}/> 
            <Route exact path='/reset-password/:uid/:token/'  component={ResetPasswordConfirm}/> 
            <Route exact path='/password-reset/done/' component={ForgotPasswordConfirmed} />
            <Route path='/(dashboard|/)/' component={DashboardComponent} />

            <Switch>
            {["/", "/dashboard"].map(path => (
                <Route
                key={path}
                exact
                path={path}
                render={() => <DashboardComponent/>}
                />
            ))}
            
            </Switch>


        </div>
    )
}

export default BaseRouter;
