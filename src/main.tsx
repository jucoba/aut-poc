import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.tsx'
import './index.css'
import { MsalProvider } from '@azure/msal-react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';

const msalConfiguration: Configuration = {
  auth: {
      clientId: '29f88bff-ab05-4fe0-bbc8-808272f11348', // the only mandatory field in this object, uniquely identifies your app
      // here you'll add the other fields that you might need based on the Azure portal settings
      redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
      postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
  }
};

const pca = new PublicClientApplication(msalConfiguration);
 


ReactDOM.createRoot(document.getElementById('root')!).render(

  <GoogleOAuthProvider clientId="284577708985-keeqqvslko74sk9tuv5bb5noqbhlokki.apps.googleusercontent.com">
    <MsalProvider instance={pca}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>,
    </MsalProvider>
  </GoogleOAuthProvider>
  
)
