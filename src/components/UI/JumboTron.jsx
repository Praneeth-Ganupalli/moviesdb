import React from "react";
import "./JumboTron.css";
import { Link } from "react-router-dom";
function JumboTron({text}) {
  return (
    <div className="jumbotron m-auto bg-dark jumbotron-fluid text-white">
      <h1 className="display-4">Hello, Movie Buff</h1>
      <p className="lead">
        It seems You dont have any content added in your {text}  
      </p>
      <hr className="my-4" />
      <p>
        Discover popular Movies and Series and Add them to your {text} Right away to keep track of them
      </p>
      <p className="lead mt-4">
        <Link className="btn btn-outline-light btn-lg" to="/browse" role="button">
         Discover
        </Link>
      </p>
    </div>
  );
}

export default JumboTron;
