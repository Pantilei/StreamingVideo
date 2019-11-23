import React from "react";
import ReactDOM from "react-dom";
import history from "../history";
import "../styles.css";

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="back" onClick={() => history.push("/")}>
      <div
        onClick={e => e.stopPropagation()}
        className="modal-dialog"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.header}</h5>
          </div>
          <div className="modal-body">
            <p>{props.body}</p>
          </div>
          <div className="modal-footer">{props.action}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
