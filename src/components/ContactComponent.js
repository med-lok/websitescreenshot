import React, { Component } from "react";
import { Helmet } from "react-helmet";

const TITLE = "Contact us";

class ContactComponent extends Component {
  render() {
    return (
      <div className="main">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h1>Contact us </h1>
        <p>Concat us by email : ahmed.b2015@gmail.com</p>
      </div>
    );
  }
}

export default ContactComponent;
