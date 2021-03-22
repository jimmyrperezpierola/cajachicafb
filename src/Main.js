import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter,Redirect} from 'react-router-dom';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NoMatch from './components/NoMatch';
import LoginForm from './components/login_';
import {firebaseConection} from './config/firebase';
import * as ROUTES from './constants/routes';
import {history} from "./history";
//import 'react-toastify/dist/ReactToastify.css';
//import {toast, ToastContainer} from 'react-toastify';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoginForm: true
        }    
        this.changeStateLoginForm = this.changeStateLoginForm.bind(this);   
        console.log('Constructor CajaChica');                    
        firebaseConection();     
        console.log('Init CajaChica'); 
    }

    // showToast = (type, message) => {
    //     switch (type) {
    //         case 0:
    //             toast.warning(message)
    //             break
    //         case 1:
    //             toast.success(message)
    //             break
    //         default:
    //             break
    //     }
    // }

    changeStateLoginForm(value) {
        this.setState({showLoginForm: value });
    }

    render() { 
        const {showLoginForm} = this.state;        
        return ( 
            <div className="layout" id="layout">
                {showLoginForm ? <LoginForm onClose={() => {
                      this.setState({
                            showLoginForm: false,
                        });
                }} /> : null}

                {/* <Router history={history}> */}
                <Router>
                    <div className="landingItem" id="landingItem">
                        <ul className="ulMenu">
                            <li><i className="fas fa-home"></i><Link underline='none' to={ROUTES.LANDING} className="nav-link">Home</Link></li>
                            {/* <li><i className="fas fa-sign-in-alt"></i><Link underline='none' to={ROUTES.SIGNIN} className="nav-link">Sign In</Link></li>
                            <li><i className="fas fa-user-plus"></i><Link underline='none' to={ROUTES.SIGNUP} className="_nav-link">Sign Up</Link></li> */}
                        </ul>
                    </div>                                                  
                    <Switch>
                        {/* <Route exact path="/login" component={() => !this.props.auth ? <LoginForm /> : <Redirect to='/' />} />                        
                        <Route exact path="/" component={() => this.props.auth ? <Home/> : <Redirect to='/login' />}/>  */}
                        <Route path="/" exact component={ LoginForm } />
                        <Route path="/home" component={ Home } />

                        {/* <Route exact path="/encyclopedia" component={() => this.props.auth ? <Encyclopedia /> : <Redirect to='/login' />} /> */}

                        {/* <Route path="/" exact component={SignIn}/> */}
                        <Route path="/signUp" exact component={SignUp}/>
                        {/* <Route path="/home" component={Home}/> */}
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>                    
                {/* </Router> */}
            </div>                        
         );
    }
}
 
export default Main;