import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Google
class SignInWithGoogle extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        const ga = window.gapi && window.gapi.auth2 ? 
            window.gapi.auth2.getAuthInstance() : 
            null;
        if (!ga) this.createScript();
    }

    signIn() {
        const ga = window.gapi.auth2.getAuthInstance();
        ga.signIn().then(
            googleUser => {
                this.getAWSCredentials(googleUser);
            },
            error => {
                console.log(error);
            }
        );
    }

    getAWSCredentials(googleUser) {
        const { id_token, expires_at } = googleUser.getAuthResponse();
        //const googleResponse = googleUser.getAuthResponse();
        const profile = googleUser.getBasicProfile();
        let user = {
            email: profile.getEmail(),
            name: profile.getName()
        };

        console.log(googleUser);
        console.log(user);
        
        // const credentials = Auth.federatedSignIn(
        //     'google',
        //     { token: id_token, expires_at },
        //     //googleResponse,
        //     user
        // );
        // console.log('credentials', credentials);
        
    }

    logIn(){
        Auth.federatedSignIn({provider: 'Google'});
    }

    createScript() {
        // load the Google SDK
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.onload = this.initGapi;
        document.body.appendChild(script);
    }

    initGapi() {
        // init the Google SDK client
        const g = window.gapi;
        g.load('auth2', function() {
            g.auth2.init({
                client_id: "174112776046-kpjth93djski03vrquoa017cd5jhnmis.apps.googleusercontent.com",
                // authorized scopes
                scope: 'profile email openid'
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.signIn}>Sign in with Google</button>
                <button onClick={this.logIn}>LogIn</button>
            </div>
        );
    }
}

export default SignInWithGoogle;