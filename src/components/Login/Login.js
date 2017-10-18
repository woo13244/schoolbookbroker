import React, {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom'



class Login extends Component {
    render() {
      return (
    <div className="auth">
        <div className='circleContainer'>
          <div className="redCircle"></div>
          <div className="lightBlueCircle"></div>
          <div className="darkBlueCircle"></div>
        <div className="buttonContainer"></div>
        </div>
        <div className="text-box">
            <h1>SCHOOL</h1>
            <h1>BOOK</h1>
            <h1>BROKER</h1>
        </div>
        <div className="loginButtonContainer">
            <div className="aboutButton">
              <Link to="/private/faq">
              <div className='aboutCircle'></div>
              </Link>
              <div className="aboutUs">About Us</div>
            </div>
            <div className="contactButton">
              <Link to="/private/contact">
              <div className='contactCircle'></div>
              </Link>
              <div className="contact">Contacts</div>
            </div>
              <div className="loginButton">
              <a href={process.env.REACT_APP_LOGIN}>
                <button className='loginCircle'></button>
              </a>
              <div className="login">Login/Register</div>
              </div>     
        </div>
    </div>

      );
    }
  }
  export default Login;
  