import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
function DeleteWindow(props) {
  console.log(props);
  const { id } = props.location.state.contact;

  const deleteHandler = () => {
    props.removeContactHandler(id);
    props.history.push("/");
  };
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="content">
          <div className="header">Are you sure you want to delete?</div>
          <div style={{ paddingTop: "20px" }}>
            <button
              id="yesLeft"
              className="ui button red"
              onClick={() => deleteHandler()}
            >
              Yes
            </button>
            <Link to="/">
              <button id="cancelRight" className="ui button blue">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteWindow;
