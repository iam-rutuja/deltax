import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';
import Header from '../components/Header';

const Layout = ({children}) => {

    return(
        <Fragment>
            <Header/>
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);