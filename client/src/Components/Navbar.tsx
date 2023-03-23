import React, { useRef, useState } from "react";
import { NotificationMajor, SearchMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";

export default function Navbar(): JSX.Element {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const toggleSearchBar = (currentState: boolean) => {
    console.log(currentState);
    setShowSearchBar(!currentState);
    console.log(showSearchBar);
    let reverse = !currentState;
    if (reverse) {
      searchRef.current.classList.add("bottom");
      setTimeout(() => {
        searchRef.current.classList.add("z-100");
      }, 400);
    }
    if (!reverse) {
      searchRef.current.classList.remove("z-100");
      setTimeout(() => {
        searchRef.current.classList.add("top");
        searchRef.current.classList.remove("bottom");
      }, 180);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <div className="brand col-sm-4 d-flex justify-content-center align-items-center">
            <a className="navbar-brand" href="#">
              mohamed
            </a>
            <div
              className="d-block"
              onClick={() => toggleSearchBar(showSearchBar)}
            >
              <Icon source={SearchMajor} color="base" />
            </div>
          </div>
          <div className="col-sm-4 d-flex justify-content-center">
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
      <div className="container">
        <div className="row">
          <div
            className={`d-flex top justify-content-center search-bar col-sm-12`}
            ref={searchRef}
          >
            <div>
              <form role="search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
