import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ActivitiesPage from './containers/ActivitiesPage.jsx';
import NewActivityPage from './containers/NewActivityPage.jsx';
import Auth from './modules/Auth.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },
    {
      path: '/activities',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ActivitiesPage);
        } else {
          callback(null, HomePage);
        }
      }
    },
    {
      path: '/add',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, NewActivityPage);
        } else {
          callback(null, HomePage);
        }
      }
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signup',
      component: SignUpPage
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }
    }
  ]
};

export default routes;
