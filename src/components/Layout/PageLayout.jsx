import React from "react";
import GlobalHeader from "./GlobalHeader";
function PageLayout(props) {
  return (
    <>
      <header className="sticky-lg-top">
        <GlobalHeader />
      </header>
      <main>{props.children}</main>
    </>
  );
}

export default PageLayout;
