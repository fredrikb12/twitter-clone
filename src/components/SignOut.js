import { getAuth, signOut } from "firebase/auth";
import React from "react";

function SignOut({ user }) {
  function signOutUser() {
    signOut(getAuth());
  }

  return (
    user && (
      <div>
        <button onClick={() => signOutUser()}>Sign Out</button>
      </div>
    )
  );
}

export default SignOut;
