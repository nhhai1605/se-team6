import React, { Component } from "react";
import styles from "../styles/PopUp.module.css"

export default class PopUpDetail extends Component {
    handleClick = () => {
    this.props.toggle();
    };
    render() {
        return (
            <div className={styles.modal_content_detail}>
            <button className={styles.close} onClick={this.handleClick}>&times;</button>
            <p>For Detail</p>
            </div>
        );
    }
}