import React from "react";
import {Link} from 'react-router-dom';
import user from "../images/user.png";
function ContactDetail(props) {
 const { name, email } = props.location.state.contact;
  console.log(props.location.state.contact);
  return (
    <div className="main">
        <div className="ui card centered">
            <div className="image">
                <img src={user} alt="user"/>
            </div>
            <div className="content">  
        <div className="header">{name}</div>
        <div>{email}</div>
      </div>
      <div id="centerTry">
          <Link to="/">
          <button className="ui button blue center" style={{marginBottom:"10px"}}>Back to Contact List</button>
          </Link>
      </div>
        </div>
    </div>
  );
}

export default ContactDetail;
