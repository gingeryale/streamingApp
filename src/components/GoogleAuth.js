import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {
    state = { isSignedIn: null }

    componentDidMount() {
        // add callback once gapi successful
        window.gapi.load('client:auth2', () => {
            // init returns a promise
            window.gapi.client.init({
                clientId: '813225226294-9fl1mlef8fo83uihvirrbnr7pgmjgftp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                // this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // callback arrow f to bound context of this additional method
    onAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        });
    }

    onSignInBtn = () => {
        this.auth.signIn();
    }

    onSignOutBtn = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutBtn} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>

            )
        } else {
            return (
                <button onClick={this.onSignInBtn} className="ui green google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default connect(null, { signIn, signOut })(GoogleAuth);