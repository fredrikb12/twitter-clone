import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { getAppAuth } from "../firebase";
import 'firebase/auth';

function SignIn() {
  const signInWithGoogle = async () => {
    console.log("clicked");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  };

  return <div>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  </div>;
}

export default SignIn;
