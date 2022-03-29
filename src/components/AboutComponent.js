import React, { Component } from "react";
import { Helmet } from "react-helmet";
const TITLE = "About us";

class AboutComponent extends Component {
  render() {
    return (
      <div className="main">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h1>About us </h1>
        <p>
          <span className="font-weight-bold text-primary" href="/">
            <span className="text-success">Website</span>Screen
            <span className="text-danger">Shot </span>
          </span>
          is a web app that take screen captures of websites on Desktop or
          Mobiles
        </p>
      </div>
    );
  }
}

export default AboutComponent;
