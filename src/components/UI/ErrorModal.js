import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import styles from "./ErrorModal.module.css";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.closeModal} />;
};

const OverlayModal = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.closeModal} className="btn btn-md btn-primary">
          Okay
        </Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <BackDrop closeModal={props.closeModal} />,
        document.getElementById("backDrop-root")
      )}
      {ReactDOM.createPortal(
        <OverlayModal
          title={props.title}
          message={props.message}
          closeModal={props.closeModal}
        />,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

export default ErrorModal;
