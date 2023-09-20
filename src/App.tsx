/*App.js*/

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import Cookies from 'universal-cookie';


const loginRequest = {
    scopes: [],
};

const cookies = new Cookies(null, { path: '/' });



const MsContent = () => {

    const { instance } = useMsal();

    const activeAccount = instance.getActiveAccount();
  
    return(
    <div>
        {activeAccount ? (
            <div>
                <p>Name: {activeAccount.name}</p>
                <p>User Name: {activeAccount.username}</p>
            </div>
            )  : <p>No user on Microsoft</p>
        }
        </div>
    );
  
};

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const { instance } = useMsal();

    const finishLogin = (codeResponse) => {
        setUser(codeResponse);
        console.log(codeResponse);

    }

    
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => finishLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const msLogin = () => {
        instance.loginRedirect({
            ...loginRequest,
            prompt: 'create',
        }).then ( () => {
            const { instance } = useMsal();

            const activeAccount = instance.getActiveAccount();
            cookies.set("token", activeAccount ? activeAccount.username : "none", { httpOnly: true } )
        }
        )
        .catch((error) => console.log(error));  
    };          

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                    <button onClick={() => msLogin()}>Sign in with Microsoft 🚀 </button>
                </div>
            )}
            <p>Microsoft</p>
            <MsContent/>
            <br />
            
        </div>
    );
}
export default App;