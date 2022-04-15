import React from "react";
import cx from "clsx";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

import classes from "./Modal.module.scss";

ReactModal.setAppElement("#__next");

function Modal({ className, ...props }) {
  return (
    <ReactModal
      portalClassName={classes.root}
      closeTimeoutMS={400}
      overlayClassName={classes.overlay}
      className={cx(classes.surface, className)}
      {...props}
    />
  );
}

export default Modal;
