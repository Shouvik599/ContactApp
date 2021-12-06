import React, { useRef } from "react";
import "../App.css";
import "./styles.css";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import Empty from "./Empty";
function ContactList(props) {
  const inputRef = useRef("");
  console.log(props);
  const deleteContactHandler = (id) => props.removeContactHandler(id);

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputRef.current.value);
  };
  return (
    <div className="main">
      <h2>
        Contact Listing
        <Link to="/add">
          <button className="ui button blue" id="buttonAlign">
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contact"
            ref={inputRef}
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list" id="listPadding">
        {renderContactList.length > 1 ? renderContactList : <Empty />}
      </div>
    </div>
  );
}

export default ContactList;
