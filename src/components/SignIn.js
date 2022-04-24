import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { getAppAuth, signInWithGoogle } from "../firebase";
import 'firebase/auth';
import Button from "./Button";

function SignIn() {

  return <div>
    <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
  </div>;
}

export default SignIn;
