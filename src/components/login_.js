import React, {Component} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import {isEmail} from '../helpers/email'
import {createUser, login} from '../helpers/user'
import firebase from 'firebase';
import {firebaseConection} from '../config/firebase';
import { BrowserRouter as Router, Switch, Route, Link, withRouter,Redirect} from 'react-router-dom';
import {history} from "../history";

export default class LoginForm extends Component{
	constructor(props){
		super(props);
		firebaseConection();  
		    		
		this.state = {
			message: null,
			isSignedIn:false, 
			uid: '',
			emailVerified: false,
			_redirect: false,			
			isLogin: true,
			user: {
				name: "",
				email: "",
				password: "",
				confirmPassword: ""
			},

			error: {
				name: null,
				email: null,
				password: null,
				confirmPassword: null,
			}
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onTextFieldChange = this.onTextFieldChange.bind(this);
		this.formValidation = this.formValidation.bind(this);
		this.redirectToHome = this.redirectToHome.bind(this);
		this.sendverification = this.sendverification.bind(this);
	}

	formValidation(fieldsToValidate = [], callback = () => {}){
		const {isLogin, user} = this.state;

		const allFields = {
			name: {
				message: "Your name is required.",
				doValidate: () => {
					const value = _.trim(_.get(user, 'name', ""));
				
					if(value.length > 0){
						return true;
					}
					return false;
				}
			},

			email: {
				message: "Email is not correct",
				doValidate: () => {
					const value = _.get(user, 'email', '');

					if(value.length >0 && isEmail(value)){
						return true;
					}
					return false;
				}
			},

			password: {
				message: "Password shoud has more than 3 characters.",
				doValidate: () => {
					const value = _.get(user, 'password', '');
					if(value && value.length > 3){
							return true;
					}
					return false;
				}
			},

			confirmPassword: {
				message: "Password does not match.",
				doValidate: () => {
					const passwordValue = _.get(user, 'password');
					const value = _.get(user, 'confirmPassword', '');

					if(passwordValue === value){
							return true;
					}
					return false;
				}
			}
		};

		let errors = this.state.error;
		_.each(fieldsToValidate, (field) => {
				const fieldValidate = _.get(allFields, field);

				if(fieldValidate){
					errors[field] = null;
					const isFieldValid = fieldValidate.doValidate();
					if(isFieldValid === false){
						errors[field] = _.get(fieldValidate, 'message');
					}
				}
		});

		this.setState({
			error: errors,
		}, () => {
		
			console.log("After processed validation the form errors", errors);
			let isValid = true;

			_.each(errors, (err) => {
				if(err){
					isValid = false;
				}
			});

			callback(isValid);
		})
	}

	sendverification() {
		var user = firebase.auth().currentUser;
		console.log('firebase.auth().currentUser.email _login:' + firebase.auth().currentUser.email);
		user.sendEmailVerification().then(function() {		  
		}).catch(function(error) {
		  alert('error:' + error);
		});        
	}

	onSubmit(event){
		const {isLogin,user} = this.state; 
		event.preventDefault();
		let fieldNeedToValidate = ['email', 'password'];
		const scope = this;

		if(!isLogin) {
			fieldNeedToValidate = ['name', 'email', 'password', 'confirmPassword'];
		}

		this.formValidation(fieldNeedToValidate,(isValid) => {
				console.log("The form is validated? ", isValid);
				if(isValid){
					if(isLogin) {
						firebase.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password).then((u)=>{  							
							this.setState({isSignedIn: true, uid: firebase.auth().currentUser != null? firebase.auth().currentUser.uid: null});  

							const emailVerified = firebase.auth().currentUser.emailVerified;
							this.setState({emailVerified: emailVerified});   							
							
							if(!emailVerified)
							{   this.setState({
									message: {
										type: 'warning',
										message: 'Email not verified!'
									}
								});																
							}
							else {  this.setState({
									message: {
										type: 'success',
										message: 'Login successful.'
									}
								});
								console.log('setState _redirect:true');
								//return <Redirect to={{pathname: '/', state:{email:'testjimp2@gmail.com', uid: 'iiioo', isSignedIn: this.state.isSignedIn}}}/> 								
								this.setState({ _redirect: true});
								//return <Redirect to="/Home" />								
							}
						}).catch((err) => {
							this.setState({
								message: {
									type: 'error',
									message: 'Error on login: ' + err
								}
							});
							console.log(err);
						})
					} else {
						firebase.auth().createUserWithEmailAndPassword(this.state.user.email, this.state.user.password).then((u)=>{
						}).then((u)=>{
					
						  const userId= firebase.auth().currentUser.uid;
						  let db = firebase.firestore();
					
						  db.collection('users').doc(userId)
							 .set({
								email: this.state.user.email,
								name: this.state.user.name              
							})
							.then(function () {
								console.log('Account created');
								scope.setState({
									message: {
										type: 'success',
										message: 'Account created !. Please check your email to continue the process.'
									}
								});									
								scope.sendverification();
							})
							.catch(function (error) {
								console.error('Error adding users document: ', error);
								scope.setState({
									message: {
										type: 'error',
										message: 'error: ' + error
									}
								});									
							});											 
						})
						.catch((error) => {
							console.log(error);
							alert(error);
							scope.setState({
								message: {
									type: 'error',
									message: 'error: ' + error
								}
							});								
						})						
					}			
				}
				//console.log("FOrm is submitted as: ", isLogin  ? "Login" : "Register", 'data:', user);
		});		
	}

	onTextFieldChange(e) {
		let {user} = this.state;
		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		user[fieldName] = fieldValue;
		this.setState({user: user});
	}

	redirectToHome = ()=>{
		if(this.state._redirect ==  true){
			console.log('calling redirect to Home|_redirect:' + this.state._redirect);
			// history.push({
			// 	pathname: '/home',
			// 	// search: '?query=abc',
			// 	state: { email: this.state.user.email, uid: this.state.uid, isSignedIn: this.state.isSignedIn}
			// })		
			//history.push('/home');
			//document.querySelector('#btnClose').click();
			// var elem = document.querySelector('#btnClose');
			// var canLink = elem ? "ok" : "";
			// if(canLink !== "") {  
			// 	document.querySelector('#btnClose').click();
		 	// }
			//  ? <Router> <Redirect to={{pathname: '/home', state:{email:this.state.user.email, uid: this.state.uid, isSignedIn: this.state.isSignedIn}}}/> </Router> 	 							
			return(
				this.state._redirect
				?  	<Redirect to={{pathname: '/home', state:{email:this.state.user.email, uid: this.state.uid, isSignedIn: this.state.isSignedIn}}}/> 							 	 							
				: <div></div>
			)			
		}
	}
	
	signIn(props) {
		return (
		<div className="app-login-form">
			{this.redirectToHome()}
			<div className="app-login-form-inner">
					<button onClick={() => {
						if(this.props.onClose){
								this.props.onClose(true);
						}
					}} className="app-dismiss-button" id='btnClose'>Close</button>
					<h2 className="form-title">{props.title}</h2>
					<form onSubmit={this.onSubmit}>
						{
							props.message ? <div className="app-message">
								<p className={props.message.type}>{props.message.message}</p>
							</div>: null
						}
						<div className={classNames('app-form-item', {'error': _.get(props.error, 'email')})}>
							<label htmlFor="email-id">Email</label>
							<input value={props.user.email} onChange={this.onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
						</div>
						<div className={classNames('app-form-item', {'error': _.get(props.error, 'password')})}>
							<label htmlFor="password-id">Password</label>
							<input value={props.user.password} onChange={this.onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
						</div>
						
							<div className="app-form-actions">
								<button className="app-button primary">Sign In</button>
								<div className="app-form-description">
									   <div>Don't have an account ? <button type="button" onClick={() => {
											this.setState({isLogin: false});
										}} className="app-button app-button-link">Sign Up</button></div>
								</div>
							</div> 
						
					</form>
			</div>
		</div>
		);
	}

	signUp(props) {
		return(
			<div className="app-login-form">
			{this.redirectToHome()}
			<div className="app-login-form-inner">
					<button onClick={() => {
						if(this.props.onClose){
								this.props.onClose(true);
						}
					}} className="app-dismiss-button" id='btnClose'>Close</button>
					<h2 className="form-title">{props.title}</h2>
					<form onSubmit={this.onSubmit}>
						{
							props.message ? <div className="app-message">
								<p className={props.message.type}>{props.message.message}</p>
							</div>: null
						}
						
							<div>										
								<div className={classNames('app-form-item', {'error': _.get(props.error, 'name')})}>
									<label htmlFor="name-id">Name</label>
									<input value={props.user.name} onChange={this.onTextFieldChange} placeholder="Your name" id="name-id" type="text" name="name" />
								</div>
							</div>
						
						<div className={classNames('app-form-item', {'error': _.get(props.error, 'email')})}>
							<label htmlFor="email-id">Email</label>
							<input value={props.user.email} onChange={this.onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
						</div>
						<div className={classNames('app-form-item', {'error': _.get(props.error, 'password')})}>
							<label htmlFor="password-id">Password</label>
							<input value={props.user.password} onChange={this.onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
						</div>
						
							<div>
								<div className={classNames('app-form-item', {'error': _.get(props.error, 'confirmPassword')})}>
									 <label htmlFor="confirm-password-id">Confirm Password</label>
									 <input value={props.user.confirmPassword} onChange={this.onTextFieldChange} placeholder="Confirm password" id="confirm-password-id" type="password" name="confirmPassword" />
								</div>
							</div>					

						{
							<div className="app-form-actions">
								<button className="app-button primary">Sign Up</button>
								<div className="app-form-description">
									<div>Don't have an account ? <button type="button" onClick={() => {
										 this.setState({isLogin: true});
									}} className="app-button app-button-link">Sign In</button></div>
								</div>
							</div>
						}
					</form>
			</div>
		</div>			
		);		
	}

	render(){

		const {isLogin, user, error, message, isSignedIn, _redirect, } = this.state;
		const title = isLogin ? 'Sign In' : 'Sign Up'
		// console.log('isSignedIn /Login:' + isSignedIn);
		// console.log('redirect: '+ _redirect);
	    if(_redirect)
		{
			return this.redirectToHome();
		}			

		    return (
				<div className="app-login-form">
					{/* {this.redirectToHome()} */}
					<div className="app-login-form-inner">
							<button onClick={() => {
								if(this.props.onClose){
										this.props.onClose(true);
								}
							}} className="app-dismiss-button" id='btnClose'>Close</button>
							<h2 className="form-title">{title}</h2>
							<form onSubmit={this.onSubmit}>
								{
									message ? <div className="app-message">
										<p className={message.type}>{message.message}</p>
									</div>: null
								}
								{
									!isLogin ? <div>										
										<div className={classNames('app-form-item', {'error': _.get(error, 'name')})}>
											<label htmlFor="name-id">Name</label>
											<input value={user.name} onChange={this.onTextFieldChange} placeholder="Your name" id="name-id" type="text" name="name" />
										</div>
									</div>: null
								}
								<div className={classNames('app-form-item', {'error': _.get(error, 'email')})}>
									<label htmlFor="email-id">Email</label>
									<input value={user.email} onChange={this.onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
								</div>
								<div className={classNames('app-form-item', {'error': _.get(error, 'password')})}>
									<label htmlFor="password-id">Password</label>
									<input value={user.password} onChange={this.onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
								</div>
								{
									!isLogin ? <div>
											<div className={classNames('app-form-item', {'error': _.get(error, 'confirmPassword')})}>
												<label htmlFor="confirm-password-id">Confirm Password</label>
												<input value={user.confirmPassword} onChange={this.onTextFieldChange} placeholder="Confirm password" id="confirm-password-id" type="password" name="confirmPassword" />
										</div>
									</div>: null
								}

								{
									isLogin ? <div className="app-form-actions">
											<button className="app-button primary">Sign In</button>
											<div className="app-form-description">
												<div>Don't have an account ? <button type="button" onClick={() => {
														this.setState({isLogin: false});
												}} className="app-button app-button-link">Sign Up</button></div>
											</div>
										</div> 
									: 
									<div className="app-form-actions">
										<button className="app-button primary">Sign Up</button>
										<div className="app-form-description">
											<div>Don't have an account ? <button type="button" onClick={() => {
													this.setState({isLogin: true});
											}} className="app-button app-button-link">Sign In</button></div>
										</div>
									</div>
								}
							</form>
					</div>
				</div>			
			);
		// }
		// else {		
		// 	document.querySelector('#btnClose').click(); 	
		// 	 return this.redirectToHome();
		// }
	}
}