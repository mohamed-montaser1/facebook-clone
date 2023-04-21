import React from "react";
import Navbar from "../Components/Navbar";
import NotfoundImgSrc from "../images/permissions_gray_wash.svg";

function NotFound() {
  document.body.classList.add("notfound");

  const handleBackToMainPage = () => {
    location.href = location.origin;
  };

  return (
    <>
      <Navbar notfound={true} />
      <div className="content-container">
        <div className="content">
          <img
            src={NotfoundImgSrc}
            className="notfound-img"
            alt="notfound-img"
          />
          <h3>This content isn't available at the moment</h3>
          <p>
            The link may be broken, or the page may have been removed. Check to
            see if the link you're trying to open is correct.
          </p>
          <button onClick={handleBackToMainPage}>Go To Main Page</button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
