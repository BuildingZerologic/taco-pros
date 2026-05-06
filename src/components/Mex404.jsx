import React from "react";
import "./Mex404.css";
import TacoButton from "./TacoButton";

export default function Mex404() {
  return (
    <div className="error-page">
      <div className="error-image">
        <img src="TP Error 1.webp" alt="404 skeleton sombrero" />
      </div>
      <div className="error-content">
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <p>
          Don’t worry—our friendly skeleton is here to guide you back. Click the
          button below to return home.
        </p>



        <TacoButton text="Go Home"
          link="/"
          width={window.innerWidth < 768 ? "155px" : "302px"}
          height={window.innerWidth < 768 ? "51px" : "57px"}
          styleType="1"
          fontSize={window.innerWidth < 768 ? "18px" : "24px"}
        />

      </div>
    </div>
  );
}


