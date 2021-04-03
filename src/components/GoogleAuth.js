import React from 'react';
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';
class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '786640896438-0ggifs7d9td177q17flspmebjdde34dv.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }
    renderAuthButton() {
        console.log(this.props.isSignedIn);
        if (this.props.isSignedIn == null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return <button className="ui red google button" onClick={this.onSignOut}><i className="google icon"></i> Sign Out({this.props.userId})</button>
        }
        else {
            return <button className="ui red google button" onClick={this.onSignIn}><i className="google icon"></i> Sign In with Google</button>
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId:state.auth.userId
    }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);