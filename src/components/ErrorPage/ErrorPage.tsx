import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
  return (
    <div className={styles.ErrPage_div}>
      <h1 style={{ textAlign: "center", color: "red" }}>404</h1>
      <h1 style={{ textAlign: "center" }}>PAGE NOT FOUND</h1>
      <p>
        We're fairly sure that page used to be here, but seems to have gone
        missing. We do apologise on its behalf.
      </p>
      <p>
        Let's take you back!
        <NavLink className={styles.NavLink_} to={"/"}>
          <i className="fa-solid fa-house-chimney fa-fade fa-xl"></i>
        </NavLink>
      </p>
      <br />
    </div>
  );
};
export default ErrorPage;
