import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount() {
        // add callback once gapi successful
        window.gapi.load('client:auth2', () => {
            // init returns a promise
            window.gapi.client.init({
                clientId: '813225226294-9fl1mlef8fo83uihvirrbnr7pgmjgftp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // callback arrow f to bound context of this additional method
    // isSignedIn returns boolean
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }

    onSignInBtn = () => {
        this.auth.signIn();
    }

    onSignOutBtn = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutBtn} className="ui black google button">
                    <i className="google icon" />
                    Sign Out
                </button>

            )
        } else {
            return (
                <button onClick={this.onSignInBtn} className="ui grey google button">
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

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);