import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDoun);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDoun);
  }

  hendleKeyDoun = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClik = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClik}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
