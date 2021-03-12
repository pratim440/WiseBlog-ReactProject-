import React from "react";
import ReactLoading from "react-loading";

function Preloader() {
  return (
    <div class="loader-container">
      <ReactLoading
        className="loader"
        type={"spinningBubbles"}
        color={"#0abde3"}
        height={"100px"}
        width={"100px"}
      />
    </div>
  );
}

export default Preloader;
