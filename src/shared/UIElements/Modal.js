import "./Modal.css"
import  ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import { Fragment } from "react";

const ModalOverlay = props => {
    const {isError} = props;

    const content = (
        <div className={`modal_container ${props.className}`}>
            <header className={`modal__header ${isError && 'error'}`}>
                <h2>{props.header}</h2>
            </header>

            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>

                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )

    return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

const Modal = props => {
    return <Fragment>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={300}
        >
            <ModalOverlay {...props} />
        </CSSTransition>
    </Fragment>
}

export default Modal;