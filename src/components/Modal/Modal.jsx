import PropTypes from 'prop-types';
import React, { Component } from "react";
import { createPortal } from 'react-dom';
import s from "./Modal.module.css";

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscape);
    }

    handleEscape = e => {
        if (e.code === 'Escape') {
            this.props.toggleModal();
        }
    };

    handleClose = e => {
        if (e.currentTarget === e.target) {
            this.props.toggleModal();
        }
    };

    render() {
        return createPortal(
            <div className={s.Overlay} onClick={this.handleClose}>
                <div className={s.Modal}>{this.props.children}</div>
            </div>,
            document.getElementById('modalRoot'),
        );
    }
}

Modal.propTypes = {
    handleClose: PropTypes.func,
}