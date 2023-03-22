import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NotificationMajor, SearchMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <div className="brand col-sm-4 col-md-6 d-flex justify-content-center align-items-center">
            <a className="navbar-brand" href="#">
              mohamed
            </a>
            <div className="d-block">
              <Icon source={SearchMajor} color="base" />
            </div>
          </div>
          <div className="d-flex col-sm-4 col-none justify-content-center">
            <form role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-sm-4 col-md-6 d-flex justify-content-center">
            <Icon source={NotificationMajor} color="base" />
            <img
              src={require("../images/profile pic.jpg")}
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
