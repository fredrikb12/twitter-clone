import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { getAppAuth, signInWithGoogle } from "../firebase";
import 'firebase/auth';

function SignIn() {

  return <div>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  </div>;
}

export default SignIn;
