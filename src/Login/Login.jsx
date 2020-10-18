import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

import './Login.css';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__logo">
          <img
            src="https://blueboxing.net/page8/files/stacks-image-b344a02.png"
            alt="discord logo"
          />
          <span>[Clone!]</span>
        </div>
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}

export default Login;
