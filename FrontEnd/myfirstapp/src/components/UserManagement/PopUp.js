import React, { Component } from "react";
import styles from "../styles/PopUp.module.css"

export default class PopUp extends Component {
    handleClick = () => {
    this.props.toggle();
    };
    render() {
        return (
            <div className={styles.modal_content}>
            <button className={styles.close} onClick={this.handleClick}>&times;</button>
            
            </div>
        );
    }
}