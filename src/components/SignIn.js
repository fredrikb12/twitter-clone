import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { getAppAuth, signInWithGoogle } from "../firebase";
import "firebase/auth";
import Button from "./Button";

function SignIn() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#eaeaea",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1>Welcome to a Twitter Clone,</h1>
        <h2 style={{ marginBottom: "10px", padding: "6px" }}>
          Built with React.js and Firebase
        </h2>
        <p>To find the creator's account, search for "fredrikb12"</p>
      </div>
      <Button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
}

export default SignIn;
