import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import EquipmentList from './components/EquipmentList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Application from './pages/Application';
import Inbox from './pages/Inbox';
import Updates from './pages/Updates';
import Category from './pages/Category';
import Report from './pages/Report';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import './styles/login.css';
import './styles/signup.css';
import './styles/home.css';
import './styles/application.css';
import './styles/inbox.css';
import './styles/updates.css';
import './styles/category.css';
import './styles/report.css';
import './styles/privacy.css';
import './styles/terms.css';

const App = () => {
    const checkLogin = () => {
        const user = localStorage.getItem('user');
        return user ? true : false;
    };

    return (
        <Router>
            <div>
                <Header />
                <Navigation />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/home" render={() => checkLogin() ? <Home /> : <Redirect to="/login" />} />
                    <Route path="/inbox" render={() => checkLogin() ? <Inbox /> : <Redirect to="/login" />} />
                    <Route path="/updates" render={() => checkLogin() ? <Updates /> : <Redirect to="/login" />} />
                    <Route path="/category" render={() => checkLogin() ? <Category /> : <Redirect to="/login" />} />
                    <Route path="/report" render={() => checkLogin() ? <Report /> : <Redirect to="/login" />} />
                    <Route path="/privacy" component={PrivacyPolicy} />
                    <Route path="/terms" component={Terms} />
                    <Redirect from="/" to="/login" />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
