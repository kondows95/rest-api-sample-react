import React from 'react';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { withRouter } from 'react-router-dom';
import { withFederated } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

const Federated = () => {

    React.useEffect(() => {
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })(); 
    })
    
  //Triggering login for google
    const googleLogin = () => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                googleSignInCallback(authResponse);
            },
            clientid: "846832770923-nq1asqrnbgordka380aee3fu0th7kk7l.apps.googleusercontent.com", //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }
    
    const googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            });
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }
    
    const getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return
            
            } else if (e.id) {
                //Profile data
                alert("Successfull login from google : "+ e.displayName )
                console.log( e );
                return;
            }
        });
    }
    
    return (
        <Box flexGrow={1} textAlign="center" >
           <Box>Hello Federated Page</Box>
           <Box>
            <img src={"../../assets/img/google.png"} width={50} height={50} title="google login" alt="google" onClick={googleLogin}/>
           </Box>
        </Box>
    )
}
export default withRouter(Federated);
