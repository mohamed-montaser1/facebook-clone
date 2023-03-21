import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { NotificationMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";

let colors = {
  blue: "hsl(214, 89%, 52%)",
  black: "#000",
};

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand col-sm-4" href="#">
            mohamed montaser
          </a>
          <div className="d-flex col-sm-4 justify-content-center">
            <form role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-sm-4 d-flex justify-content-end">
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
