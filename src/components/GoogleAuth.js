import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    //We wired gapi library to our project(window.gapi),
    //we then loaded additional code to this library(window.gapi.load("client:auth2")
    //Then we initialized the authentification client with clientId and asked for scope of email
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "380091154939-hn0tkrgs3en73ahr3tg2odkgu4hvmnnm.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          //when initialization is complete with passed clientId we can create auth object and use its methods
          this.auth = window.gapi.auth2.getAuthInstance();
          //then we can update component level state
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // we add listener, that will invoke onAuthChange method on change
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="btn btn-danger">
          <p>
            <i className="fab fa-google"></i> Sign Out
          </p>
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="btn btn-success">
          <p>
            <i className="fab fa-google"></i> Sign In with Google
          </p>
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

/* const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}; */

export default connect(null, { signIn, signOut })(GoogleAuth);
