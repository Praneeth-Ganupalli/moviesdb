import React, { Fragment } from "react";
import "./SkeltonLoader.css";
function SkeletonLoader({ cards }) {
  return (
    <div className="d-flex main-container-loader mt-3">
      {Array.from(Array(cards).keys()).map((_, i) => {
        return (
          <Fragment key={i}>
            <p className="placeholder-glow ">
              <span className="placeholder bg-secondary loader "></span>
            </p>
          </Fragment>
        );
      })}
    </div>
  );
}

export default SkeletonLoader;
