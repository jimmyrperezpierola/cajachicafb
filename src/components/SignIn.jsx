import React, {useState} from "react";
import { Link } from "@reach/router";
    //import { Link } from 'react-router-dom';
//import { signInWithGoogle } from "../config/firebase";
//import { auth } from "../config/firebase";
import '../css/main.css';
import '../css/util.css';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        // auth.signInWithEmailAndPassword(email, password).catch(error => {
        //     setError("Error en login con los datos proporcionados.");
        //     console.error("Error signing in with password and email", error);
        // });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
		
          if(name === 'userEmail') {
              setEmail(value);	
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };   
      
      var input = document.getElementsByClassName('.validate-input .input100');      
      const ValidateForm = () => {
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;        
      }
      
      function validate (input) {
        if(document.getElementsByName(input).attr('type') == 'email' || document.getElementsByName(input).attr('name') == 'email') {
            if(document.getElementsByName(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if(document.getElementsByName(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = document.getElementsByName(input).parent();

        document.getElementsByName(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = document.getElementsByName(input).parent();

        document.getElementsByName(thisAlert).removeClass('alert-validate');
    }      

  return (
    <div className="limiter">
      <div className="container-login100">
         <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
             <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-29">
                      Login
                  </span>

                <div className="signup-error-info">
  					        <label htmlFor="" className="signup-error-label">{error}</label>
				        </div>

                 <div className="wrap-input100 validate-input m-b-23" data-validate = "Email es requerido">
                    <span className="label-input100">Email</span>
                    <input className="input100" type="text" name="userEmail" value = {email} placeholder="Ingrese su email"  id="userEmail"
            onChange = {(event) => onChangeHandler(event)}/>
                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password es requerido">
                  <span className="label-input100">Password</span>
                  <input className="input100" type="password" name="userPassword" value = {password} placeholder="Ingrese su password"  id="userPassword"
            onChange = {(event) => onChangeHandler(event)}/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
                </div>               

                <div className="text-right p-t-8 p-b-31">
                  <a href="#">
                    ¿Has olvidado tu contraseña? 
                  </a>
                </div>

                <div className="container-login100-form-btn">
					  <div className="wrap-login100-form-btn">
						<div className="login100-form-bgbtn"></div>
						<button className="login100-form-btn" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
						  Login
						</button>
					  </div>
				</div>

                <div className="txt1 text-center p-t-54 p-b-20">
                  <span>
                    O Registrase Usando
                  </span>
                </div>

                <div className="flex-c-m">
                  {/* <a href="#" className="login100-social-item bg3"  onClick={() => {signInWithGoogle();}}>
                    <i className="fa fa-google"></i>
                  </a> */}
			    </div> 

                <div className="flex-col-c p-t-55">
                  <span className="txt1 p-b-17">
                    O Registrase Usando
                  </span>

                  {/* <a href="#" className="txt2">
                    Registrar
                  </a> */}
                    <div className="txt2">
                      <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                        Registrar
                      </Link>
                    </div>                  
                </div>                               
             </form>
         </div>
      </div>
  	</div>
  );
};

export default SignIn;
