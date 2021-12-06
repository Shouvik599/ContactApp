import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
function ContactCard(props) {
  const { id, name, email } = props.contact;
  console.log(props);
  return (
    <div className="item" key={id}>
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <Link to={{ pathname: "/delete", state: { contact: props.contact } }}>
        <i
          style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
          className="trash alternate outline icon"
          // onClick={() => props.clickHandler(id)}
        ></i>
      </Link>
      <Link
        to={{ pathname: `/edit`, state: { contact: props.contact } }}
      >
        <i
          style={{ color: "blue", marginTop: "7px" }}
          className="edit alternate outline icon"
        ></i>
      </Link>
    </div>
  );
}

export default ContactCard;
