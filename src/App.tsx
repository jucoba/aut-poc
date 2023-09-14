import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import './App.css'

function App() {
  

  const responseMessage = (response: any) => {
      console.log(response);
  };
  const errorMessage = (error: any) => {
      console.log("error: "+error);
} ;

  return (
    <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
  )
}

export default App
