import React from "react";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1>404</h1>
      <p>The page you're looking for does not exist.</p>
      <a href="/" className="btn btn-primary">
        Go Back to Home
      </a>
    </div>
  );
};

export default NotFound;
