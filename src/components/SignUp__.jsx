import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
//import { Link } from 'react-router-dom';
import { auth, signInWithGoogle, generateUserDocument } from "../config/firebase";
import '../css/main.css';
import '../css/util.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="limiter">
	   <div className="container-login100">
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form className="login100-form validate-form">
				  <span className="login100-form-title p-b-49">
					 Registro
				  </span>		
				  
				   <div className="wrap-input100 validate-input m-b-23" data-validate = "Nombre es requerido">
							<span className="label-input100">Nombre</span>
							<input className="input100" type="text" name="displayName" value = {displayName} placeholder="Ingrese su nombre"  id="displayName"
					onChange = {(event) => onChangeHandler(event)}/>
							<span className="focus-input100" data-symbol="&#xf206;"></span>
				   </div>					  
				  

				   <div className="wrap-input100 validate-input m-b-23" data-validate = "Email es requerido">
							<span className="label-input100">Email</span>
							<input className="input100" type="email" name="userEmail" value = {email} placeholder="Ingrese su email"  id="userEmail"
					onChange = {(event) => onChangeHandler(event)}/>
							<span className="focus-input100" data-symbol="&#xf206;"></span>
				  </div>		  


				  <div className="wrap-input100 validate-input" data-validate="Password es requerido">
						  <span className="label-input100">Password</span>
						  <input className="input100" type="password" name="userPassword" value = {password} placeholder="Ingrese una password"  id="userPassword"
					onChange = {(event) => onChangeHandler(event)}/>
						  <span className="focus-input100" data-symbol="&#xf190;"></span>
				  </div>  			

		          <div className="container-login100-form-btn">		
					 <div className="wrap-login100-form-btn">
						  <button
							className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
							onClick={event => {
							  createUserWithEmailAndPasswordHandler(event, email, password);
							}}
						  >
							Registrar
						  </button>
					 </div>
				  </div> 
				  
				</form>
		
				<p className="text-center my-3">o</p>
				
                <div className="container-login100-form-btn">
					  <div className="wrap-login100-form-btn">		
						<button
						  onClick={() => {
							try {
							  signInWithGoogle();
							} catch (error) {
							  console.error("Error signing in with Google", error);
							}
						  }}
						  className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
						>
						  Login con Google
						</button>
					  </div>
				</div>						
				
				<p className="text-center my-3">
				¿Ya tienes una cuenta?{" "}
				  <Link to="/" className="text-blue-500 hover:text-blue-600">
				   Loguearse aqui
				  </Link>{" "}
				</p>
		    </div>
        </div>
    </div>
  );
};

export default SignUp;
